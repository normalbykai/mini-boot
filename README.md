# mini-boot

基于芋道开源项目整理的前后端开发底座，前后端分离、同仓库管理。

- **后端**：Spring Boot + Maven 多模块，提供系统管理、权限、多租户和基础设施能力，统一由 mini-server 启动。
- **前端**：Vue 3 + TypeScript + Vben + Ant Design Vue，管理端位于 mini-ui/mini-ui-admin-vben。

## 目录结构

```text
mini-boot/
├─ mini-server/                  # 后端启动与配置
├─ mini-module-system/           # 用户、角色、菜单、租户等
├─ mini-module-infra/            # 文件、配置、代码生成、任务等
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

准备 JDK 17、Maven、MySQL 和 Redis，导入 `sql/mysql/ruoyi-vue-pro.sql`，并修改 `mini-server/src/main/resources/application-local.yaml` 中的数据库和 Redis 配置。

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
