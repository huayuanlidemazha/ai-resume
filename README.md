# 智能简历获取与匹配系统（前端原型）

本项目为前后端分离系统的 **前端原型展示**（Vue3 + Vite + Element Plus），包含：

- 招聘者端（首页检索、简历管理、岗位管理、匹配详情弹窗等）
- 求职者端（首页岗位检索、简历管理、匹配详情弹窗等）
- 管理员端（概览统计、可视化图表、用户/岗位/简历管理与检索、详情、删除等）
- 统一登录/注册页（通过下拉框选择角色）

## 本地运行

在本目录（`frontend/`）执行：

```bash
npm install
npm run dev
```

浏览器打开：

- `http://localhost:5173/`

## 构建（生成可交付静态文件）

```bash
npm run build
```

会生成 `dist/` 目录（静态站点文件）。

## 发布到 GitHub Pages（生成可分享链接）

你当前的配置目标链接为：

- `https://huayuanlidemazha.github.io/ai-resume/`

### 关键点

- `vite.config.js` 中已配置：
  - `base: '/ai-resume/'`
- 已提供 GitHub Actions 工作流：
  - `.github/workflows/deploy.yml`

### 操作步骤（你只需要照做）

1. 新建一个 GitHub 仓库：`ai-resume`（仓库名必须是 `ai-resume`）
2. 把本 `frontend/` 目录内容推到该仓库的 `main` 分支
3. 在 GitHub 仓库页面打开：
   - `Settings` → `Pages` → `Build and deployment` → `Source` 选择 `GitHub Actions`
4. 回到仓库 `Actions`，等待工作流 `Deploy Vite to GitHub Pages` 运行完成
5. 访问你的页面：
   - `https://huayuanlidemazha.github.io/ai-resume/`

> 如果你是把整个大项目推到仓库根目录（而不是只推 frontend），工作流需要改成在 `frontend/` 子目录执行构建。请告诉我你的仓库结构，我可以帮你调整工作流。

