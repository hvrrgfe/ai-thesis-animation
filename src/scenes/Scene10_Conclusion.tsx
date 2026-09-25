import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox } from "../components/Primitives";

// Scene 10: 结论——分界线在渐构者与记忆者之间
export const Scene10_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [1200, 1350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 金句放大动画
  const goldenScale = spring({
    frame: frame - 600,
    fps,
    config: { damping: 15, mass: 1.2 },
    durationInFrames: 30,
  });

  const goldenOpacity = interpolate(frame - 600, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      <SceneTitle delay={0}>结论：分界线在渐构者与记忆者之间</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="85%">
        人与AI的正确关系，既非主仆，也非对手，而是一个新上下结构的两半：
      </FadeInText>

      {/* 新上下结构图 */}
      <div style={{ position: "relative", width: "100%", height: 300, marginTop: 40 }}>
        {/* AI = 共象层 */}
        <FlatBox
          x={60}
          y={0}
          width={700}
          height={260}
          bg={COLORS.bgLight}
          borderColor={COLORS.accent}
          borderWidth={2}
          delay={60}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.accent, fontWeight: 700 }}>AI</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>史上最强的共象层</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 10 }}>
              提供模式映射，回答给定问题
            </div>
          </div>
        </FlatBox>

        {/* 人 = 对象层 */}
        <FlatBox
          x={1100}
          y={0}
          width={700}
          height={260}
          bg={COLORS.bgLight}
          borderColor={COLORS.highlight}
          borderWidth={3}
          delay={80}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.highlight, fontWeight: 700 }}>人</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>对象层的持有者</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 10 }}>
              带着利害提出问题、执持标准、检查遮蔽
            </div>
          </div>
        </FlatBox>

        {/* 中间分界线 */}
        <div
          style={{
            position: "absolute",
            left: 800,
            top: 50,
            width: 260,
            height: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame - 150, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ width: 2, height: 120, background: COLORS.gray }} />
          <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 8, textAlign: "center" }}>
            新上下结构<br />的两半
          </div>
        </div>
      </div>

      {/* 分界线不在人与AI之间 */}
      <FadeInText delay={400} fontSize={FONTS.body} color={COLORS.danger} fontWeight={600} y={350}>
        但分界线不在人与AI之间——
      </FadeInText>

      {/* 最终分叉图 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          marginTop: 10,
          opacity: interpolate(frame - 500, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 100 }}>
          <div
            style={{
              background: COLORS.bgLight,
              border: `3px solid ${COLORS.green}`,
              borderRadius: 12,
              padding: 25,
              width: 420,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: FONTS.heading, color: COLORS.green, fontWeight: 700 }}>渐构者</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.white, marginTop: 10 }}>
              与AI共同渐构 → 获得史上最大的杠杆
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: FONTS.title, color: COLORS.gray }}>|</span>
            <span style={{ fontSize: FONTS.caption, color: COLORS.gray, margin: "0 20px" }}>分界线</span>
            <span style={{ fontSize: FONTS.title, color: COLORS.gray }}>|</span>
          </div>

          <div
            style={{
              background: COLORS.bgLight,
              border: `3px solid ${COLORS.danger}`,
              borderRadius: 12,
              padding: 25,
              width: 420,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: FONTS.heading, color: COLORS.danger, fontWeight: 700 }}>记忆者</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.white, marginTop: 10 }}>
              把判断整个外包 → 获得史上最深的依赖
            </div>
          </div>
        </div>
      </div>

      {/* 金句 */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 60,
          right: 80,
          textAlign: "center",
          transform: `scale(${goldenScale})`,
          opacity: goldenOpacity,
        }}
      >
        <div style={{ fontSize: FONTS.title, color: COLORS.highlight, fontWeight: 700, lineHeight: 1.4 }}>
          当泛化的成本趋近于零，稀缺的不再是答案，
        </div>
        <div style={{ fontSize: FONTS.title, color: COLORS.highlight, fontWeight: 700, lineHeight: 1.4, marginTop: 10 }}>
          而是值得回答的问题，以及敢于对答案负责的人。
        </div>
      </div>
    </div>
  );
};
