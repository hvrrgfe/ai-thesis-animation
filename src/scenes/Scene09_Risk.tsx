import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox, Arrow } from "../components/Primitives";

// Scene 09: 论点三——真正的风险，在人放弃渐构
export const Scene09_Risk: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [2100, 2250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 滑坡动画进度
  const slideStep = interpolate(frame, [400, 1200], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = [
    { label: "正常渐构", desc: "用自己的经验校验AI模型", color: COLORS.green, sub: "学习者：建构→验证→修正" },
    { label: "记代学习", desc: "只记AI的答案", color: COLORS.accent, sub: "不复用自己的经验校验" },
    { label: "言存义失", desc: "能流畅转述机器之言", color: COLORS.highlight, sub: "却不再拥有能判别其谬的内隐模型" },
    { label: "降格为回声", desc: "对象层名义上在人手里", color: COLORS.danger, sub: "实际已被训练数据的编码悄悄接管" },
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
      <SceneTitle delay={0}>论点三：真正的风险，在人放弃渐构</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="80%">
        在把人捧上"目的持有者"的高位之前，须对本论证自身做一次遮蔽检查：
        它假定人会一直保有渐构的能力。这个假定并不牢靠。
      </FadeInText>

      {/* 滑坡动画 */}
      <div style={{ position: "relative", width: "100%", height: 600, marginTop: 40 }}>
        {steps.map((step, i) => {
          const stepOpacity = interpolate(slideStep, [i - 0.5, i], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const stepX = 50 + i * 440;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  position: "absolute",
                  left: stepX,
                  top: 0,
                  width: 380,
                  opacity: stepOpacity,
                }}
              >
                <div
                  style={{
                    background: COLORS.bgLight,
                    borderRadius: 12,
                    border: `2px solid ${step.color}`,
                    padding: 25,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: FONTS.body, color: step.color, fontWeight: 700 }}>{step.label}</div>
                  <div style={{ fontSize: FONTS.caption, color: COLORS.white, marginTop: 12, lineHeight: 1.6 }}>{step.desc}</div>
                  <div style={{ fontSize: FONTS.small, color: COLORS.gray, marginTop: 10, lineHeight: 1.5 }}>{step.sub}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <Arrow
                  x1={stepX + 390}
                  y1={120}
                  x2={stepX + 430}
                  y2={120}
                  delay={400 + i * 200}
                  color={step.color}
                  strokeWidth={3}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* 结论 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 300,
            width: "100%",
            opacity: interpolate(frame - 1500, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: COLORS.bgLight,
              border: `3px solid ${COLORS.danger}`,
              borderRadius: 12,
              padding: 30,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: FONTS.heading, color: COLORS.danger, fontWeight: 700 }}>
              结局不是AI取代人，而是人自我降格为AI的回声
            </div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15, lineHeight: 1.8 }}>
              历史上每一次外化都伴随能力的局部失守，<br />
              而这一次外化的是定义性的能力，失守的代价没有先例。
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.highlight, marginTop: 15, fontWeight: 600 }}>
              「言存义失」的最新版本——能说，但不再懂
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
