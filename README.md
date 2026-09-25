# 当预测被外包，人当何为——论人与AI的上下结构

基于同名哲学论文的 Remotion 科普动画。扁平MG风格，10分钟时长，1920×1080。

## 技术栈

- **Remotion** — React 视频框架
- **TypeScript** — 类型安全
- **Mixkit** — 免版权音效与背景音乐 (CC0/Mixkit License)

## 快速开始

```bash
npm install
npx remotion studio    # 本地预览
npx remotion render src/Root.tsx MainComp out/video.mp4 --codec=h264 --crf=18
```

## 项目结构

```
src/
├── Root.tsx              # Composition 注册
├── Video.tsx             # 主合成（场景序列 + 音频编排）
├── Theme.ts              # 视觉风格常量
├── components/
│   └── Primitives.tsx    # 可复用组件（FadeInText/FlatBox/Arrow/SceneTitle等）
└── scenes/
    ├── Scene01_Hook.tsx          # 黄金钩子
    ├── Scene02_Value.tsx         # 价值承诺
    ├── Scene03_Externalization.tsx   # 概念：外化
    ├── Scene04_MemoryVsGradual.tsx   # 概念：记忆 vs 渐构
    ├── Scene05_UpperLower.tsx        # 概念：上下结构
    ├── Scene06_Concealment.tsx       # 概念：遮蔽检查与自主化
    ├── Scene07_AIGradual.tsx         # 论点一：AI外化渐构
    ├── Scene08_HumanPosition.tsx     # 论点二：人在对象层
    ├── Scene09_Risk.tsx             # 论点三：放弃渐构的风险
    ├── Scene10_Conclusion.tsx       # 结论
    └── Scene11_Interactive.tsx      # 互动引导
public/audio/
├── bgm/                   # 背景音乐（Mixkit免版权）
└── sfx/                   # 音效（Mixkit免版权）
```

## 音频来源

所有音频来自 [Mixkit](https://mixkit.co)，遵循 Mixkit License（免版权、可用于商业项目、无需署名）。

| 文件 | 来源 | 类型 |
|------|------|------|
| bgm_rest_now.mp3 | Rest Now by Eugenio Mininni | Ambient Atmospheric 5:00 |
| bgm_cyberpunk_city.mp3 | Cyberpunk City by Alejandro Magaña | Ambient Electronica 1:40 |
| sfx_*.mp3 | Mixkit Free SFX | Various |

## GitHub Actions 渲染

推送到 `main` 分支即自动触发渲染。渲染完成后在 Actions 页面下载 `video.mp4`。

## 视频信息

- 时长：10分钟（18000帧 @ 30fps）
- 分辨率：1920×1080
- 编码：H.264 CRF=18
- 风格：扁平MG动画，深色科技背景
