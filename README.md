# DynaJev 网站

本目录是 DynaJev 网站的可编辑静态项目。页面按 Overview → Videos → Method → Results → Analysis 组织，直接使用 HTML、CSS 和 JavaScript，不需要安装 Node 依赖或运行构建命令。

## 文件结构

```text
docs/
├── index.html       # 五区块页面结构与英文论文文案
├── site.css         # 品牌视觉、布局、响应式和无障碍样式
├── site.js          # 方法名、结果、视频清单、资源链接与交互
├── favicon.svg
├── assets/
│   ├── videos/      # 11 条入选 MP4
│   ├── posters/     # 11 张对应初始帧海报
│   └── …            # 当前展示图及其最终转换源
├── figure/           # 保留的高分辨率论文原图，包括 Method 的 Figure 2
├── CNAME
└── .nojekyll
```

经引用审计，旧的 `assets/index-*.js`、`assets/index-*.css`、四条单方法 MP4，以及已被论文原图替代的旧 Method PNG 均已从发布目录删除。含有废弃标记的旧版 Figure 3 PNG 也不在发布目录中；页面使用由最终 `dynajev_difficulty_analysis.pdf` 等价转换得到的 SVG。Method 主图直接使用论文原始 Figure 2（`docs/figure/method.jpg`），并保留点击放大。未被页面直接加载的最终 PDF 转换源与高分辨率论文原图继续保留，便于核验和后续重新导出。

## 修改数据与素材

实验数据、方法显示名和所有媒体配置集中在 `docs/site.js` 顶部：

- `METHODS`：七种方法的唯一显示名称。
- `RESULTS`：Snake、Freeway、Overcooked 和 PvZ 的统一结果源。
- `DYNAJEV_CONFIG.videoGroups`：四个视频组、录像元数据及其方法顺序。
- `DYNAJEV_CONFIG.resources.codeUrl`：Code 的公开地址；页首和页尾都在新标签页打开。Paper 按钮固定禁用，并显示 “Comming soon”。

视频区现有四个同 seed、无 skill 的定性对比组，共 11 条录像：

- `snake_main`：Snake-Hard seed 2，Handoff–Completion、Handoff–Per-Step、DynaJev。
- `freeway_main`：Freeway-Easy seed 3，Handoff–Completion、Handoff–Per-Step、DynaJev。
- `overcooked_main`：Overcooked-Easy seed 4，Handoff–Completion、Handoff–Per-Step、DynaJev。
- `pvz_main`：Plants vs. Zombies-Hard seed 2，Handoff–Per-Step、DynaJev。

录像统一为 1080×2160、24 fps；未播放时使用各录像的 `initial.jpg`，即执行动作前的第一帧。视频在 1x 时按一秒一个环境动作播放，但播放时间不能解释为模型推理耗时。每个播放器下方提供独立的 1x、2x、4x 倍速按钮，初始默认 1x；切换环境时新播放器恢复 1x。页面不提供跨录像 Action Jump，每条录像保留原生播放和全屏控制。

这些录像的生成配置是每步总输出预算 2,304 tokens、planner cap 8,192；下方聚合评测使用 2,048 tokens 和 12,288 round cap。因此页面明确将录像标记为 selected qualitative episodes，不把它们描述为聚合表格的逐 seed 复现。

Code URL 为空时不生成 Code 链接，也不会产生 `href="#"`；Paper 仍保留不可点击的占位按钮。请只填写已确认的公开 Code 链接。

## 字号与布局

HTML 界面的正文为 16px，说明文字为 14–15px，章节编号与导航为 17px。主标题随屏幕宽度调整为 30–48px，章节标题为 26–38px，不再使用 7–13px 的微小字号或 68–82px 的超大标题。全局文字大小集中在 `docs/site.css` 的 `--text-body`、`--text-support` 和 `--text-small` 中。

手机上的分析展开项允许内部表格横向滚动，正文、按钮和页面本身正常换行。论文图片与录像保留原始内容；图片内的文字可通过放大查看。

## 匿名检查范围

本地页面源码、图片和视频元数据未发现作者姓名、邮箱、单位或个人路径；11 条视频没有音轨，抽查的 88 个画面未发现身份信息。Code 保留指定的匿名仓库链接。页面继续设置 `noindex` 与 `no-referrer`，不加载第三方统计或字体服务。

这些检查覆盖本地页面和发布资产。域名解析、托管账户及公开仓库历史仍需独立满足匿名要求；隐藏页面署名或设置 `noindex` 不能消除这些关联。

## 本地预览

在本目录运行：

```bash
python3 -m http.server 4174 --bind 127.0.0.1 --directory docs
```

打开 <http://localhost:4174/>。如果端口已占用，可换用其他端口；结束时按 `Ctrl+C`。

## 修改后的检查

JavaScript 语法检查：

```bash
node --check docs/site.js
```

浏览器中应检查 1440px 桌面和 390px 手机宽度，并确认：

- 五个导航锚点按 Overview → Videos → Method → Results → Analysis 排列。
- 默认视频环境为 Snake；Snake、Freeway、Overcooked、PvZ 分别加载 3、3、3、2 条 MP4，切换环境会暂停离开的播放器。
- 四组视频的环境、难度、seed、无 skill、2,304-token 预算、动作数和结局元数据正确。
- 所有未播放视频显示初始状态，而不是结局帧。
- 竖屏播放器保持 1:2；桌面卡片约 360px 起并仅在视频容器内横向滚动，手机正文不横向溢出。
- 视频区没有 Action Jump 或伪同步控件，每条录像保留原生播放控制。
- 每条录像默认 1x，1x、2x、4x 按钮只改变各自播放器的速度；不显示额外的视频放大链接。
- 页首和页尾均显示禁用的 Paper / Comming soon 按钮；Code 在新标签页打开，原页面保持不变。
- Method 首屏直接显示论文 Figure 2，并可点击放大；不再重复绘制一套 HTML/CSS 流程图。
- Snake 技能切换、辅助任务 Tabs、PvZ 难度切换和最佳值并列正确。
- Simulation protocol、Offline skill refinement、Evaluation setup 和 Analysis 展开项可用。
- Figure 1–4 可放大，Escape 关闭后焦点返回触发按钮。
- 手机页面整体不横向溢出；视频面板和宽表只在各自容器内滚动。

## GitHub Pages 发布

网站由 `main` 分支的 `docs/` 发布到 https://www.dynajev.top/。提交并推送后，GitHub Pages 自动更新。保留 `docs/CNAME` 与 `.nojekyll`，无需在本机持续运行预览服务器。

PvZ 录像包含第三方游戏图像，而当前公开仓库的 `THIRD_PARTY_NOTICES.md` 没有覆盖其再分发许可。页面已显示本地预览/发布前权利核验提示；该提示不等同于获得授权，公开部署前必须确认许可，或移除 PvZ 视频入口与素材。
