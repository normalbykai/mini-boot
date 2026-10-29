"""Create and deploy the CRM contract/receivable approval models through BPM APIs."""

import argparse
import json
import os
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from xml.sax.saxutils import escape


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://127.0.0.1:48080/admin-api")
    parser.add_argument("--tenant-id", type=int, required=True)
    parser.add_argument("--manager-user-id", type=int, required=True)
    parser.add_argument("--approver-user-id", type=int, required=True)
    parser.add_argument("--token", default=os.environ.get("MINI_API_TOKEN"))
    args = parser.parse_args()
    if not args.token:
        parser.error("Set MINI_API_TOKEN or provide --token with a valid administrator token")
    if min(args.tenant_id, args.manager_user_id, args.approver_user_id) <= 0:
        parser.error("Tenant and user identifiers must be positive")

    def call(method, path, data=None, params=None):
        if params:
            path += "?" + urlencode(params)
        request = Request(
            args.base_url.rstrip("/") + path,
            data=None if data is None else json.dumps(data).encode("utf-8"),
            headers={
                "Authorization": "Bearer " + args.token,
                "tenant-id": str(args.tenant_id),
                "Content-Type": "application/json",
            },
            method=method,
        )
        with urlopen(request, timeout=60) as response:
            result = json.load(response)
        if result.get("code") != 0:
            raise RuntimeError(f"{method} {path}: {result.get('msg')}")
        return result.get("data")

    # Validate the selected users in the selected tenant before creating models.
    for user_id in {args.manager_user_id, args.approver_user_id}:
        user = call("GET", "/system/user/get", params={"id": user_id})
        if not user or user.get("status") != 0:
            raise RuntimeError(f"User {user_id} is missing or disabled in the selected tenant")

    categories = call("GET", "/bpm/category/simple-list")
    if not any(category.get("code") == "crm" for category in categories):
        call("POST", "/bpm/category/create", {
            "name": "CRM 审批", "code": "crm", "status": 0, "sort": 0,
            "description": "客户合同与回款审批",
        })

    models = call("GET", "/bpm/model/list")
    for key, name, create_path, view_path in (
        ("crm-contract-audit", "CRM 合同审批", "/crm/contract", "/crm/contract/detail/index.vue"),
        ("crm-receivable-audit", "CRM 回款审批", "/crm/receivable", "/crm/receivable/detail/index.vue"),
    ):
        existing = next((model for model in models if model.get("key") == key), None)
        if existing and (existing.get("processDefinition") or {}).get("id"):
            print(f"Already deployed; preserved existing model: {key}")
            continue
        if existing:
            model_id = existing["id"]
        else:
            bpmn_xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
 xmlns:flowable="http://flowable.org/bpmn"
 xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
 xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
 xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="https://normal.mini/crm">
 <process id="{key}" name="{escape(name)}" isExecutable="true">
  <startEvent id="StartEvent" name="开始" />
  <sequenceFlow id="FlowToApproval" sourceRef="StartEvent" targetRef="Approval" />
  <userTask id="Approval" name="人工审批" flowable:candidateStrategy="30"
   flowable:candidateParam="{args.approver_user_id}">
   <extensionElements>
    <flowable:approveType>1</flowable:approveType>
    <flowable:assignStartUserHandlerType>1</flowable:assignStartUserHandlerType>
    <flowable:nodeType>11</flowable:nodeType>
    <flowable:reasonRequire>true</flowable:reasonRequire>
   </extensionElements>
  </userTask>
  <sequenceFlow id="FlowToEnd" sourceRef="Approval" targetRef="EndEvent" />
  <endEvent id="EndEvent" name="结束" />
 </process>
 <bpmndi:BPMNDiagram id="Diagram"><bpmndi:BPMNPlane id="Plane" bpmnElement="{key}">
  <bpmndi:BPMNShape id="StartShape" bpmnElement="StartEvent"><dc:Bounds x="100" y="122" width="36" height="36" /></bpmndi:BPMNShape>
  <bpmndi:BPMNShape id="ApprovalShape" bpmnElement="Approval"><dc:Bounds x="200" y="100" width="120" height="80" /></bpmndi:BPMNShape>
  <bpmndi:BPMNShape id="EndShape" bpmnElement="EndEvent"><dc:Bounds x="390" y="122" width="36" height="36" /></bpmndi:BPMNShape>
  <bpmndi:BPMNEdge id="Edge1" bpmnElement="FlowToApproval"><di:waypoint x="136" y="140" /><di:waypoint x="200" y="140" /></bpmndi:BPMNEdge>
  <bpmndi:BPMNEdge id="Edge2" bpmnElement="FlowToEnd"><di:waypoint x="320" y="140" /><di:waypoint x="390" y="140" /></bpmndi:BPMNEdge>
 </bpmndi:BPMNPlane></bpmndi:BPMNDiagram>
</definitions>'''
            model_id = call("POST", "/bpm/model/create", {
                "key": key, "name": name, "category": "crm", "type": 10,
                "formType": 20, "formCustomCreatePath": create_path,
                "formCustomViewPath": view_path, "visible": True,
                "startUserIds": [], "startDeptIds": [],
                "managerUserIds": [args.manager_user_id],
                "allowCancelRunningProcess": True, "allowWithdrawTask": True,
                "autoApprovalType": 0, "bpmnXml": bpmn_xml,
            })
        call("POST", "/bpm/model/deploy", params={"id": model_id})
        print(f"Deployed: {key}; model={model_id}; approver={args.approver_user_id}")


if __name__ == "__main__":
    main()
