import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox, Arrow } from "../components/Primitives";

// Scene 06: 遮蔽检查与自主化
export const Scene06_Concealment: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [1200, 1350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 自主化滑坡动画进度
  const slideProgress = interpolate(frame, [300, 900], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = [
    { label: "正常使用工具", desc: "能力还在，偶尔借助", color: COLORS.green },
    { label: "依赖加深", desc: "越来越离不开工具", color: COLORS.accent },
    { label: "能力萎缩", desc: "中间过程觉察消失", color: COLORS.highlight },
    { label: "完全自主化", desc: "从意识处理滑入自动处理", color: COLORS.danger },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        padding: 80,
        opacity: fadeOut,
        fontFamily: "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <SceneTitle delay={0}>概念四：遮蔽检查 与 自主化</SceneTitle>

      {/* 两个概念并排 */}
      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        <FlatBox
          x={0}
          y={0}
          width={800}
          height={220}
          bg={COLORS.bgLight}
          borderColor={COLORS.accent}
          borderWidth={2}
          delay={20}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "left" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.accent, fontWeight: 700 }}>遮蔽检查</div>
            <FadeInText delay={60} fontSize={FONTS.caption} color={COLORS.white} marginTop={15}>
              对编码过程丢失了什么保持警觉——任何模型化都会丢掉不能编码之物。
            </FadeInText>
          </div>
        </FlatBox>

        <FlatBox
          x={840}
          y={0}
          width={800}
          height={220}
          bg={COLORS.bgLight}
          borderColor={COLORS.danger}
          borderWidth={2}
          delay={40}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "left" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.danger, fontWeight: 700 }}>自主化</div>
            <FadeInText delay={80} fontSize={FONTS.caption} color={COLORS.white} marginTop={15}>
              一项任务长期外包后，从意识处理滑入自动处理，人对中间过程的觉察随之萎缩。
            </FadeInText>
          </div>
        </FlatBox>
      </div>

      {/* 自主化滑坡动画 */}
      <div style={{ position: "relative", width: "100%", height: 500, marginTop: 60 }}>
        <FadeInText delay={200} fontSize={FONTS.body} color={COLORS.gray} y={0}>
          自主化滑坡：以"计算器与心算"为例
        </FadeInText>

        {steps.map((step, i) => {
          const stepOpacity = interpolate(slideProgress, [i - 0.5, i], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const stepX = 100 + i * 420;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  position: "absolute",
                  left: stepX,
                  top: 80,
                  width: 360,
                  height: 180,
                  background: COLORS.bgLight,
                  borderRadius: 12,
                  border: `2px solid ${step.color}`,
                  opacity: stepOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: FONTS.body, color: step.color, fontWeight: 700 }}>{step.label}</div>
                <div style={{ fontSize: FONTS.caption, color: COLORS.white, textAlign: "center" }}>{step.desc}</div>
              </div>

              {i < steps.length - 1 && (
                <Arrow
                  x1={stepX + 370}
                  y1={170}
                  x2={stepX + 410}
                  y2={170}
                  delay={300 + i * 150}
                  color={step.color}
                  strokeWidth={3}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* 先例标注 */}
        <FadeInText delay={1000} fontSize={FONTS.body} color={COLORS.danger} y={300} fontWeight={600}>
          先例：计算器之后心算萎缩，导航之后认路退化
        </FadeInText>

        <FadeInText delay={1150} fontSize={FONTS.caption} color={COLORS.highlight} y={360}>
          ⚠ 而这一次外化的，是定义性的能力——渐构本身
        </FadeInText>
      </div>
    </div>
  );
};
