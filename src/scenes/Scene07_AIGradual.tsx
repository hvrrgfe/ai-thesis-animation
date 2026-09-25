import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox } from "../components/Primitives";

// Scene 07: 论点一——AI外化的不是记忆，而是渐构本身
export const Scene07_AIGradual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [3000, 3150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 三个案例依次展开
  const cases = [
    {
      title: "大语言模型",
      delay: 200,
      desc: "对下一个词元的概率预测",
      detail: "与「从已见归纳、对未见有效」的泛化在结构上同构",
      highlight: "AI做的是渐构，不是记忆",
    },
    {
      title: "AlphaFold",
      delay: 800,
      desc: "悬置数十年的蛋白质折叠问题",
      detail: "压缩为一次前向计算",
      highlight: "两亿种蛋白质结构，AI完成了人类数十年未竟的工作",
    },
    {
      title: "AlphaGo 第37手",
      delay: 1400,
      desc: "人类棋手起初判为失误",
      detail: "后来承认为妙手——它建构的围棋概念与人类传统截然不同",
      highlight: "预测效果却更好",
    },
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
      <SceneTitle delay={0}>论点一：AI外化的不是记忆，而是渐构本身</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="80%">
        流行讨论中，工具论、威胁论、共生论三者共享一个预设：人与AI处在同一层面。
        这是旧编码套用新现象的典型遮蔽。做一次现象还原即可看清——
      </FadeInText>

      {/* 三个案例卡片 */}
      <div style={{ position: "relative", width: "100%", height: 800, marginTop: 40 }}>
        {cases.map((c, i) => {
          const cardOpacity = interpolate(frame - c.delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const highlightOpacity = interpolate(frame - c.delay - 80, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: i * 240,
                width: "100%",
                opacity: cardOpacity,
                display: "flex",
                gap: 30,
                alignItems: "center",
              }}
            >
              {/* 序号 */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: FONTS.heading,
                  color: COLORS.bg,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>

              {/* 内容 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: FONTS.heading, color: COLORS.white, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: FONTS.body, color: COLORS.accent, marginTop: 8 }}>{c.desc}</div>
                <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 8 }}>{c.detail}</div>
                <div
                  style={{
                    fontSize: FONTS.body,
                    color: COLORS.highlight,
                    marginTop: 12,
                    fontWeight: 700,
                    opacity: highlightOpacity,
                  }}
                >
                  → {c.highlight}
                </div>
              </div>
            </div>
          );
        })}

        {/* 结论框 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 760,
            width: "100%",
            opacity: interpolate(frame - 2200, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: COLORS.bgLight,
              border: `3px solid ${COLORS.highlight}`,
              borderRadius: 12,
              padding: 30,
            }}
          >
            <div style={{ fontSize: FONTS.heading, color: COLORS.highlight, fontWeight: 700 }}>
              于是工业时代「人负责创造、机器负责重复」的分工图式彻底失效
            </div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>
              被外化的恰恰是创造的核心工序。问题不再是工具好不好用，
              而是——当预测未见被外包，人还剩下什么。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
