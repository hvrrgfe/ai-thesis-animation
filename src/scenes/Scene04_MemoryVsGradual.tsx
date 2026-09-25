import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox, Arrow } from "../components/Primitives";

// Scene 04: 记忆 vs 渐构
export const Scene04_MemoryVsGradual: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [2550, 2700], [1, 0], {
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
      <SceneTitle delay={0}>概念二：记忆 vs 渐构</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="70%">
        这是全文最关键的一对区分。前者是搬运，后者是创造的核心工序。
      </FadeInText>

      {/* 双分支对比图 */}
      <div style={{ position: "relative", width: "100%", height: 700, marginTop: 60 }}>

        {/* 左侧：记忆 */}
        <FlatBox
          x={100}
          y={30}
          width={760}
          height={500}
          bg={COLORS.bgLight}
          borderColor={COLORS.gray}
          borderWidth={2}
          delay={40}
          radius={12}
        >
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.gray, fontWeight: 700, marginBottom: 20 }}>记忆</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, lineHeight: 1.8 }}>
              重现已见的能力
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 30, lineHeight: 1.8 }}>
              数据库存储既有的东西
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 20 }}>
              ── 搬运 ──
            </div>
            {/* 可视化：数据库图标 */}
            <div style={{ marginTop: 30, display: "flex", gap: 15, justifyContent: "center" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 80,
                    height: 40,
                    background: COLORS.gray,
                    borderRadius: 4,
                    opacity: interpolate(frame - 100 - i * 15, [0, 15], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: FONTS.small, color: COLORS.gray, marginTop: 15 }}>
              ✓ 原样取出
            </div>
          </div>
        </FlatBox>

        {/* 右侧：渐构 */}
        <FlatBox
          x={960}
          y={30}
          width={760}
          height={500}
          bg={COLORS.bgLight}
          borderColor={COLORS.accent}
          borderWidth={3}
          delay={60}
          radius={12}
        >
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.accent, fontWeight: 700, marginBottom: 20 }}>渐构</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, lineHeight: 1.8 }}>
              从已见建构可泛化模型
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.accent, marginTop: 30, lineHeight: 1.8 }}>
              用以预测未见的能力
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.highlight, marginTop: 20 }}>
              ── 创造的核心工序 ──
            </div>
            {/* 可视化：模型建构图标 */}
            <div style={{ marginTop: 30, display: "flex", gap: 15, justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: 40, height: 40, background: COLORS.accent, borderRadius: 4, opacity: interpolate(frame - 200, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
              <span style={{ color: COLORS.highlight, fontSize: 24 }}>→</span>
              <div style={{ width: 60, height: 60, border: `3px dashed ${COLORS.highlight}`, borderRadius: 8, opacity: interpolate(frame - 250, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.highlight, fontSize: 18 }}>模型</div>
              <span style={{ color: COLORS.highlight, fontSize: 24 }}>→</span>
              <div style={{ width: 50, height: 50, background: COLORS.highlight, borderRadius: "50%", opacity: interpolate(frame - 300, [0, 15], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.bg, fontSize: 14 }}>预测</div>
            </div>
            <div style={{ fontSize: FONTS.small, color: COLORS.accent, marginTop: 15 }}>
              ✓ 从经验→模型→预测未见
            </div>
          </div>
        </FlatBox>

        {/* 分界线标注 */}
        <FadeInText delay={500} fontSize={FONTS.body} color={COLORS.highlight} x={760} y={560} fontWeight={700} textAlign="center" width={400}>
          二者的分野 = 人之为人的传统防线
        </FadeInText>

        {/* 底部类比 */}
        <FadeInText delay={800} fontSize={FONTS.caption} color={COLORS.gray} y={640} textAlign="center" width="100%">
          类比：背课文（记忆） vs 举一反三（渐构）| 搬运答案 vs 建构模型
        </FadeInText>
      </div>
    </div>
  );
};
