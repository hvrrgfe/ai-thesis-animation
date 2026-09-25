import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox, Arrow } from "../components/Primitives";

// Scene 03: 概念定义——外化
// 锤子→发动机→计算机，逐层外化
export const Scene03_Externalization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [1800, 1950], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 三阶段：锤子(0-600), 发动机(600-1200), 计算机(1200-1800)
  const items = [
    { label: "锤子", externalizes: "肌肉", icon: "🔨", delay: 60, y: 300 },
    { label: "发动机", externalizes: "畜力", icon: "⚙️", delay: 360, y: 300 },
    { label: "计算机", externalizes: "记忆", icon: "💻", delay: 660, y: 300 },
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
      <SceneTitle delay={0}>概念一：外化</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="60%">
        人类技术史，就是一部能力外化史：把原本由身体承担的活动，转交给身外的物件去执行。
      </FadeInText>

      {/* 外化链条 */}
      <div style={{ position: "relative", width: "100%", height: 500, marginTop: 40 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(frame - item.delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const itemX = 150 + i * 580;
          const itemY = item.y;

          return (
            <React.Fragment key={i}>
              <FlatBox
                x={itemX}
                y={itemY}
                width={440}
                height={280}
                bg={COLORS.bgLight}
                borderColor={COLORS.accent}
                borderWidth={2}
                delay={item.delay}
                radius={12}
              >
                <div style={{ textAlign: "center", opacity: itemOpacity }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: FONTS.body, color: COLORS.white, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: FONTS.caption, color: COLORS.accent, marginTop: 8 }}>
                    外化 → {item.externalizes}
                  </div>
                </div>
              </FlatBox>

              {/* 箭头连接 */}
              {i < items.length - 1 && (
                <Arrow
                  x1={itemX + 460}
                  y1={itemY + 140}
                  x2={itemX + 570}
                  y2={itemY + 140}
                  delay={item.delay + 30}
                  color={COLORS.highlight}
                  strokeWidth={3}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* 底部总结 */}
        <FadeInText delay={1000} fontSize={FONTS.caption} color={COLORS.gray} y={620}>
          外化了的能力，人未必丧失，但依赖加深，能力便随之转移。
        </FadeInText>

        {/* 自主化预警 */}
        <FadeInText delay={1300} fontSize={FONTS.body} color={COLORS.danger} y={680} fontWeight={600}>
          ⚠ 计算器之后，心算萎缩。导航之后，认路退化。
        </FadeInText>
      </div>
    </div>
  );
};
