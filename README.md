# DynaJev

Timely Guidance for Fast Decisions: Dynamic LLM–Jev Collaboration under Time Pressure.

本目录是可直接上传至 GitHub 的静态网站发布版本，无需安装 Node.js 或运行 Vite。

## 文件结构

```text
docs/
├── index.html
├── favicon.svg
├── assets/
├── CNAME
└── .nojekyll
```

`assets/` 包含页面脚本、样式、四张论文图片和四段演示视频。视频提供 1×、2×、4×、8× 倍速，默认 4×。

## GitHub Pages 发布

将此目录的 `README.md` 和整个 `docs/` 上传到仓库的 `main` 分支。在 Settings → Pages 中选择 Deploy from a branch、`main`、`/docs`。

自定义域名保持 `www.dynajev.top`。`docs/CNAME` 已包含这个域名，`.nojekyll` 是关闭 Jekyll 处理的空文件。提交更新后 GitHub Pages 会自动部署。

更新页面时，将重新构建的网站文件替换到 `docs/`，并保留 `CNAME` 和 `.nojekyll`。

## 本地预览

在本目录运行：

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
```

打开 http://localhost:4173/，结束时按 Ctrl+C。
