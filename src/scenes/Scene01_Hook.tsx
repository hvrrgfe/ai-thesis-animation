import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../Theme";

// Scene 01: 黄金钩子 — "当AI能预测一切，人还剩下什么？"
export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 黑屏白字渐显 (0-2s)
  const phase1Opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: 文字消失 (2-2.5s)
  const phase2Opacity = interpolate(frame, [60, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: 重新出现强调版 (2.5-3s)
  const phase3Opacity = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase3Scale = spring({
    frame: frame - 75,
    fps,
    config: { damping: 15, mass: 1.2 },
    durationInFrames: 20,
  });

  // Phase 4: 淡出 (9-10s)
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mainOpacity = phase1Opacity * phase2Opacity + phase3Opacity;
  const finalOpacity = mainOpacity * fadeOut;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d0d1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: finalOpacity,
        flexDirection: "column",
        gap: 30,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {frame < 75 ? (
        <div
          style={{
            fontSize: FONTS.title,
            color: COLORS.white,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.6,
            opacity: phase1Opacity * phase2Opacity,
          }}
        >
          当AI能预测一切
        </div>
      ) : (
        <div
          style={{
            transform: `scale(${phase3Scale})`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: FONTS.title, color: COLORS.highlight, fontWeight: 700, lineHeight: 1.6 }}>
            当AI能预测一切
          </div>
          <div style={{ fontSize: FONTS.title, color: COLORS.white, fontWeight: 700, marginTop: 20, lineHeight: 1.6 }}>
            人还剩下什么？
          </div>
        </div>
      )}
    </div>
  );
};
