import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { FadeInText } from "../components/Primitives";

// Scene 02: 价值承诺 — "这篇文章用8分钟讲清..."
export const Scene02_Value: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        opacity: fadeOut,
        padding: 120,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <FadeInText delay={0} fontSize={FONTS.heading} color={COLORS.white} textAlign="center">
        这篇文章用8分钟讲清一个问题：
      </FadeInText>

      <FadeInText delay={30} fontSize={FONTS.body} color={COLORS.gray} textAlign="center">
        人与AI的分界线
      </FadeInText>

      <FadeInText delay={60} fontSize={FONTS.heading} color={COLORS.highlight} textAlign="center" fontWeight={700}>
        不在主仆之间
      </FadeInText>

      <FadeInText delay={90} fontSize={FONTS.body} color={COLORS.gray} textAlign="center">
        而在
      </FadeInText>

      <FadeInText delay={120} fontSize={FONTS.heading} color={COLORS.accent} textAlign="center" fontWeight={700}>
        渐构者 与 记忆者 之间
      </FadeInText>

      <FadeInText delay={200} fontSize={FONTS.caption} color={COLORS.gray} textAlign="center">
        ——基于《当预测被外包，人当何为》
      </FadeInText>
    </div>
  );
};
