# mini-boot

基于芋道开源项目整理的前后端开发底座，前后端分离、同仓库管理。

- **后端**：Spring Boot + Maven 多模块，提供系统管理、权限、多租户、基础设施、ERP 进销存、CRM 客户管理和 BPM 工作流能力，统一由 mini-server 启动。
- **前端**：Vue 3 + TypeScript + Vben + Ant Design Vue，管理端位于 mini-ui/mini-ui-admin-vben。

## 目录结构

```text
mini-boot/
├─ mini-server/                  # 后端启动与配置
├─ mini-module-system/           # 用户、角色、菜单、租户等
├─ mini-module-infra/            # 文件、配置、代码生成、任务等
├─ mini-module-erp/              # 产品、采购、销售、库存、财务与统计
├─ mini-module-crm/              # 线索、客户、商机、合同、回款与统计
├─ mini-module-bpm/              # 流程设计、审批任务与流程实例
├─ mini-framework/               # 公共组件与框架
├─ mini-dependencies/            # Maven 依赖版本管理
├─ mini-ui/
│  └─ mini-ui-admin-vben/        # 管理端前端
├─ sql/                          # 数据库初始化脚本
├─ script/                       # 开发与部署脚本
└─ pom.xml                       # Maven 根工程
```

## 启动方式

### 后端

准备 JDK 17、Maven、MySQL 和 Redis，依次导入 `sql/mysql/ruoyi-vue-pro.sql`、`sql/mysql/erp.sql`、`sql/mysql/bpm.sql` 和 `sql/mysql/crm.sql`，并修改 `mini-server/src/main/resources/application-local.yaml` 中的数据库和 Redis 配置。

在项目根目录打开本地命令窗口，执行：

```powershell
mvn -pl mini-server -am clean package -DskipTests
java -jar mini-server/target/mini-server.jar --spring.profiles.active=local
```

默认地址：`http://localhost:48080`。

### 前端

准备 Node.js `^22.18.0 || ^24.12.0`、pnpm `11.16.0`，在另一个命令窗口执行：

```powershell
cd mini-ui/mini-ui-admin-vben
# --frozen-lockfile：严格按 pnpm-lock.yaml 安装，不更新锁文件；与 package.json 不一致时会报错退出。
pnpm install --frozen-lockfile
pnpm dev
```

访问 [localhost:5666](http://localhost:5666)，开发代理连接本机 48080 端口的后端。

构建：`pnpm build`。更多说明见 [前端 README](mini-ui/mini-ui-admin-vben/README.md)。

## ERP 模块

已接入 `mini-module-erp`，复用 Vben 管理端 `apps/web-antd/src/views/erp` 和 `src/api/erp`。接口前缀为 `/admin-api/erp`，Swagger 分组为 `erp`。

- 基础资料：产品、产品分类、单位、供应商、客户、结算账户、仓库。
- 采购和销售：订单、入库/出库、退货、审核与反审核、订单数量回写。
- 库存：其它入库/出库、调拨、盘点、库存查询与变动明细，默认禁止负库存。
- 财务和统计：采购付款、销售收款及相应单据金额回写、采购/销售汇总与趋势、Excel 导出。

已有数据库只需执行 `sql/mysql/erp.sql`。该脚本依据公开 Java 实体和 Mapper 查询整理，创建 33 张 ERP 表，包含租户、逻辑删除、金额/数量精度和查询索引；不清空现有数据，不导入演示业务数据。重复执行不会修改已有表结构。

基础初始化脚本已包含 ERP 菜单和字典。超级管理员可直接访问；普通角色需要分配 ERP 菜单与按钮权限，受限租户还需在租户套餐中开放对应菜单。配置修改后重新构建并启动后端。

本地 MySQL 使用 `127.0.0.1:3307/ruoyi-vue-pro`，账号配置位于 `application-local.yaml`，Redis 使用该文件中已有配置。

迁移来源：[`YunaiV/ruoyi-vue-pro`](https://github.com/YunaiV/ruoyi-vue-pro/tree/971c5a651511e244187cc6b3b0eadf9d9f29c573/yudao-module-erp)，`master-jdk17` 分支，提交 `971c5a651511e244187cc6b3b0eadf9d9f29c573`。已适配本项目 Maven 坐标、包名、Swagger 配置和 FastExcel 注解，保留模块内 MIT 许可文件。

## CRM 与 BPM 模块

CRM 已接入线索、线索转客户、客户公海与领取、联系人、商机阶段、产品、合同、回款计划、回款、跟进记录、团队数据权限、业绩目标和经营统计。复用 Vben 管理端已有 CRM 页面，接口前缀为 `/admin-api/crm`。

合同和回款审批通过 `mini-module-bpm` 的 Flowable 引擎处理，支持人工审批、驳回、取消、审批详情和流程图，审批结果自动回写 CRM。BPM 还提供流程分类、表单、模型设计与部署、待办/已办、任务转派、加签、抄送等接口，复用已有 BPM 页面；接口前缀为 `/admin-api/bpm`。

### 数据库与启动

已有项目依次执行 `sql/mysql/bpm.sql`、`sql/mysql/crm.sql`，然后按上文方式重新打包并在本地命令窗口启动后端。脚本创建 8 张 BPM 业务扩展表、21 张 CRM 表，并补齐流程表达式导出权限；不清空已有数据。Flowable 引擎表由现有 `flowable.database-schema-update: true` 配置在启动时自动初始化。

CRM 表结构依据公开实体与 Mapper 查询整理。商机的未结束状态保留为空，合同和回款的初始审批状态为草稿；集合字段按对应类型处理器使用逗号分隔或 JSON 存储，金额采用十进制定点数。

基础初始化脚本已包含 CRM、BPM 菜单和字典。普通角色需要分配相应菜单与按钮权限，受限租户还需在租户套餐内开放这些菜单。CRM 团队成员的只读、读写、负责人权限由业务数据权限单独控制。

### 初始化合同和回款审批

项目提供可重复执行的初始化脚本，通过 BPM 接口建立并部署 `crm-contract-audit` 和 `crm-receivable-audit` 两个审批模型。使用目标租户管理员的登录令牌，并指定该租户中启用的流程管理员、审批人编号：

```powershell
$env:MINI_API_TOKEN = '<管理员登录令牌>'
python script/crm/init_approval.py --tenant-id 1 --manager-user-id 1 --approver-user-id 1
```

初始模型采用一个人工审批节点，不自动通过。已部署的同名模型会保留；后续在管理端「工作流 → 流程模型」中调整审批人、节点或表单配置，再发布新版本。合同、回款详情组件已关联到审批详情页。

本地开发库的租户 1 已初始化这两个模型，流程管理员和审批人均为用户 1。其它环境、租户需要分别执行初始化。`application-local.yaml` 中 `mini.bpm.notification.sms-enabled` 为 `false`，本地联调不发送审批短信；其它环境默认保留短信通知能力，配置好短信渠道与模板后按需启用。

### 验证

后端构建命令：`mvn -pl mini-server -am package -DskipTests`。

数据翻译初始化回归测试：

```powershell
mvn -pl mini-framework/mini-spring-boot-starter-mybatis -am test "-Dtest=MiniTranslateAutoConfigurationTest" "-Dsurefire.failIfNoSpecifiedTests=false"
```

`script/crm/verify.py` 用于真实接口联调，会创建验证用业务单据，应在独立测试库对应的服务上执行。先对该服务运行审批初始化脚本，再执行：

```powershell
python script/crm/verify.py --base-url http://127.0.0.1:48081/admin-api --tenant-id 1 --user-id 1
```

脚本沿用 `MINI_API_TOKEN`，指定用户应与登录用户及审批模型中的审批人一致。验证覆盖线索转客户与跟进记录复制、公海领取、联系人和商机、合同审批通过/驳回/取消、回款审批、超额回款拦截、列表查询、Excel 导入模板与导出、BPM 任务列表，以及 CRM 统计接口。

迁移来源为 [`YunaiV/ruoyi-vue-pro`](https://github.com/YunaiV/ruoyi-vue-pro/tree/971c5a651511e244187cc6b3b0eadf9d9f29c573)，`master-jdk17` 分支提交 `971c5a651511e244187cc6b3b0eadf9d9f29c573`。两个模块均保留 MIT 许可证，已适配本项目包名、Maven 坐标、Swagger、FastExcel 和配置前缀。
