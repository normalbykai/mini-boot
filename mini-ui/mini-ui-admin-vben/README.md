# mini-boot 管理端

mini-boot 的后台管理前端，基于 Vue 3、TypeScript、Vben 和 Ant Design Vue。

## 开发

环境：Node.js `^22.18.0 || ^24.12.0`、pnpm `11.16.0`。

```powershell
# --frozen-lockfile：严格按 pnpm-lock.yaml 安装，不更新锁文件；与 package.json 不一致时会报错退出。
pnpm install --frozen-lockfile
pnpm dev
```

访问 [localhost:5666](http://localhost:5666)，后端地址为 `http://localhost:48080`。

构建：`pnpm build` · 预览：`pnpm preview` · 类型检查：`pnpm check:type`

## 目录

```text
apps/web-antd/   管理端应用
packages/       公共组件与框架
internal/       构建与规范配置
scripts/        开发工具
```

基于 [芋道 Vben 管理端](https://gitee.com/yudaocode/yudao-ui-admin-vben)，遵循 [MIT License](./LICENSE)。详细配置见 [集成说明](./INTEGRATION.md)。
