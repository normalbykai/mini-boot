# mini-boot 前端集成说明

## 来源与代码管理

- 上游仓库：https://gitee.com/yudaocode/yudao-ui-admin-vben.git
- 导入日期：2026-10-29
- 上游提交：`cb08e79f97405a4c6c485cafba6c0aafdfe583ce`
- 保留 Ant Design Vue 应用及其公共 workspace、锁文件和上游 LICENSE。
- 源码直接纳入 mini-boot 管理，没有嵌套 Git 仓库或 Git 子模块。前后端修改可以在根目录一起提交。
- 仅保留 `apps/web-antd`，默认 `pnpm dev`、`pnpm build`、`pnpm preview` 均面向该应用。

## 本地开发

要求 Node.js `^22.18.0 || ^24.12.0`、pnpm `11.16.0`。在本目录执行：

```powershell
# --frozen-lockfile：严格按 pnpm-lock.yaml 安装，不更新锁文件；与 package.json 不一致时会报错退出。
pnpm install --frozen-lockfile
pnpm dev:antd
```

访问 `http://localhost:5666`。后端单独在本地命令窗口运行根目录的 `mini-server`，默认端口 `48080`。

前端开发环境位于 `apps/web-antd/.env.development`，代理位于 `apps/web-antd/vite.config.ts`；`/admin-api` 转发至 `http://localhost:48080/admin-api`，支持 WebSocket。调整后端端口时，同时修改环境文件中的 `VITE_BASE_URL` 和 Vite 代理目标。

本地开发通过 `VITE_APP_API_ENCRYPT_ENABLE=false` 对齐后端默认关闭 API 加密的配置。生产环境仍保留上游配置，部署时需单独核对 API 地址及加密配置。

已移除上游 `prepare` 自动安装 Git hooks 的脚本，避免在嵌入目录安装依赖时改写根仓库 hooks；其他安装脚本保留。

## 构建与检查

```powershell
pnpm build:antd
pnpm --filter @vben/web-antd run typecheck
```

前端构建产物在 `apps/web-antd/dist`，不参与 Maven 构建。依赖、缓存和构建产物由前端自身的 `.gitignore` 排除。

当前后端仅装配 `system`、`infra` 模块；上游前端还包含其他业务页面，对应能力需要后端模块支持。导入源码不代表所有上游业务接口均已在本项目实现。

## 前端精简范围

已移除四套备用 UI 应用、上游 docs 文档站、GitHub/Gitee 仓库维护文件、Changesets 发布记录及命令、各包历史 CHANGELOG、Gitpod/tea 配置、上游 Git hooks 配置和示例 Docker 部署脚本。

同步清理了 workspace 列表、编辑器工作区、Tailwind 扫描目录和失效命令。业务页面、通用组件、公共框架、构建及代码检查工具保留。后续如需容器部署，应按当前单应用目录重新编写部署配置。
