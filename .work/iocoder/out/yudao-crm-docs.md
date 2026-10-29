# 芋道 CRM 系统（ruoyi-vue-pro / yudao-module-crm）文档合集

> 来源：<https://doc.iocoder.cn/crm-preview/> 及同栏目下 11 篇文档
> 抓取时间：2026-10-29
> 说明：原站栏目入口为 /crm-preview/ 与 /crm/*，共 11 页，本文档为全文离线合集。

## 目录

- [1. CRM 系统概述](#1-crm-系统概述)
- [2. 功能开启](#2-功能开启)
- [3. 客户管理](#3-客户管理)
- [4. 线索管理](#4-线索管理)
- [5. 商机管理](#5-商机管理)
- [6. 合同管理](#6-合同管理)
- [7. 回款管理](#7-回款管理)
- [8. 产品管理](#8-产品管理)
- [9. 跟进记录](#9-跟进记录)
- [10. 数据权限](#10-数据权限)
- [11. 移动端（uni-app）](#11-移动端uni-app)

---

## 1. CRM 系统概述

> 原文：<https://doc.iocoder.cn/crm-preview/>

### 1. 演示地址

#### 1.1. CRM 管理后台

- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单：“CRM 系统”下的「待办事项」「线索管理」「客户管理」「联系人管理」「客户公海」「商机管理」「合同管理」「回款计划」「还款管理」「产品管理」「数据统计」
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `crm` 目录，基于 Vue3 + Element Plus 实现

![管理后台](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0.png)

#### 1.2. CRM 后端

支持 Spring Boot 单体、Spring Cloud 微服务架构

- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-crm` 模块
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-crm` 服务

#### 1.3. CRM 移动端

CRM 提供 uni-app 移动端，线索、客户、商机、合同和回款都可以在手机上处理，详见 [《移动端 CRM》](https://doc.iocoder.cn/crm/mobile/)。

- 仓库：[https://github.com/yudaocode/yudao-ui-admin-uniapp](https://github.com/yudaocode/yudao-ui-admin-uniapp) 的 `pages-crm` 目录

![移动端](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%A7%BB%E5%8A%A8%E7%AB%AF/%E5%B7%A5%E4%BD%9C%E5%8F%B0.png)

### 2. CRM 启动

参见 [《CRM 手册 —— 功能开启》](https://doc.iocoder.cn/crm/build/) 文档，一般 3 分钟就可以启动完成。

### 3. CRM 交流

专属交流社区，欢迎扫码加入。

![交流群](https://doc.iocoder.cn/img/ad/zsxq_crm.png)

### 4. 功能描述

主要分为 6 个核心模块：线索、客户、商机、合同、回款、产品。

![ERP 功能列表](https://doc.iocoder.cn/img/common/crm-feature.png)

### 5. 表结构

CRM 一共近 **20+** 张表，具备一定的业务复杂度，对提升技术能力会有不错的帮助，平时做项目也可以参考参考。

#### 5.1. 线索管理

以 `crm_clue` 作为核心表，表结构如下：

![线索表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E7%BA%BF%E7%B4%A2%E8%A1%A8.png)

- [《【线索】线索管理》](https://doc.iocoder.cn/crm/clue/)

#### 5.2. 客户管理

以 `crm_customer` 作为核心表，表结构如下：

![客户表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E5%AE%A2%E6%88%B7%E8%A1%A8.png)

- [《【线索】线索管理》](https://doc.iocoder.cn/crm/customer/)

#### 5.3. 商机管理

以 `crm_business` 作为核心表，表结构如下：

![商机表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E5%95%86%E6%9C%BA%E8%A1%A8.png)

- [《【商机】商机管理、商机状态》](https://doc.iocoder.cn/crm/business/)

#### 5.4. 合同管理

以 `crm_contract` 作为核心表，表结构如下：

![合同表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E5%90%88%E5%90%8C%E8%A1%A8.png)

- [《【合同】合同管理、合同提醒》](https://doc.iocoder.cn/crm/contract/)

#### 5.5. 回款管理

以 `crm_receivable` 作为核心表，表结构如下：

![回款表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E5%9B%9E%E6%AC%BE%E8%A1%A8.png)

- [《【回款】回款管理、回款计划》](https://doc.iocoder.cn/crm/receivable/)

#### 5.6. 产品管理

以 `crm_product` 作为核心表，表结构如下：

![产品表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E4%BA%A7%E5%93%81%E8%A1%A8.png)

- [《【产品】产品管理、产品分类》](https://doc.iocoder.cn/crm/product/)

#### 5.7. 通用模块

- [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/)
- [《【通用】跟进记录、待办事项》](https://doc.iocoder.cn/crm/follow-up/)

#### 5.8. 数据统计

TODO 数据统计

---

## 2. 功能开启

> 原文：<https://doc.iocoder.cn/crm/build/>

**进度说明：**

- 管理后台，请使用 [https://gitee.com/yudaocode/yudao-ui-admin-vue3](https://gitee.com/yudaocode/yudao-ui-admin-vue3) 仓库的 `master` 分支
- 后端项目，请使用 [https://gitee.com/zhijiantianya/ruoyi-vue-pro](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 仓库的 `master`（JDK8）、`master-jdk17`（JDK17/21）或 `master-jdk25`（JDK25）分支

CRM 系统，后端由 `yudao-module-crm` 模块实现，前端由 `yudao-ui-admin-vue3` 的 `crm` 目录实现。

考虑到编译速度，默认 `yudao-module-crm` 模块是关闭的，需要手动开启。步骤如下：

- 第一步，开启 `yudao-module-crm` 模块
- 第二步，导入 CRM 系统的 SQL 数据库脚本
- 第三步，重启后端项目，确认功能是否生效

**补充说明：**

由于 CRM 合同、回款使用到 BPM 的审批功能，所以你需要先看 [《工作流》](https://doc.iocoder.cn/bpm/) 文档，将工作流开启！

### 1. 第一步，开启模块

① 修改根目录的 [`pom.xml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/pom.xml) 文件，取消 `yudao-module-crm` 模块的注释。如下图所示：

![取消  模块的注释](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E5%BC%80%E5%90%AF/%E7%AC%AC%E4%B8%80%E6%AD%A5-01.png)

② 修改 `yudao-server` 目录的 [`pom.xml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/pom.xml) 文件，引入 `yudao-module-crm` 模块。如下图所示：

![引入  模块](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E5%BC%80%E5%90%AF/%E7%AC%AC%E4%B8%80%E6%AD%A5-02.png)

③ 点击 IDEA 右上角的【Reload All Maven Projects】，刷新 Maven 依赖。如下图所示：

![刷新 Maven 依赖](https://doc.iocoder.cn/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E5%BC%80%E5%90%AF/%E7%AC%AC%E4%B8%80%E6%AD%A5-03.png)

### 2. 第二步，导入 SQL

点击 [`crm-2024-09-30.sql.zip`](https://t.zsxq.com/15v3qYyNi) 下载附件，解压出 SQL 文件，然后导入到数据库中。

**友情提示：↑↑↑ crm.sql 是可以点击下载的！ ↑↑↑**

重要说明：该 SQL 仅芋道星球成员可使用和商用，否则视为侵权（索赔 100 万，永久追溯）【下载即视为同意】。

所以表名字，都使用 `crm_` 作为前缀。

### 3. 第三步，重启项目

重启后端项目，然后访问前端的 CRM 菜单，确认功能是否生效。如下图所示：

![确认功能是否生效](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0.png)

至此，我们就成功开启了 CRM 的功能 🙂

---

## 3. 客户管理

> 原文：<https://doc.iocoder.cn/crm/customer/>

本文接 [《【线索】线索管理》](https://doc.iocoder.cn/crm/clue)，主要讲解四部分：客户信息、客户公海配置、客户限制配置、联系人。它们的表关系如下图所示：

![表关系](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E8%A1%A8%E5%85%B3%E7%B3%BB.png)

### 1. 客户

客户模块，由 `yudao-module-crm` 后端模块的 `customer` 包的 CrmCustomerController 实现，包括客户管理（我的客户）、公海客户。其中，公海客户是指没有负责人的客户，可以被人分配或者领取成为负责人。

### 1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_customer` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号，主键自增',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '客户名称',

  `owner_user_id` bigint DEFAULT NULL COMMENT '负责人的用户编号',
  `owner_time` datetime NOT NULL COMMENT '成为负责人的时间',
  `lock_status` bit(1) NOT NULL DEFAULT b'0' COMMENT '锁定状态',
  `deal_status` bit(1) NOT NULL DEFAULT b'0' COMMENT '成交状态',

  `follow_up_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '跟进状态',
  `contact_last_time` datetime DEFAULT NULL COMMENT '最后跟进时间',
  `contact_last_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最后跟进内容',
  `contact_next_time` datetime DEFAULT NULL COMMENT '下次联系时间',

  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机',
  `telephone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'QQ',
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `area_id` bigint DEFAULT NULL COMMENT '地区编号',
  `detail_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '详细地址',
  `industry_id` int DEFAULT NULL COMMENT '所属行业',
  `level` int DEFAULT NULL COMMENT '客户等级',
  `source` int DEFAULT NULL COMMENT '客户来源',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `owner_user_id` (`owner_user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 客户表';
```

**友情提示：客户表的字段，和线索表的字段类似，只是多了 `lock_status`、`deal_status` 字段。**

① `owner_user_id` 字段：客户的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

差别在多了 `owner_time` 字段，成为负责人超过一定时间后，客户自动释放进入公海。当然，如果客户被 `lock_status` 锁定，或者有 `deal_status` 成交，就不会释放。

② 从 `follow_up_status` 到 `contact_next_time` 字段：跟进相关，和线索类似。不重复赘述，详细可见 [《【通用】跟进记录》](https://doc.iocoder.cn/crm/follow-up/) 文档。

③ 从 `mobile` 到 `remark` 字段：客户的基本信息，和客户一致，不重复赘述。

#### 1.2. 管理后台（客户管理）

对应 [CRM 系统 -> 客户管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/customer` 目录。

![客户管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条客户。如下图所示：

![新增客户](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E6%96%B0%E5%A2%9E.png)

② 点击“客户名称”，进入客户详情页，可以查看客户的详细信息，如下图所示：

![客户详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E8%AF%A6%E6%83%85.png)

③ 点击【更改成交状态】按钮，标记客户 `deal_status` 为已成交，这样它就不会自动进入公海。

![客户成交](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E6%88%90%E4%BA%A4.png)

同理，点击【更改锁定状态】按钮，标记客户 `lock_status` 为已锁定。

![客户锁定](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E9%94%81%E5%AE%9A.png)

#### 1.3. 管理后台（公海客户）

① 点击【放入公海】按钮，将 `owner_user_id` 字段置空，即可放入公海。

![客户放入公海](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E6%94%BE%E5%85%A5%E5%85%AC%E6%B5%B7.png)

放入公海后，可以在 [CRM 系统 -> 公海客户] 菜单中，可以看到该客户。如下图所示：

![公海客户](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%85%AC%E6%B5%B7%E5%AE%A2%E6%88%B7.png)

② 继续点击该公海客户的“客户名称”，还是进入客户详情页，如下图所示：

![公海客户详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%85%AC%E6%B5%B7%E5%AE%A2%E6%88%B7%E8%AF%A6%E6%83%85.png)

③ 此时，可以点击【领取】或【分配】按钮，将公海客户分配给自己或者其它人。如下图所示：

![公海客户领取](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%85%AC%E6%B5%B7%E5%AE%A2%E6%88%B7%E9%A2%86%E5%8F%96.png)

![公海客户分配](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%85%AC%E6%B5%B7%E5%AE%A2%E6%88%B7%E5%88%86%E9%85%8D.png)

### 2. 客户限制配置

客户限制配置，由 `yudao-module-crm` 后端模块的 `customer` 包的 CrmCustomerLimitConfigController 实现。

#### 2.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_customer_limit_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',

  `type` int NOT NULL COMMENT '规则类型 1: 拥有客户数限制，2:锁定客户数限制',

  `user_ids` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '规则适用人群',
  `dept_ids` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '规则适用部门',

  `max_count` int NOT NULL COMMENT '数量上限',
  `deal_count_enabled` tinyint DEFAULT NULL COMMENT '成交客户是否占有拥有客户数(当 type = 1 时)',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 客户限制配置表';
```

① `type` 字段：规则类型，1 表示拥有客户数限制，2 表示锁定客户数限制。这样的话，可以避免一个人拥有太多客户，或者锁定太多客户。

② `user_ids` 和 `dept_ids` 字段：规则适用人群和部门，可以根据人群和部门来限制客户数量。

③ `max_count` 字段：数量上限，即最多拥有或者锁定的客户数量。

`deal_count_enabled` 字段：成交客户是否占有拥有客户数，当 `type` = 1 时，表示成交客户是否占有拥有客户数。这样的话，可以避免一个人拥有太多成交客户。

#### 2.2. 管理后台

对应 [CRM 系统 -> 系统配置 -> 客户限制配置] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/limitConfig` 目录。

![拥有客户数限制](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E9%99%90%E5%88%B6%E9%85%8D%E7%BD%AE-%E6%8B%A5%E6%9C%89%E5%AE%A2%E6%88%B7%E6%95%B0%E9%99%90%E5%88%B6.png)

![锁定客户数限制](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E9%99%90%E5%88%B6%E9%85%8D%E7%BD%AE-%E9%94%81%E5%AE%9A%E5%AE%A2%E6%88%B7%E6%95%B0%E9%99%90%E5%88%B6.png)

### 3. 客户公海配置

客户公海配置，由 `yudao-module-crm` 后端模块的 `customer` 包的 CrmCustomerPoolConfigController 实现。

#### 3.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_customer_pool_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',

  `enabled` tinyint(1) NOT NULL COMMENT '是否启用客户公海',
  `contact_expire_days` int DEFAULT NULL COMMENT '未跟进放入公海天数',
  `deal_expire_days` int DEFAULT NULL COMMENT '未成交放入公海天数',

  `notify_enabled` tinyint(1) DEFAULT NULL COMMENT '是否开启提前提醒',
  `notify_days` int DEFAULT NULL COMMENT '提前提醒天数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 客户公海配置表';
```

① `enabled` 字段：是否启用客户公海。如果启用，那么超过 `contact_expire_days` 天未跟进的客户，或者超过 `deal_expire_days` 天未成交的客户，就会自动进入公海。

目前，该功能是通过 CrmCustomerAutoPutPoolJob 定时任务实现的。你可以参考 [《定时任务》](https://doc.iocoder.cn/job/) 文档，自己配置每 5 分钟执行一次。

② `notify_enabled` 字段：是否开启提前提醒。如果开启，那么超过 `notify_days` 天未跟进的客户，或者超过 `notify_days` 天未成交的客户，可以在 [CRM 系统 -> 待办事项] 菜单中，看到提醒。如下图所示：

![待进入公海的客户](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9-%E5%BE%85%E8%BF%9B%E5%85%A5%E5%85%AC%E6%B5%B7%E7%9A%84%E5%AE%A2%E6%88%B7.png)

#### 3.2. 管理后台

对应 [CRM 系统 -> 系统配置 -> 客户公海配置] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/poolConfig` 目录。

![客户公海配置](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E5%AE%A2%E6%88%B7%E5%85%AC%E6%B5%B7%E9%85%8D%E7%BD%AE.png)

### 4. 联系人

联系人模块，由 `yudao-module-crm` 后端模块的 `contact` 包实现。

#### 4.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_contact` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '联系人名称',
  `customer_id` bigint DEFAULT NULL COMMENT '客户编号',

  `owner_user_id` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '负责人用户编号',

  `contact_last_time` datetime DEFAULT NULL COMMENT '最后跟进时间',
  `contact_last_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最后跟进内容',
  `contact_next_time` datetime DEFAULT NULL COMMENT '下次联系时间',

  `mobile` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `telephone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电子邮箱',
  `qq` int DEFAULT NULL,
  `wechat` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area_id` bigint DEFAULT NULL COMMENT '地区',
  `detail_address` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',

  `sex` int DEFAULT NULL COMMENT '性别',
  `master` bit(1) DEFAULT NULL COMMENT '是否关键决策人',
  `parent_id` bigint DEFAULT NULL COMMENT '直系上属',
  `post` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '职务',
  `tenant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 联系人';
```

① `customer_id` 字段：联系人所属的客户编号，它必须关联到客户表的 `id` 字段。

② `owner_user_id` 字段：联系人的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

③ 从 `contact_last_time` 到 `contact_next_time` 字段：跟进相关，和线索类似。不重复赘述，详细可见 [《【通用】跟进记录》](https://doc.iocoder.cn/crm/follow-up/) 文档。

④ 从 `mobile` 到 `detail_address` 字段：联系人的基本信息，和客户一致，不重复赘述。

差异的点，是额外增加了 `sex`、`master`、`parent_id`、`post` 字段。不过它们也是信息字段，没有什么特殊逻辑。

#### 4.2. 管理后台

对应 [CRM 系统 -> 联系人管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/contact` 目录。

![联系人管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E8%81%94%E7%B3%BB%E4%BA%BA%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条联系人。如下图所示：

![新增联系人](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E8%81%94%E7%B3%BB%E4%BA%BA%E6%96%B0%E5%A2%9E.png)

② 点击“联系人名称”，进入联系人详情页，可以查看联系人的详细信息，如下图所示：

![联系人详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%AE%A2%E6%88%B7/%E8%81%94%E7%B3%BB%E4%BA%BA%E8%AF%A6%E6%83%85.png)

具体操作比较简单，只有【编辑】、【转移】，所以联系人本质上还是客户的信息补充。

---

## 4. 线索管理

> 原文：<https://doc.iocoder.cn/crm/clue/>

CRM 线索，是指 CRM 系统中关于公司、个人和商机的原始信息，这些信息主要源自于各种渠道的交流，如活动、电话咨询、广告投放、老客户介绍、或购买来的原始数据等。

![线索转换](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E8%BD%AC%E6%8D%A2.png)

这些线索有可能成为企业的潜在【客户】，当有机会沟通后客户表达出购买【产品】意向，并留下联系方式等信息后，就可以转换为【商机】。

---

线索模块，由 `yudao-module-crm` 后端模块的 `clue` 包实现，只有线索功能。如下图所示：

![线索表](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%8A%9F%E8%83%BD%E6%BC%94%E7%A4%BA/%E7%BA%BF%E7%B4%A2%E8%A1%A8.png)

### 1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_clue` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号，主键自增',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '线索名称',

  `owner_user_id` bigint NOT NULL COMMENT '负责人的用户编号',

  `follow_up_status` bit(1) DEFAULT b'0' COMMENT '跟进状态',
  `contact_last_time` datetime DEFAULT NULL COMMENT '最后跟进时间',
  `contact_last_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最后跟进内容',
  `contact_next_time` datetime DEFAULT NULL COMMENT '下次联系时间',

  `transform_status` bit(1) DEFAULT b'0' COMMENT '转化状态',
  `customer_id` bigint DEFAULT NULL COMMENT '客户编号',

  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `telephone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话',
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'QQ',
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `area_id` bigint DEFAULT NULL COMMENT '地区编号',
  `detail_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '详细地址',
  `industry_id` int DEFAULT NULL COMMENT '所属行业',
  `level` int DEFAULT NULL COMMENT '客户等级',
  `source` int DEFAULT NULL COMMENT '客户来源',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 线索表';
```

① `owner_user_id` 字段：线索的负责人编号，对应 `system_users` 表的 `id` 字段。在 CRM 系统中，线索、客户、商机、合同等等，都有负责人的概念，你可以理解它是“销售”的概念，负责客户的全流程跟进。

后续可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

② `follow_up_status` 字段：跟进状态，`true` 表示已跟进，`false` 表示未跟进。在 CRM 系统中，线索、客户、商机、合同等等，也都有跟进状态的概念，客户是被一步步跟进，直到成交出【合同】，最后【回款】。

`contact_last_time`、`contact_last_content`、`contact_next_time` 字段：最后跟进时间、最后跟进内容、下次联系时间。

后续可见 [《【通用】跟进记录》](https://doc.iocoder.cn/crm/follow-up/) 文档。

③ `transform_status` 字段：转化状态，`true` 表示已转化，`false` 表示未转化。

当转化后，会创建出一条客户记录，此时 `customer_id` 字段会指向客户的编号。

④ 从 `mobile` 到 `remark` 字段：线索的基本信息，包括手机号、电话、QQ、微信、邮箱、地区、详细地址、所属行业、客户等级、客户来源、备注等。

### 2. 管理后台

对应 [CRM 系统 -> 线索管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/clue` 目录。

![管理后台 - 线索管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条线索。如下图所示：

![新增线索](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E6%96%B0%E5%A2%9E.png)

② 点击“线索名称”，进入线索详情页，可以查看线索的详细信息，如下图所示：

![线索详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E8%AF%A6%E6%83%85.png)

详情可以分成 3 个部分：

- 顶部：线索的基本信息
- 下面：线索的关联信息
- 右上角：线索的操作按钮

**友情提示：客户、联系人、合同等其它模块的详情页，也是类似的结构，都有基本信息、关联信息、操作按钮。**

③ 点击【转移】按钮，可以修改线索的负责人，如下图所示：

![转移线索](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E8%BD%AC%E7%A7%BB.png)

**友情提示：客户、联系人、合同等其它模块的转移功能，也是类似的操作。**

④ 点击【转化为客户】按钮，可以将线索转化为客户。转化后，会创建出一条客户记录，此时 `customer_id` 字段会指向客户的编号，如下图所示：

![转化为客户](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%BA%BF%E7%B4%A2/%E7%BA%BF%E7%B4%A2%E8%BD%AC%E5%8C%96.png)

---

如果你要批量转移线索，可参考 [#451](https://github.com/YunaiV/ruoyi-vue-pro/pull/451)、[#31](https://github.com/yudaocode/yudao-ui-admin-vue3/pull/31)

---

## 5. 商机管理

> 原文：<https://doc.iocoder.cn/crm/business/>

CRM 商机，是指 CRM 系统中可能转化为实际销售的潜在业务机会【商机】，这些机会有可能转化为实际的销售【合同】。

![商机转换](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E8%BD%AC%E6%8D%A2.png)

一个商机，通常需要经过一系列的销售阶段，如挖掘、资格验证、需求分析、价值评估等，最后才能成为一笔实际的交易。因此，整体的表结构如下：

![表关系](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E8%A1%A8%E5%85%B3%E7%B3%BB.png)

---

商机模块，由 `yudao-module-crm` 后端模块的 `business` 包实现，包括两个部分：商机信息、商机状态配置。

### 1. 商机状态

商机状态，由 `yudao-module-crm` 后端模块的 `business` 包的 CrmBusinessStatusController 实现。

#### 1.1. 表结构

> 【商机状态组表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_business_status_type` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '状态组名',

  `dept_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用的部门编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 商机状态组表';
```

为什么需要商机状态组表？因为不同的商机，它的状态流程是不一样的。比如：

- 状态组 1：“初步接触”、“需求分析”、“方案制定”、“商务谈判”、“合同签订”、“赢单”、“输单”、“无效”等等
- 状态组 2：“功能演示”、“直接付款”、“赢单”、“输单”、“无效”等等。

当然无论哪种状态组，结束时必然是 CrmBusinessEndStatusEnum 枚举，对应“赢单”、“输单”、“无效”三种。

① `name` 字段：状态组名字。

② `dept_ids` 字段：哪些部门可以使用该状态组。如果不设置，默认全公司。

> 【商机状态（阶段）表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_business_status` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type_id` bigint NOT NULL COMMENT '状态类型编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '状态类型名',
  `percent` decimal(24,6) NOT NULL COMMENT '赢单率',
  `sort` int NOT NULL DEFAULT '1' COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 商机状态表';
```

① `type_id` 字段：状态类型（阶段）编号，对应 `crm_business_status_type` 表的 `id` 字段。

② `name` 字段：状态类型（阶段）名字。`percent` 字段：赢单率，即该状态下的商机最终成交的概率。

当然，这 2 个本质也是字段，没什么特殊逻辑。

#### 1.2. 管理后台

对应 [CRM 系统 -> 系统配置 -> 商机状态配置] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/business/status` 目录。

![商机状态配置](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E7%8A%B6%E6%80%81%E9%85%8D%E7%BD%AE.png)

点击【新增】按钮，可以新增商机状态组，如下图所示：

![新增商机状态组](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E7%8A%B6%E6%80%81%E9%85%8D%E7%BD%AE%E6%96%B0%E5%A2%9E.png)

### 2. 商机

商机，由 `yudao-module-crm` 后端模块的 `business` 包的 CrmBusinessController 实现。

#### 2.1. 表结构

> 【商机表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_business` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商机名称',
  `customer_id` bigint NOT NULL COMMENT '客户编号',

  `owner_user_id` bigint DEFAULT NULL COMMENT '负责人的用户编号',

  `follow_up_status` bit(1) DEFAULT b'0' COMMENT '跟进状态',
  `contact_last_time` datetime DEFAULT NULL COMMENT '最后跟进时间',
  `contact_next_time` datetime DEFAULT NULL COMMENT '下次联系时间',

  `status_type_id` bigint DEFAULT NULL COMMENT '商机状态类型编号',
  `status_id` bigint DEFAULT NULL COMMENT '商机状态编号',
  `end_status` tinyint DEFAULT NULL COMMENT '结束状态：1-赢单 2-输单3-无效',

  `deal_time` datetime DEFAULT NULL COMMENT '预计成交日期',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '备注',

  `total_product_price` decimal(24,6) DEFAULT NULL COMMENT '产品总金额，单位：元',
  `discount_percent` decimal(24,6) DEFAULT NULL COMMENT '整单折扣，百分比',
  `total_price` decimal(24,6) DEFAULT NULL COMMENT '商机总金额，单位：元',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='CRM 商机表';
```

① `customer_id` 字段：客户编号，对应 `crm_customer` 表的 `id` 字段，必填。

② `owner_user_id` 字段：，商机的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

③ 从 `follow_up_status` 到 `contact_next_time` 字段：跟进相关，和线索类似。不重复赘述，详细可见 [《【通用】跟进记录》](https://doc.iocoder.cn/crm/follow-up/) 文档。

④ `status_type_id` 字段：商机状态类型编号，对应 `crm_business_status_type` 表的 `id` 字段。`status_id` 字段：商机状态编号，对应 `crm_business_status` 表的 `id` 字段。

当商机结束时，会记录 `end_status` 字段，对应 CrmBusinessEndStatusEnum 枚举，最终就是“赢单”、“输单”、“无效”三种。

⑤ `total_product_price`、`discount_percent`、`total_price` 字段：商机的金额相关，关系是 `total_price = total_product_price * discount_percent`。

其中，`total_product_price` 字段是 `crm_business_product` 表的 `total_price * count` 的累加。

> 【商机产品表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_business_product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',

  `business_id` bigint NOT NULL COMMENT '商机编号',
  `product_id` bigint NOT NULL COMMENT '产品编号',

  `product_price` decimal(24,6) NOT NULL COMMENT '产品单价',
  `business_price` decimal(24,6) NOT NULL COMMENT '商机价格',
  `count` decimal(24,6) NOT NULL COMMENT '数量',
  `total_price` decimal(24,6) NOT NULL COMMENT '总计价格',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='CRM 商机产品关联表';
```

① `business_id` 字段：商机编号，对应 `crm_business` 表的 `id` 字段。

`product_id` 字段：产品编号，对应 `crm_product` 表的 `id` 字段。

② `product_price` 字段：产品单价，**冗余**，来自 `crm_product` 表的 `price` 字段。目的是，和 `business_price` 字段比较，看看是否有折扣。

`count`、`total_price` 字段：数量、总计价格。

#### 2.2. 管理后台

对应 [CRM 系统 -> 商机管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/business` 目录。

![商机管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条商机。如下图所示：

![新增商机](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E6%96%B0%E5%A2%9E.png)

② 点击“商机名称”，进入商机详情页，可以查看商机的详细信息，如下图所示：

![商机详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E8%AF%A6%E6%83%85.png)

③ 点击【变更商机状态】按钮，可以变更商机的状态，如下图所示：

![变更商机状态](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E5%8F%98%E6%9B%B4%E7%8A%B6%E6%80%81.png)

可以多次变更，直到 `end_status` 字段有值，即商机结束，即“赢单”、“输单”、“无效”三种。

### 3. 联系人与商机的关联

联系人与商机之间，可以进行关联。这个功能，由 `yudao-module-crm` 后端模块的 `contact` 包的 CrmContactController 实现。

#### 3.1. 表结构

```sql
CREATE TABLE `crm_contact_business` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `contact_id` int DEFAULT NULL COMMENT '联系人id',
  `business_id` int DEFAULT NULL COMMENT '商机id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 联系人商机关联表';
```

比较简单，就是 `contact_id` 字段和 `business_id` 字段的关联。

#### 3.2. 管理后台

① 在联系人详情页，在 [商机] 标签页，可以查看联系人关联的商机，如下图所示：

![联系人关联的商机](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E8%81%94%E7%B3%BB%E4%BA%BA%E5%85%B3%E8%81%94%E7%9A%84%E5%95%86%E6%9C%BA.png)

- 点击【创建商机】按钮，可以创建一个新的商机，同时关联到当前联系人
- 点击【关联】按钮，可以关联已有的商机到当前联系人。但是要注意，只能关联联系人 `customer_id` 字段相同的商机

② 在商机详情页，在 [联系人] 标签页，可以查看商机关联的联系人，如下图所示：

![商机关联的联系人](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%95%86%E6%9C%BA/%E5%95%86%E6%9C%BA%E5%85%B3%E8%81%94%E7%9A%84%E8%81%94%E7%B3%BB%E4%BA%BA.png)

- 点击【创建联系人】按钮，可以创建一个新的联系人，同时关联到当前商机
- 点击【关联】按钮，可以关联已有的联系人到当前商机。但是要注意，只能关联商机 `customer_id` 字段相同的联系人

---

## 6. 合同管理

> 原文：<https://doc.iocoder.cn/crm/contract/>

合同模块，由 `yudao-module-crm` 后端模块的 `contract` 包实现，已经和 [BPM 工作流](https://doc.iocoder.cn/bpm/) 打通审批。

### 1. 合同

合同，由 `yudao-module-crm` 后端模块的 `business` 包的 CrmContractController 实现。表关系如下：

![表关系](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E8%A1%A8%E5%85%B3%E7%B3%BB.png)

### 1. 表结构

> 【合同表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_contract` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号，主键自增',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '合同名称',
  `no` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '合同编号',

  `customer_id` bigint NOT NULL COMMENT '客户编号',
  `business_id` bigint DEFAULT NULL COMMENT '商机编号',

  `contact_last_time` datetime DEFAULT NULL COMMENT '最后跟进时间',

  `owner_user_id` bigint DEFAULT NULL COMMENT '负责人的用户编号',

  `process_instance_id` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '工作流编号',
  `audit_status` tinyint NOT NULL DEFAULT '0' COMMENT '审批状态',

  `total_product_price` decimal(24,6) DEFAULT NULL COMMENT '产品总金额',
  `discount_percent` decimal(24,6) DEFAULT NULL COMMENT '整单折扣',
  `total_price` decimal(10,2) DEFAULT NULL COMMENT '合同总金额',

  `order_date` datetime DEFAULT NULL COMMENT '下单日期',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `sign_contact_id` bigint DEFAULT NULL COMMENT '联系人编号',
  `sign_user_id` bigint DEFAULT NULL COMMENT '公司签约人',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 合同表';
```

① `no` 字段：合同编号，系统自动生成的，目前格式是 `{prefix}{yyyyMMdd}{6 位自增}`。具体可见 ErpNoRedisDAO 类。

② `customer_id` 字段：客户编号，对应 `crm_customer` 表的 `id` 字段，必填。

③ `business_id` 字段：商机编号，对应 `crm_business` 表的 `id` 字段，选填。在选择商机时，会自动带出商机的 `crm_business_product` 表的产品信息，稍后会看到

④ `contact_last_time` 字段：跟进相关，和线索类似。不重复赘述，详细可见 [《【通用】跟进记录》](https://doc.iocoder.cn/crm/follow-up/) 文档。

⑤ `owner_user_id` 字段：合同的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

⑥ `process_instance_id` 字段：工作流编号，用于和 [BPM 工作流](https://doc.iocoder.cn/bpm/) 打通审批。提交审批后，会自动创建一个工作流实例，并记录到该字段。

`audit_status` 字段：审批结果，目前由 CrmAuditStatusEnum 枚举，目前有 5 个状态：未提交、审批中、审批通过、审批不通过、已取消。

⑤ `total_product_price`、`discount_percent`、`total_price` 字段：合同的金额相关，关系是 `total_price = total_product_price * discount_percent`。

其中，`total_product_price` 字段是 `crm_contract_product` 表的 `total_price * count` 的累加。

⑥ 从 `order_date` 到 `sign_user_id` 字段：合同的信息字段，比较简单，不重复赘述。

> 【合同产品表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_contract_product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',

  `contract_id` bigint NOT NULL COMMENT '合同编号',
  `product_id` bigint NOT NULL COMMENT '产品编号',

  `product_price` decimal(24,6) NOT NULL COMMENT '产品单价',
  `contract_price` decimal(24,6) NOT NULL COMMENT '合同价格',
  `count` decimal(24,6) NOT NULL COMMENT '数量',
  `total_price` decimal(24,6) NOT NULL COMMENT '总计价格',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='CRM 合同产品关联表';
```

**友情提示：整体和商机产品表 `crm_business_product` 类似。因为本身商机进一步转化后，就是合同。**

① `contract_id` 字段：合同编号，对应 `crm_contract` 表的 `id` 字段。

`product_id` 字段：产品编号，对应 `crm_product` 表的 `id` 字段。

② `product_price` 字段：产品单价，**冗余**，来自 `crm_product` 表的 `price` 字段。目的是，和 `contract_price` 字段比较，看看是否有折扣。

`count`、`total_price` 字段：数量、总计价格。

### 2. 管理后台

对应 [CRM 系统 -> 合同管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/contract` 目录。

![合同管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条合同。如下图所示：

![新增合同](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E6%96%B0%E5%A2%9E.png)

② 点击【提交审批】按钮，可以提交审批。如下图所示：

![提交审批](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E6%8F%90%E4%BA%A4%E5%AE%A1%E6%89%B9.png)

**友情提示：**

合同对应的审批流程，需要自己在 [工作流程 -> 流程管理 -> 流程模型] 菜单，配置一个流程标识为 `crm-contract-audit` 的流程模型。如下图所示：

![流程模型](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E6%B5%81%E7%A8%8B%E6%A8%A1%E5%9E%8B.png)

如果不了解怎么配置的同学，可以学习下 [《BPM 工作流》](https://doc.iocoder.cn/bpm/) 的文档。

提交完成后，会自动创建一个工作流实例，并记录到 `process_instance_id` 字段。之后可点击【查看审批】按钮，查看审批详情。如下图所示：

![查看审批](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E5%AE%A1%E6%89%B9%E8%AF%A6%E6%83%85.png)

点击审批【通过】按钮，将合同审批通过，此时它会回调 CrmContractResultListener 监听器，更新合同的 `audit_status` 字段为审批通过。如下图所示：

![审批通过](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E5%AE%A1%E6%89%B9%E9%80%9A%E8%BF%87.png)

③ 点击“合同名称”，进入合同详情页，可以查看合同的详细信息，如下图所示：

![合同详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E8%AF%A6%E6%83%85.png)

### 2. 合同配置

客户公海配置，由 `yudao-module-crm` 后端模块的 `contract` 包的 CrmContractConfigController 实现。

#### 2.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_contract_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `notify_enabled` tinyint(1) DEFAULT NULL COMMENT '是否开启提前提醒',
  `notify_days` int DEFAULT NULL COMMENT '提前提醒天数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 合同配置表';
```

目前主要是合同提醒功能。

`notify_enabled` 字段：是否开启提前提醒。如果开启，合同的结束时间 `end_time` 超过今天，并且小于 `notify_days` 天的，可以在 [CRM 系统 -> 待办事项] 菜单中，看到提醒。如下图所示：

![即将到期的合同](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%8D%B3%E5%B0%86%E5%88%B0%E6%9C%9F%E7%9A%84%E5%90%88%E5%90%8C.png)

#### 2.2. 管理后台

对应 [CRM 系统 -> 系统配置 -> 合同配置] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/contract/config` 目录。

![合同配置](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%90%88%E5%90%8C/%E5%90%88%E5%90%8C%E9%85%8D%E7%BD%AE.png)

### 666. 社区贡献相关

- [《Pull Request：编码规则配置，根据配置的规则生成业务单据编号》](https://gitee.com/zhijiantianya/ruoyi-vue-pro/pulls/1016/)

---

## 7. 回款管理

> 原文：<https://doc.iocoder.cn/crm/receivable/>

CRM 回款，主要指的是在销售过程中，企业与客户签订销售【合同】后，从客户那里实际收到的款项的记录。

回款模块，由 `yudao-module-crm` 后端模块的 `receivable` 包实现，已经和 [BPM 工作流](https://doc.iocoder.cn/bpm/) 打通审批。

目前有两种回款链路，因此表关系如下图所示：

- 【合同】=>【回款】
- 【合同】=>【回款计划】=>【回款】

![表关系](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E8%A1%A8%E5%85%B3%E7%B3%BB.png)

### 1. 回款

回款，由 `yudao-module-crm` 后端模块的 `receivable` 包的 CrmReceivableController 实现。

### 1. 表结构

> 【回款表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_receivable` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `no` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '回款编号',

  `customer_id` bigint NOT NULL COMMENT '客户ID',
  `contract_id` bigint NOT NULL COMMENT '合同ID',

  `plan_id` bigint DEFAULT NULL COMMENT '回款计划ID',

  `owner_user_id` bigint DEFAULT NULL COMMENT '负责人的用户编号',

  `audit_status` tinyint NOT NULL COMMENT '审批状态',
  `process_instance_id` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '工作流编号',

  `price` decimal(24,6) NOT NULL COMMENT '回款金额',

  `return_time` datetime DEFAULT NULL COMMENT '回款日期',
  `return_type` int DEFAULT NULL COMMENT '回款方式',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 回款管理';
```

① `no` 字段：回款编号，系统自动生成的，目前格式是 `{prefix}{yyyyMMdd}{6 位自增}`。具体可见 ErpNoRedisDAO 类。

② `customer_id` 和 `contract_id` 字段：客户编号和合同编号，对应 `crm_customer` 表和 `crm_contract` 表的 `id` 字段，必填。

③ `plan_id` 字段：回款计划编号，对应 `crm_receivable_plan` 表的 `id` 字段，选填。只有在【合同】=>【回款计划】=>【回款】的情况下，才会有值。

④ `owner_user_id` 字段：回款的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

⑤ `process_instance_id` 字段：工作流编号，用于和 [BPM 工作流](https://doc.iocoder.cn/bpm/) 打通审批。提交审批后，会自动创建一个工作流实例，并记录到该字段。

`audit_status` 字段：审批结果，目前由 CrmAuditStatusEnum 枚举，目前有 5 个状态：未提交、审批中、审批通过、审批不通过、已取消。

⑥ `price` 字段：回款金额。一个合同可能有多次回款，它总的回款金额不能超过合同金额。

⑦ `return_time`、`return_type`、`remark` 字段：回款日期、回款方式、备注。就是信息字段，没什么特殊逻辑。

#### 2.2. 管理后台

对应 [CRM 系统 -> 回款管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/receivable` 目录。

![回款管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E7%AE%A1%E7%90%86.png)

① 参考 [《【合同】合同管理、合同提醒》](https://doc.iocoder.cn/crm/contract) 文档，创建一个合同。注意，必须审核通过，才能进行回款。

② 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条回款。如下图所示：

![新增回款](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E6%96%B0%E5%A2%9E.png)

这样，我们就完成了【合同】=>【回款】的整个回款链路。

② 点击【提交审批】按钮，可以提交审批。如下图所示：

![提交审批](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E6%8F%90%E4%BA%A4%E5%AE%A1%E6%89%B9.png)

**友情提示：**

回款对应的审批流程，需要自己在 [工作流程 -> 流程管理 -> 流程模型] 菜单，配置一个流程标识为 `crm-receivable-audit` 的流程模型。如下图所示：

![流程模型](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E6%B5%81%E7%A8%8B%E6%A8%A1%E5%9E%8B.png)

如果不了解怎么配置的同学，可以学习下 [《BPM 工作流》](https://doc.iocoder.cn/bpm/) 的文档。

提交完成后，会自动创建一个工作流实例，并记录到 `process_instance_id` 字段。之后可点击【查看审批】按钮，查看审批详情。如下图所示：

![查看审批](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E5%AE%A1%E6%89%B9%E8%AF%A6%E6%83%85.png)

点击审批【通过】按钮，将回款审批通过，此时它会回调 CrmReceivableResultListener 监听器，更新回款的 `audit_status` 字段为审批通过。如下图所示：

![审批通过](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E5%AE%A1%E6%89%B9%E9%80%9A%E8%BF%87.png)

③ 点击“回款编号”，进入回款详情页，可以查看回款的详细信息，如下图所示：

![回款详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E8%AF%A6%E6%83%85.png)

---

另外，也可以在【合同】的详情页，进行【回款】的创建。如下图所示：

![新增回款（合同）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E6%96%B0%E5%A2%9E-%E5%90%88%E5%90%8C.png)

### 2. 回款计划

回款计划，由 `yudao-module-crm` 后端模块的 `receivable` 包的 CrmReceivablePlanController 实现。

#### 2.1. 表结构

> 【回款计划表】省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_receivable_plan` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',

  `period` bigint NOT NULL COMMENT '期数',

  `customer_id` bigint NOT NULL COMMENT '客户编号',
  `contract_id` bigint NOT NULL COMMENT '合同编号',

  `owner_user_id` bigint DEFAULT NULL COMMENT '负责人编号',

  `receivable_id` bigint DEFAULT NULL COMMENT '回款编号',

  `return_time` datetime DEFAULT NULL COMMENT '计划回款日期',
  `return_type` tinyint DEFAULT NULL COMMENT '计划还款方式',
  `price` decimal(24,6) NOT NULL COMMENT '计划回款金额',
  `remind_days` bigint DEFAULT NULL COMMENT '提前几天提醒',
  `remind_time` datetime DEFAULT NULL COMMENT '提醒日期',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 回款计划';
```

由于 `crm_receivable_plan` 是 `crm_receivable` 的计划（草稿），所以结构上非常相似。

① `period` 字段：期数，比如第一期、第二期、第三期等。目前是基于 `contract_id` 在 `crm_receivable_plan` 表中的最大期数加 1。

② `customer_id` 和 `contract_id` 字段：客户编号和合同编号，对应 `crm_customer` 表和 `crm_contract` 表的 `id` 字段，必填。

③ `owner_user_id` 字段：回款计划的负责人编号，和线索类似。不重复赘述，详细可见 [《【通用】数据权限》](https://doc.iocoder.cn/crm/permission/) 文档。

④ `receivable_id` 字段：回款编号，对应 `crm_receivable` 表的 `id` 字段，选填。

只有在【合同】=>【回款计划】=>【回款】的情况下，才会有值。即基于【回款计划】创建【回款】时，会将【回款】的 `id` 字段记录到这里。

⑤ `return_time`、`return_type`、`price`、`remind_days`、`remind_time`、`remark` 字段：回款日期、回款方式、回款金额、提醒天数、提醒日期、备注。就是信息字段，没什么特殊逻辑。

不过 `remind_time` 字段，有点特殊，它是 `return_time` 字段减去 `remind_days` 字段的日期，后续用于提醒，如下图所示：

![待回款提醒](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%BE%85%E5%9B%9E%E6%AC%BE%E6%8F%90%E9%86%92.png)

#### 2.2. 管理后台

对应 [CRM 系统 -> 回款计划] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/receivable/plan` 目录。

![回款计划](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E8%AE%A1%E5%88%92.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一条回款计划。如下图所示：

![新增回款计划](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E8%AE%A1%E5%88%92%E6%96%B0%E5%A2%9E.png)

② 点击【创建回款】按钮，可以创建回款。如下图所示：

![创建回款（回款计划）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E6%96%B0%E5%A2%9E-%E5%9B%9E%E6%AC%BE%E8%AE%A1%E5%88%92.png)

这样，我们就完成了【合同】=>【回款计划】=>【回款】的整个回款链路。

③ 点击“期数”，进入回款计划详情页，可以查看回款计划的详细信息，如下图所示：

![回款计划详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E8%AE%A1%E5%88%92%E8%AF%A6%E6%83%85.png)

---

另外，也可以在【合同】的详情页，进行【回款计划】的创建。如下图所示：

![新增回款计划（合同）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E5%9B%9E%E6%AC%BE/%E5%9B%9E%E6%AC%BE%E8%AE%A1%E5%88%92%E6%96%B0%E5%A2%9E-%E5%90%88%E5%90%8C.png)

---

## 8. 产品管理

> 原文：<https://doc.iocoder.cn/crm/product/>

**友情提示：**

考虑到 ERP 和 CRM 的解耦，CRM 独立做了一个产品模块。

如果你的系统即用到 ERP 又用到 CRM，并且希望使用一套产品，则可以以 ERP 产品为主进行改造。

产品模块，由 `yudao-module-crm` 后端模块的 `product` 包实现，主要有产品信息、产品分类等功能。如下图所示：

![表关系](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E4%BA%A7%E5%93%81/%E8%A1%A8%E5%85%B3%E7%B3%BB.png)

### 1. 产品分类

产品分类，由 CrmProductCategoryController 提供接口。

#### 1.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_product_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',

  `parent_id` bigint NOT NULL COMMENT '父级编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 产品分类表';
```

分类目前支持 2 级分类，即 `parent_id` 为 0 的是一级分类，否则是二级分类。

#### 1.2. 管理后台

对应 [CRM 系统 -> 系统配置 -> 产品分类] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/product/category` 目录。

![管理后台 - 产品分类](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E4%BA%A7%E5%93%81/%E4%BA%A7%E5%93%81%E5%88%86%E7%B1%BB.png)

### 2. 产品管理

产品管理，由 CrmProductController 提供接口。

#### 2.1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '产品编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '产品名称',

  `category_id` bigint NOT NULL COMMENT '产品分类编号',
  `unit` tinyint DEFAULT NULL COMMENT '单位',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态',

  `owner_user_id` bigint NOT NULL COMMENT '负责人的用户编号',
  `no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '产品编码',
  `price` decimal(24,6) DEFAULT '0.000000' COMMENT '价格，单位：元',
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '产品描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 产品表';
```

① `unit` 字段：产品单位，对应 `crm_product_unit` 数据字典。

② `status` 字段：产品状态，0 开启、1 禁用。

③ `category_id` 字段：产品分类编号，对应 `crm_product_category` 表。

其它字段，都是一些信息字段，暂时没有什么特殊逻辑。

#### 2.2. 管理后台

对应 [CRM 系统 -> 产品管理 -> 产品管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/product` 目录。

![管理后台 - 产品管理](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E4%BA%A7%E5%93%81/%E4%BA%A7%E5%93%81%E7%AE%A1%E7%90%86.png)

① 点击【新增】按钮，随便填写一些信息，点击「确认」按钮，即可新增一个产品。如下图所示：

![新增产品](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E4%BA%A7%E5%93%81/%E4%BA%A7%E5%93%81%E6%96%B0%E5%A2%9E.png)

④ 点击“产品名称”，进入产品详情页，可以查看产品的详细信息，如下图所示：

![产品详情](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E4%BA%A7%E5%93%81/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85.png)

---

## 9. 跟进记录

> 原文：<https://doc.iocoder.cn/crm/follow-up/>

跟进记录，由 `yudao-module-crm` 后端模块的 `followup` 包实现，支持线索、客户、联系人、商机、合同等对象的跟进记录。

### 1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_follow_up_record` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',

  `biz_type` int DEFAULT NULL COMMENT '数据类型',
  `biz_id` bigint DEFAULT NULL COMMENT '数据编号',

  `next_time` datetime DEFAULT NULL COMMENT '下次联系时间',
  `type` int DEFAULT NULL COMMENT '跟进类型',
  `content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '跟进内容',
  `pic_urls` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片',
  `file_urls` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附件',

  `business_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '关联的商机编号数组',
  `contact_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '关联的联系人编号数组',
   PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='CRM 跟进记录';
```

① `biz_type`、`biz_id` 字段：关联被跟进的对象，其中 `biz_type` 由 CrmBizTypeEnum 枚举，包括线索、客户、联系人、商机、合同等等。

② 从 `type` 到 `file_urls` 字段：跟进记录的基本信息，包括跟进类型、跟进内容、下次联系时间、图片、附件等等。比较重要的是 `next_time` 字段，用于提醒用户下次联系时间。

③ `business_ids`、`contact_ids` 字段：关联的商机编号数组、关联的联系人编号数组。例如说，某个跟进记录关联了 3 个商机、2 个联系人。

### 2. 管理后台

在每个数据的详情界面，有一个 [跟进记录] 的功能，可以查看、新增、删除跟进记录。如下图所示：

![跟进记录（界面）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95.png)

① 点击【写跟进】按钮，会弹出一个对话框，可以填写跟进记录的基本信息。如下图所示：

![写跟进（界面）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95/%E5%86%99%E8%B7%9F%E8%BF%9B.png)

② 确认后，会新增一条跟进记录。另外，在这个过程中，会更新对应对象的 `next_time` 字段，用于提醒用户下次联系时间。如下图所示：

![写跟进（代码）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95/%E5%86%99%E8%B7%9F%E8%BF%9B-%E5%90%8E%E7%AB%AF.png)

也就是说，`crm_follow_up_record` 用于记录每一次跟进，`biz_type` + `biz_id` 对应的对象（客户、商机、联系人等等）自己也会记录最后一次的跟进信息。

### 2. 待办事项

对应 [CRM 系统 -> 待办事项] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/crm/backlog` 目录。如下图所示：

![待办事项](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95/%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9.png)

它目前没有单独的表存储，或者专属的后端模块，而是通过每个对象的 Controller 实现的。比如说，客户的待办事项是通过 CrmCustomerController 实现的。如下图所示：

![待办事项（代码）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E8%B7%9F%E8%BF%9B%E8%AE%B0%E5%BD%95/%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9-%E5%90%8E%E7%AB%AF.png)

---

## 10. 数据权限

> 原文：<https://doc.iocoder.cn/crm/permission/>

数据权限，由 `yudao-module-crm` 后端模块的 `permission` 包实现，支持某个人对某个数据（线索、客户、商机、合同等等），有对应的权限。

目前权限由 CrmPermissionLevelEnum 枚举，包括 3 种：`OWNER`（负责人）、`WRITE`（读写）、`READ`（只读），并且 `OWNER > WRITE > READ`。

**友情提示：**

为什么不使用全局封装的 [《数据权限》](https://doc.iocoder.cn/data-permission) 呢？

目前 CRM 系统的数据权限比较灵活，部分功能无法很好的支持。例如说：

- 全局的数据权限，只支持对某个数据的操作权限，而 CRM 需要分 OWNER、WRITE、READ 三种权限
- 全局的数据全量，对关联数据的权限控制，无法很好的支持。例如说：对某个客户有 WRITE 权限时，可以 WRITE 它下面的联系人、商机、合同等等

你可以理解全局的数据权限是基于 DB（DAO）层面实现的，而 CRM 的数据权限是基于 Service 层面实现的。

### 1. 表结构

> 省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段

```sql
CREATE TABLE `crm_permission` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',

  `user_id` bigint NOT NULL DEFAULT '0' COMMENT '用户编号',

  `biz_type` tinyint NOT NULL DEFAULT '100' COMMENT '数据类型',
  `biz_id` bigint NOT NULL DEFAULT '0' COMMENT '数据编号',

  `level` int NOT NULL DEFAULT '0' COMMENT '会员等级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='CRM 数据权限表';
```

基本就是三要素：

- 人：`user_id` 字段
- 数据：`biz_type` + `biz_id` 字段。其中 `biz_type` 由 CrmBizTypeEnum 枚举，包括线索、客户、联系人、商机、合同、回款等等
- 权限：`level` 字段。由 CrmPermissionLevelEnum 枚举，包括 `OWNER`、`WRITE`、`READ` 三种

#### 1.1. `OWNER` 负责人

① 每个数据在新增时，会插入一条 `OWNER` 的权限。例如说，新增一个客户，会插入一条 `OWNER` 的权限。如下图所示：

![新增 OWNER 负责人（代码）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E6%96%B0%E5%A2%9E-%E8%B4%9F%E8%B4%A3%E4%BA%BA.png)

② 每个数据在转移时，会对新、老负责人的权限做不同的处理。例如说，联系人转移给其他人，会更新对应的权限。如下图所示：

![转移 OWNER 负责人（界面）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E8%BD%AC%E7%A7%BB-%E8%B4%9F%E8%B4%A3%E4%BA%BA.png)

- 老负责人，会将对应的 `crm_permission` 的 `level` 更新为 `READ`
- 新负责人，会插入一条 `OWNER` 的权限

![转移 OWNER 负责人（代码）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E8%BD%AC%E7%A7%BB-%E8%B4%9F%E8%B4%A3%E4%BA%BA2.png)

#### 1.2. `WRITE` 读写、`READ` 只读

在每个数据的详情界面，有一个 [团队成员] 的功能，可以查看当前数据的权限，同时可以修改 `WRITE` 和 `READ` 的权限。如下图所示：

![新增读写权限（界面）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E6%96%B0%E5%A2%9E-%E8%AF%BB%E5%86%99.png)

这是一个通用的功能，不需要每个数据都实现一遍，在 CrmPermissionController 已经统一实现。如下图所示：

![新增读写权限（代码）](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E6%96%B0%E5%A2%9E-%E8%AF%BB%E5%86%992.png)

**友情提示：为什么转移负责人不能在 CrmPermissionController 统一实现呢？**

考虑到查询方便，每个数据记录自身会有 `owner_user_id` 字段，转移时需要更新，所以没一起实现。

### 3. 后端实现

#### 2.1. 操作校验

操作校验，通过 `@CrmPermission` 注解实现，只要添加在 Service 方法上，即可实现对应的权限校验。

![CrmPermission 注解](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CrmPermission%E6%B3%A8%E8%A7%A3.png)

① 使用示例，如下图所示：

![CrmPermission 注解使用示例](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CrmPermission%E6%B3%A8%E8%A7%A3%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B.png)

② 通过 Spring AOP 实现，可见 CrmPermissionAspect 类，如下图所示：

![CrmPermissionAspect 类](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CrmPermissionAspect%E7%B1%BB.png)

通过这个类，我们也可以看出为什么要有 `crm_permission` 表。如果没有这个表，我们需要查询每个业务的数据，通过它们的字段，判断当前用户是否有权限，这样拓展性比较差。

③ 【CRM 管理员】的角色枚举是 `crm_admin`，它和全局的【超级管理员】 `super_admin` 是分开的。如下图所示：

![CRM 管理员](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CRM%E7%AE%A1%E7%90%86%E5%91%98.png)

也就是说，把【CRM 管理员】分配给某个人时，可以查询和操作所有 CRM 的数据。

#### 2.2. 查询过滤

在数据的列表界面，我们需要在 DB 数据库查询的时候，就将没有 `READ` 权限的数据过滤掉。

**疑问：为什么不通过类似 `@CrmPermission` 注解实现呢？**

可以实现，但是会查询特别多没权限的数据到内存中，导致性能比较差。

这个无法通用实现，目前是每个业务 Mapper 拼接 SQL 实现，通过联表查询 `crm_permission` 表，进行过滤。如下图所示：

![查询过滤](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/%E6%9F%A5%E8%AF%A2%E8%BF%87%E6%BB%A4.png)

核心的拼接逻辑在 CrmPermissionUtils 的 `#appendPermissionCondition(...)` 方法里，不是很复杂，可以自己瞅瞅。如下图所示：

![appendPermissionCondition 方法](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CrmPermissionUtils%E7%B1%BB.png)

另外，CRM 系统的所有管理界面，都有一个 CrmSceneTypeEnum 枚举，分成 3 种场景：`OWNER` 我负责的，`INVOLVED` 我参与的、`SUBORDINATE` 下属负责的，也是通过上面查询实现的。

![CRM 场景](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90/CRM%E5%9C%BA%E6%99%AF.png)

**画外音**

看到这里，在回过头看为什么不基于全局的 [《数据权限》](https://doc.iocoder.cn/data-permission) 实现，是不是有点明白了呢？

在设计系统的数据权限，我们总是渴望通过全局的、自动化的方式实现。但是，实际上，业务的数据权限是非常复杂的，很难通过全局的方式实现。

因此，我们需要在业务层面，实现对应的数据权限逻辑。嘿嘿~

---

## 11. 移动端（uni-app）

> 原文：<https://doc.iocoder.cn/crm/mobile/>

**友情提示**

本文讲解 yudao 移动端（uni-app 版）的 CRM 系统，重点说清楚两件事：CRM 模块**已经提供手机端**、当前支持的**主要功能**。

- 仓库：[https://github.com/yudaocode/yudao-ui-admin-uniapp](https://github.com/yudaocode/yudao-ui-admin-uniapp)，基于 `uni-app` + `Vue3` + `wot-ui` 实现，支持 H5、微信小程序等多端。
- 后端：复用 PC 端同一套 `yudao-module-crm` 模块与 `/crm/**` 接口，移动端只是换了一层 UI。

### 1. 移动端功能

- 销售业务：待办、线索、客户、联系人、公海、商机、合同、回款和产品等。
- 数据统计：客户分析、销售漏斗、员工业绩、产品分析、排行榜等。
- 系统配置：产品分类、商机状态、客户限制、公海、合同和业绩目标配置。

![CRM 移动端](https://doc.iocoder.cn/img/CRM%E6%89%8B%E5%86%8C/%E7%A7%BB%E5%8A%A8%E7%AB%AF/%E5%B7%A5%E4%BD%9C%E5%8F%B0.png)

### 2. 启动与发布

- 启动：参考 [《快速启动【前端】》](https://doc.iocoder.cn/quick-start-front/) 文档的「1.4 Vue3 + uni-app 版本」小节。
- 发布：参考 [《运行发布》](https://doc.iocoder.cn/admin-uniapp/deploy) 文档。

启动完成后，在工作台选择「CRM 系统」即可进入。

### 3. 代码位置

- 页面：`src/pages-crm/`、`src/pages-statistics/crm/`
- 接口：`src/api/crm/`
