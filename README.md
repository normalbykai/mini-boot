# mini-boot

基于芋道开源项目整理的前后端开发底座，前后端分离、同仓库管理。

- **后端**：Spring Boot + Maven 多模块，提供系统管理、权限、多租户、基础设施和 ERP 进销存能力，统一由 mini-server 启动。
- **前端**：Vue 3 + TypeScript + Vben + Ant Design Vue，管理端位于 mini-ui/mini-ui-admin-vben。

## 目录结构

```text
mini-boot/
├─ mini-server/                  # 后端启动与配置
├─ mini-module-system/           # 用户、角色、菜单、租户等
├─ mini-module-infra/            # 文件、配置、代码生成、任务等
├─ mini-module-erp/              # 产品、采购、销售、库存、财务与统计
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

准备 JDK 17、Maven、MySQL 和 Redis，依次导入 `sql/mysql/ruoyi-vue-pro.sql` 和 `sql/mysql/erp.sql`，并修改 `mini-server/src/main/resources/application-local.yaml` 中的数据库和 Redis 配置。

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
