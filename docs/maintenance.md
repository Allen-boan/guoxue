---
title: 维护说明
description: 给维护者看的本地运行、内容修改与 GitHub Pages 部署方式。
---

# 维护说明

普通读者可以直接回到[官网首页](/)。这篇留给一起修总部的人。

## 本地运行

需要 Node.js 22 或以上。首次安装：

```bash
npm install
npm run dev
```

首次安装成功后，将生成的 `package-lock.json` 提交进仓库；之后使用 `npm ci` 保持依赖一致。终端会显示本地访问地址。站点默认部署在 `/guoxue/`，本地访问也包含这个前缀。

```bash
npm run check
npm run build
npm run preview
```

`build` 会先检查原则、理论登记、收录状态和页面映射，再生成 `docs/.vitepress/dist/`。构建产物不提交到主分支。

## 内容放在哪里

| 内容 | 文件位置 |
| --- | --- |
| 首页呈现 | `docs/.vitepress/theme/components/Headquarters.vue` |
| 阅读文章 | `docs/start/`、`charter/`、`principles/`、`practice/`、`new/`、`decisions/` |
| 页面样式与导航 | `docs/.vitepress/theme/style.css`、`docs/.vitepress/config.mts` |
| 可读原则摘要与机器规则 | `constitution/core-principles.md`、`constitution/core-principles.yaml` |
| 理论登记 | `theories/registry.yaml` |
| 投稿格式 | `theories/TEMPLATE.md` 和 `.github/ISSUE_TEMPLATE/` |
| 未来 Agent 的职责 | `agent-spec/README.md` |

底层文件在 [GitHub 仓库](https://github.com/Allen-boan/guoxue) 阅读，不作为普通读者的必经入口。

添加理论时，先写文章与来源，再更新登记表、导航和真实决议。首页的理论卡片、理论地图和决议列表读取登记表；具体决议理由仍需人工写清。

修改收录状态时，同步文章开头的中文状态、登记表和决议记录。修改原则时，更新规则版本，检查已有理论的适用条件。

## GitHub Pages 自动部署

1. 打开 [GitHub 新建仓库](https://github.com/new?name=guoxue)，在 `Allen-boan` 下创建公开仓库 `guoxue`，勾选 **Add a README file**。本项目的默认部署分支为 `main`；若实际分支名称不同，先对齐工作流和编辑链接。
2. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。项目已有工作流，无需另建模板。
3. 推送本项目，包括 `.github/workflows/pages.yml`，以及首次成功安装后生成的 `package-lock.json`。如果尚无锁文件，工作流首次使用 `npm install`；有锁文件时使用 `npm ci`。
4. 首次可以在 **Actions → 发布过学官网 → Run workflow** 手动运行。之后推送到 `main` 会自动发布。
5. 等构建、部署和「验收已发布页面与资源」都成功，再访问 `https://allen-boan.github.io/guoxue/`。验收会检查 18 个公开页面以及首页的样式、脚本资源。

工作流使用最小权限：构建只读仓库；发布阶段读取验收脚本，并需要 `pages: write` 与 `id-token: write`。PR 只做构建，不触发发布。

首次构建生成的锁文件会保存到 Actions 的 `dependency-lock` 构建产物中。将其中的 `package-lock.json` 提交到源码仓库后，后续构建自动使用 `npm ci`。

### 由本会话协助上传时

先打开 [GitHub 应用安装设置](https://github.com/settings/installations)，找到与本会话连接的 ChatGPT / Codex 应用，点击 **Configure**。若使用 **Only select repositories**，将新建的 `guoxue` 加入并保存；已授权所有仓库时无需额外添加。

把仓库链接发回会话后，可以检查仓库访问权限、读取现有内容并提交源码。实际文件写入仍需连接器具备对应权限；构建和部署以 GitHub Actions 的真实结果为准。

当前会话工具支持现有仓库的文件与提交操作，没有新建仓库或修改 Pages 设置的接口，所以这两项需要仓库拥有者在网页中操作。GitHub Actions 可以在 GitHub 上安装依赖并构建，不依赖本会话终端联网。

参考：[OpenAI：GitHub 仓库授权](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt) · [GitHub：设置 Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

若仓库启用了分支保护，或 `github-pages` 环境要求人工批准，按仓库已有规则执行；不要删除保护来强行部署。

如果 Pages 尚未启用，部署可能提示站点不存在。先启用 Pages，再重新运行工作流。若账户或组织禁用了 Actions，需要仓库管理员调整；静态文件本身仍可本地预览。

## 更换仓库名或绑定域名

站点默认前缀为 `/guoxue/`。更换仓库名时，调整 `docs/.vitepress/config.mts` 的前缀、网址和 GitHub 链接。

绑定根域名时，将站点前缀改为 `/`，同时更换 `origin`、README 的官网链接和 `docs/public/CNAME`。不要只改首页链接。

## 当前没有自动审核

这里只提供静态官网、机器规则和未来 Agent 规范。没有联网采集、自动更新、AI API 或自动发布审核结论。日期代表真实的内容整理记录，不会在每次构建时假装更新。

## 许可证待确认

公开仓库尚未选择内容和代码许可证。发起人需要决定是否允许转载、改编及商业使用，再添加明确授权条款。
