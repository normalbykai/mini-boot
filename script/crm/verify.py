"""Exercise CRM and BPM against a disposable database. This creates test business records."""

import argparse
import json
import os
import re
import time
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True, help="API URL of the isolated verification server")
    parser.add_argument("--tenant-id", required=True, type=int)
    parser.add_argument("--user-id", required=True, type=int, help="Owner and configured approval user")
    parser.add_argument("--token", default=os.environ.get("MINI_API_TOKEN"))
    args = parser.parse_args()
    if not args.token:
        parser.error("Set MINI_API_TOKEN or provide --token")
    prefix = "CRM_VERIFY_" + uuid.uuid4().hex[:10]
    now = int(time.time() * 1000)
    user_id = args.user_id

    def call(method, path, data=None, params=None, binary=False, error=False):
        if params:
            path += "?" + urlencode(params, doseq=True)
        request = Request(args.base_url.rstrip("/") + path,
                          data=None if data is None else json.dumps(data).encode("utf-8"),
                          headers={"Authorization": "Bearer " + args.token,
                                   "tenant-id": str(args.tenant_id), "Content-Type": "application/json"},
                          method=method)
        with urlopen(request, timeout=60) as response:
            raw = response.read()
        if binary:
            assert raw[:2] == b"PK", (path, raw[:200])
            return raw
        result = json.loads(raw)
        if error:
            assert result["code"] != 0, (path, result)
            return result
        assert result["code"] == 0, (method, path, result)
        return result["data"]

    def create(route, data):
        return call("POST", "/crm/" + route + "/create", data)

    def get(route, record_id):
        return call("GET", "/crm/" + route + "/get", params={"id": record_id})

    def check_audit(route, record_id, expected):
        for _ in range(50):
            record = get(route, record_id)
            if record["auditStatus"] == expected:
                return record
            time.sleep(0.2)
        raise AssertionError((route, expected, record))

    def submit(route, record_id, reject=False):
        call("PUT", "/crm/" + route + "/submit", params={"id": record_id})
        record = check_audit(route, record_id, 10)
        instance_id = record["processInstanceId"]
        detail = call("GET", "/bpm/process-instance/get-approval-detail",
                      params={"processInstanceId": instance_id})
        assert detail["processDefinition"]["formCustomViewPath"].startswith("/crm/")
        tasks = call("GET", "/bpm/task/list-by-process-instance-id", params={"processInstanceId": instance_id})
        todo = next(task for task in tasks if not task.get("endTime") and task.get("assigneeUser"))
        call("PUT", "/bpm/task/" + ("reject" if reject else "approve"),
             {"id": todo["id"], "reason": prefix, "variables": {}})
        check_audit(route, record_id, 30 if reject else 20)
        call("GET", "/bpm/process-instance/get-bpmn-model-view", params={"id": instance_id})

    category = create("product-category", {"name": prefix, "parentId": 0})
    product = create("product", {"name": prefix, "no": prefix, "unit": 1, "price": 100,
                                 "status": 1, "categoryId": category, "ownerUserId": user_id})
    clue = create("clue", {"name": prefix, "ownerUserId": user_id, "industryId": 1, "level": 1,
                           "source": 1, "contactNextTime": now + 86400000})
    create("follow-up-record", {"bizType": 1, "bizId": clue, "type": 1, "content": prefix,
                                "nextTime": now + 86400000, "businessIds": [], "contactIds": [],
                                "picUrls": [], "fileUrls": []})
    call("PUT", "/crm/clue/transform", params={"id": clue})
    transformed = get("clue", clue)
    assert transformed["transformStatus"] is True
    customer = transformed["customerId"]
    assert get("customer", customer)["name"] == prefix
    followups = call("GET", "/crm/follow-up-record/page",
                     params={"pageNo": 1, "pageSize": 10, "bizType": 2, "bizId": customer})
    assert followups["total"] == 1
    print("PASS product, lead conversion and follow-up copying", flush=True)

    pool_customer = create("customer", {"name": prefix + "_pool", "ownerUserId": user_id})
    call("PUT", "/crm/customer/put-pool", params={"id": pool_customer})
    assert get("customer", pool_customer)["ownerUserId"] is None
    call("PUT", "/crm/customer/receive", params={"ids": pool_customer})
    assert get("customer", pool_customer)["ownerUserId"] == user_id
    contact = create("contact", {"name": prefix, "customerId": customer, "ownerUserId": user_id,
                                 "sex": 1, "master": True})
    status_type = create("business-status", {"name": prefix, "deptIds": [],
                                            "statuses": [{"name": "意向", "percent": 50},
                                                         {"name": "洽谈", "percent": 80}]})
    business = create("business", {"name": prefix, "customerId": customer, "ownerUserId": user_id,
                                   "statusTypeId": status_type, "discountPercent": 0,
                                   "contactId": contact,
                                   "products": [{"productId": product, "productPrice": 100,
                                                 "businessPrice": 100, "count": 1}]})
    assert get("business", business)["totalPrice"] == 100
    print("PASS customer pool, contact, opportunity and product amount", flush=True)

    contract_data = {"name": prefix, "customerId": customer, "businessId": business,
                     "ownerUserId": user_id, "orderDate": now, "discountPercent": 0,
                     "totalPrice": 100, "signContactId": contact, "signUserId": user_id,
                     "products": [{"productId": product, "productPrice": 100,
                                   "contractPrice": 100, "count": 1}]}
    contract = create("contract", contract_data)
    submit("contract", contract)
    assert get("contract", contract)["totalPrice"] == 100
    rejected = create("contract", {**contract_data, "name": prefix + "_reject"})
    submit("contract", rejected, reject=True)
    canceled = create("contract", {**contract_data, "name": prefix + "_cancel"})
    call("PUT", "/crm/contract/submit", params={"id": canceled})
    instance = check_audit("contract", canceled, 10)["processInstanceId"]
    call("DELETE", "/bpm/process-instance/cancel-by-start-user", {"id": instance, "reason": prefix})
    check_audit("contract", canceled, 40)
    print("PASS contract approval/rejection/cancellation and CRM status callbacks", flush=True)

    plan = create("receivable-plan", {"contractId": contract, "ownerUserId": user_id,
                                       "returnTime": now + 86400000, "returnType": 5,
                                       "price": 50, "remindDays": 0})
    receivable = create("receivable", {"contractId": contract, "ownerUserId": user_id, "planId": plan,
                                       "returnTime": now, "returnType": 5, "price": 50})
    submit("receivable", receivable)
    assert get("receivable-plan", plan)["receivableId"] == receivable
    call("POST", "/crm/receivable/create", {"contractId": contract, "ownerUserId": user_id,
                                            "returnTime": now, "returnType": 5, "price": 100}, error=True)
    print("PASS receivable approval, plan relation and overpayment rejection", flush=True)

    for route in ("clue", "customer", "contact", "business", "business-status", "contract", "product",
                  "receivable", "receivable-plan"):
        call("GET", "/crm/" + route + "/page", params={"pageNo": 1, "pageSize": 10})
    for route in ("clue", "customer", "contact", "business", "contract", "product", "receivable", "receivable-plan"):
        call("GET", "/crm/" + route + "/export-excel", params={"pageNo": 1, "pageSize": 10}, binary=True)
    call("GET", "/crm/customer/get-import-template", binary=True)
    call("GET", "/bpm/process-expression/export-excel", params={"pageNo": 1, "pageSize": 10}, binary=True)
    for route in ("todo-page", "done-page", "manager-page"):
        call("GET", "/bpm/task/" + route, params={"pageNo": 1, "pageSize": 10})
    print("PASS CRM queries, 10 Excel downloads and BPM task lists", flush=True)

    user = call("GET", "/system/user/get", params={"id": user_id})
    today = datetime.now()
    params = {"pageNo": 1, "pageSize": 10, "deptId": user["deptId"], "userId": user_id,
              "times": [(today - timedelta(days=1)).strftime("%Y-%m-%d 00:00:00"),
                        (today + timedelta(days=1)).strftime("%Y-%m-%d 23:59:59")],
              "interval": 1, "year": today.year, "bizType": 5, "statusTypeId": status_type}
    root = Path(__file__).resolve().parents[2]
    stats_dir = root / "mini-module-crm/src/main/java/com/normal/mini/module/crm/controller/admin/statistics"
    count = 0
    for controller in sorted(stats_dir.glob("*Controller.java")):
        source = controller.read_text(encoding="utf-8")
        base = re.search(r'@RequestMapping\("([^"]+)"\)', source)[1]
        for endpoint in re.findall(r'@GetMapping\("([^"]+)"\)', source):
            call("GET", base + endpoint, params=params)
            count += 1
    print(f"PASS {count} CRM statistics endpoints", flush=True)
    print("ALL CRM/BPM VERIFICATION CHECKS PASSED; fixtures belong to the disposable database", flush=True)


if __name__ == "__main__":
    main()
