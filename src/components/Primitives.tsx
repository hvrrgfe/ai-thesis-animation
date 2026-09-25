import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS, ANIM } from "../Theme";

// 淡入+上移文字
export const FadeInText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  delay?: number;
  x?: number;
  y?: number;
  textAlign?: "left" | "center" | "right";
  width?: number | string;
}> = ({
  children,
  fontSize = FONTS.body,
  color = COLORS.white,
  fontWeight = 400,
  delay = 0,
  x = 0,
  y = 0,
  textAlign = "left",
  width = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame - delay,
    [0, ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.8 },
    durationInFrames: ANIM.slideUp,
  });

  const translateY2 = interpolate(translateY, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${x}px, ${translateY2 + y}px)`,
        fontSize,
        color,
        fontWeight,
        textAlign,
        width,
        lineHeight: 1.5,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {children}
    </div>
  );
};

// 强调脉冲
export const Pulse: React.FC<{
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
  color?: string;
}> = ({ children, delay = 0, fontSize = FONTS.heading, color = COLORS.highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 1 },
    durationInFrames: ANIM.emphasize,
  });

  const opacity = interpolate(frame - delay, [0, ANIM.fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale})`,
        opacity,
        fontSize,
        color,
        fontWeight: 700,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {children}
    </span>
  );
};

// 扁平圆角矩形
export const FlatBox: React.FC<{
  children?: React.ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  bg?: string;
  borderColor?: string;
  borderWidth?: number;
  delay?: number;
  radius?: number;
}> = ({
  children,
  x = 0,
  y = 0,
  width = 400,
  height = 200,
  bg = COLORS.bgLight,
  borderColor,
  borderWidth = 0,
  delay = 0,
  radius = 8,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, ANIM.fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        background: bg,
        borderRadius: radius,
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {children}
    </div>
  );
};

// 箭头（SVG）
export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  color?: string;
  strokeWidth?: number;
}> = ({ x1, y1, x2, y2, delay = 0, color = COLORS.accent, strokeWidth = 3 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cx = x1 + (x2 - x1) * progress;
  const cy = y1 + (y2 - y1) * progress;

  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity, pointerEvents: "none" }}
    >
      <defs>
        <marker id={`arrow-${delay}-${x1}`} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0,0 L12,6 L0,12 Z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={cx} y2={cy} stroke={color} strokeWidth={strokeWidth} markerEnd={`url(#arrow-${delay}-${x1})`} />
    </svg>
  );
};

// 场景标题
export const SceneTitle: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, ANIM.fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const underlineWidth = interpolate(frame - delay - 5, [0, 20], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, marginBottom: 40 }}>
      <div
        style={{
          fontSize: FONTS.title,
          fontWeight: 700,
          color: COLORS.accent,
          fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
        }}
      >
        {children}
      </div>
      <div
        style={{
          width: underlineWidth,
          height: 4,
          background: COLORS.highlight,
          marginTop: 8,
          borderRadius: 2,
        }}
      />
    </div>
  );
};

// 全局背景
export const SceneBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        padding: LAYOUT_PADDING,
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {children}
    </div>
  );
};

const LAYOUT_PADDING = 80;
