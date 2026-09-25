import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { FadeInText } from "../components/Primitives";

// Scene 11: 互动引导
export const Scene11_Interactive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, mass: 1 },
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d0d1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <FadeInText delay={0} fontSize={FONTS.heading} color={COLORS.white} textAlign="center">
        你觉得你会是
      </FadeInText>

      <div style={{ display: "flex", gap: 80, transform: `scale(${scaleSpring})` }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: FONTS.title, color: COLORS.green, fontWeight: 700 }}>渐构者</div>
          <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 12 }}>与AI共同建构模型</div>
        </div>

        <div style={{ fontSize: FONTS.title, color: COLORS.gray, display: "flex", alignItems: "center" }}>
          还是
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: FONTS.title, color: COLORS.danger, fontWeight: 700 }}>记忆者</div>
          <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 12 }}>只记AI的答案</div>
        </div>
      </div>

      <FadeInText delay={120} fontSize={FONTS.caption} color={COLORS.gray} textAlign="center">
        ——评论区告诉我你的选择
      </FadeInText>

      <FadeInText delay={200} fontSize={FONTS.small} color={COLORS.gray} textAlign="center">
        基于文章《当预测被外包，人当何为》| Remotion Animation
      </FadeInText>
    </div>
  );
};
