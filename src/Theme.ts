// 视觉风格常量 — 扁平MG动画规范

export const COLORS = {
  bg: "#1a1a2e",
  bgLight: "#16213e",
  white: "#e8e8e8",
  accent: "#4ea8de",      // 亮蓝 — 核心概念
  highlight: "#f9b234",    // 橙黄 — 关键词/啊哈时刻
  gray: "#6c6c80",         // 次要文字
  danger: "#c5283d",       // 暗红 — 风险/警示
  green: "#4ecca3",         // 绿 — 正面/结论
} as const;

export const FONTS = {
  title: 72,
  heading: 52,
  body: 36,
  caption: 24,
  small: 18,
} as const;

export const LAYOUT = {
  width: 1920,
  height: 1080,
  padding: 80,
  lineHeight: 1.5,
} as const;

export const ANIM = {
  fadeIn: 15,     // frames for fade in (~0.5s)
  fadeOut: 10,    // frames for fade out
  slideUp: 20,    // frames for slide up
  emphasize: 15,  // frames for scale emphasis
  transition: 12, // frames for cross fade
} as const;
