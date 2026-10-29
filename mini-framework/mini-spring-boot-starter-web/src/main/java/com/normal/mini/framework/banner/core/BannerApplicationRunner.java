package com.normal.mini.framework.banner.core;

import cn.hutool.core.thread.ThreadUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.util.ClassUtils;

import java.util.concurrent.TimeUnit;

/**
 * 项目启动成功后，提供文档相关的地址
 *
 * @author 芋道源码
 */
@Slf4j
public class BannerApplicationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        ThreadUtil.execute(() -> {
            ThreadUtil.sleep(1, TimeUnit.SECONDS); // 延迟 1 秒，保证输出到结尾
            log.info("\n----------------------------------------------------------\n\t" +
                            "项目启动成功！\n\t" +
                            "接口文档: \t{} \n\t" +
                            "开发文档: \t{} \n\t" +
                            "视频教程: \t{} \n" +
                            "----------------------------------------------------------",
                    "https://doc.iocoder.cn/api-doc/",
                    "https://doc.iocoder.cn",
                    "https://t.zsxq.com/02Yf6M7Qn");

            // 工作流
            if (isNotPresent("com.normal.mini.module.bpm.framework.flowable.config.BpmFlowableConfiguration")) {
                System.out.println("[工作流模块 mini-module-bpm - 已禁用][参考 https://doc.iocoder.cn/bpm/ 开启]");
            }
            // 支付平台
            if (isNotPresent("com.normal.mini.module.pay.framework.pay.config.PayConfiguration")) {
                System.out.println("[支付系统 mini-module-pay - 已禁用][参考 https://doc.iocoder.cn/pay/build/ 开启]");
            }
            // 数据报表
            if (isNotPresent("com.normal.mini.module.report.framework.security.config.SecurityConfiguration")) {
                System.out.println("[报表模块 mini-module-report - 已禁用][参考 https://doc.iocoder.cn/report/ 开启]");
            }
            // 微信公众号
            if (isNotPresent("com.normal.mini.module.mp.framework.mp.config.MpConfiguration")) {
                System.out.println("[微信公众号 mini-module-mp - 已禁用][参考 https://doc.iocoder.cn/mp/build/ 开启]");
            }
            // 商城系统
            if (isNotPresent("com.normal.mini.module.trade.framework.web.config.TradeWebConfiguration")) {
                System.out.println("[商城系统 mini-module-mall - 已禁用][参考 https://doc.iocoder.cn/mall/build/ 开启]");
            }
            // ERP 系统
            if (isNotPresent("com.normal.mini.module.erp.framework.web.config.ErpWebConfiguration")) {
                System.out.println("[ERP 系统 mini-module-erp - 已禁用][参考 https://doc.iocoder.cn/erp/build/ 开启]");
            }
            // WMS 仓库管理系统
            if (isNotPresent("com.normal.mini.module.wms.framework.web.config.WmsWebConfiguration")) {
                System.out.println("[WMS 仓库管理系统 mini-module-wms - 已禁用][参考 https://doc.iocoder.cn/wms/build/ 开启]");
            }
            // CRM 系统
            if (isNotPresent("com.normal.mini.module.crm.framework.web.config.CrmWebConfiguration")) {
                System.out.println("[CRM 系统 mini-module-crm - 已禁用][参考 https://doc.iocoder.cn/crm/build/ 开启]");
            }
            // MES 系统
            if (isNotPresent("com.normal.mini.module.mes.framework.web.config.MesWebConfiguration")) {
                System.out.println("[MES 系统 mini-module-mes - 已禁用][参考 https://doc.iocoder.cn/mes/build/ 开启]");
            }
            // HRM 人力资源管理系统
            if (isNotPresent("com.normal.mini.module.hrm.framework.web.config.HrmWebConfiguration")) {
                System.out.println("[HRM 人力资源管理系统 mini-module-hrm - 已禁用][参考 https://doc.iocoder.cn/hrm/build/ 开启]");
            }
            // FMS 财务管理系统
            if (isNotPresent("com.normal.mini.module.fms.framework.web.config.FmsWebConfiguration")) {
                System.out.println("[FMS 财务管理系统 mini-module-fms - 已禁用][参考 https://doc.iocoder.cn/fms/build/ 开启]");
            }
            // PMS 系统
            if (isNotPresent("com.normal.mini.module.pms.framework.web.config.PmsWebConfiguration")) {
                System.out.println("[PMS 项目管理系统 mini-module-pms - 已禁用][参考 https://doc.iocoder.cn/pms/build/ 开启]");
            }
            // OA 办公自动化
            if (isNotPresent("com.normal.mini.module.oa.framework.config.OaProperties")) {
                System.out.println("[OA 协同办公 mini-module-oa - 已禁用][参考 https://doc.iocoder.cn/oa/build/ 开启]");
            }
            // AI 大模型
            if (isNotPresent("com.normal.mini.module.ai.framework.web.config.AiWebConfiguration")) {
                System.out.println("[AI 大模型 mini-module-ai - 已禁用][参考 https://doc.iocoder.cn/ai/build/ 开启]");
            }
            // IoT 物联网
            if (isNotPresent("com.normal.mini.module.iot.framework.web.config.IotWebConfiguration")) {
                System.out.println("[IoT 物联网 mini-module-iot - 已禁用][参考 https://doc.iocoder.cn/iot/build/ 开启]");
            }
            // IM 即时通讯
            if (isNotPresent("com.normal.mini.module.im.framework.web.config.ImWebConfiguration")) {
                System.out.println("[IM 即时通讯 mini-module-im - 已禁用][参考 https://doc.iocoder.cn/im/build/ 开启]");
            }
        });
    }

    private static boolean isNotPresent(String className) {
        return !ClassUtils.isPresent(className, ClassUtils.getDefaultClassLoader());
    }

}
