import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox, Arrow } from "../components/Primitives";

// Scene 05: 上下结构
export const Scene05_UpperLower: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [1650, 1800], [1, 0], {
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
      <SceneTitle delay={0}>概念三：上下结构</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="70%">
        任何知识应用皆分两层：上层决定"问题是什么、为谁而问"，下层提供"规律是什么"。
      </FadeInText>

      {/* 双层结构图 */}
      <div style={{ position: "relative", width: "100%", height: 700, marginTop: 40 }}>

        {/* 上层：对象层 */}
        <FlatBox
          x={200}
          y={0}
          width={1320}
          height={280}
          bg={COLORS.bgLight}
          borderColor={COLORS.highlight}
          borderWidth={3}
          delay={40}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "left" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.highlight, fontWeight: 700 }}>
              对象层（上层）
            </div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>
              承载具体的、有利害的问题
            </div>
            <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
              <FadeInText delay={120} fontSize={FONTS.caption} color={COLORS.accent}>
                ① 问题是什么
              </FadeInText>
              <FadeInText delay={150} fontSize={FONTS.caption} color={COLORS.accent}>
                ② 为谁而问
              </FadeInText>
              <FadeInText delay={180} fontSize={FONTS.caption} color={COLORS.accent}>
                ③ 利害所在
              </FadeInText>
            </div>
          </div>
        </FlatBox>

        {/* 上层地位标注 */}
        <FadeInText delay={300} fontSize={FONTS.body} color={COLORS.highlight} x={200} y={290} fontWeight={700}>
          ↑ 地位高于下层：规律若脱离问题，便无处安放
        </FadeInText>

        {/* 箭头连接 */}
        <Arrow
          x1={860}
          y1={350}
          x2={860}
          y2={420}
          delay={350}
          color={COLORS.accent}
          strokeWidth={4}
        />

        {/* 下层：共象层 */}
        <FlatBox
          x={200}
          y={440}
          width={1320}
          height={260}
          bg={COLORS.bgLight}
          borderColor={COLORS.accent}
          borderWidth={2}
          delay={400}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "left" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.accent, fontWeight: 700 }}>
              共象层（下层）
            </div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>
              提供从经验归纳出的普遍规律
            </div>
            <FadeInText delay={500} fontSize={FONTS.caption} color={COLORS.gray} marginTop={20}>
              共象层回答「规律是什么」| 对象层决定「问题是什么、为谁而问」
            </FadeInText>
          </div>
        </FlatBox>

        {/* 底部说明 */}
        <FadeInText delay={800} fontSize={FONTS.caption} color={COLORS.gray} y={720} textAlign="center" width="100%">
          类比：医学理论（共象层）vs 临床决策——该治哪个病人先（对象层）
        </FadeInText>
      </div>
    </div>
  );
};
