import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../Theme";
import { SceneTitle, FadeInText, FlatBox } from "../components/Primitives";

// Scene 08: 论点二——人不可让渡的位置，在对象层
export const Scene08_HumanPosition: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [2100, 2250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const threeThings = [
    {
      title: "设定对象层",
      desc: "决定什么问题值得预测",
      delay: 200,
    },
    {
      title: "执持判别标准",
      desc: "「好」究竟服务于谁的生存",
      delay: 400,
    },
    {
      title: "进行遮蔽检查",
      desc: "对编码丢失之物保持痛感",
      delay: 600,
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
      <SceneTitle delay={0}>论点二：人不可让渡的位置，在对象层</SceneTitle>

      <FadeInText delay={20} fontSize={FONTS.body} color={COLORS.gray} width="80%">
        AI拥有前所未有的共象层能力，把人类积累的全部模式变成可调用的映射；
        但它不在利害之中——它没有必须解决的问题，没有因预测错误而承受代价的身体。
      </FadeInText>

      {/* 天平图：AI vs 人 */}
      <div style={{ position: "relative", width: "100%", height: 400, marginTop: 30 }}>
        {/* 左侧：AI = 共象层 */}
        <FlatBox
          x={80}
          y={30}
          width={780}
          height={320}
          bg={COLORS.bgLight}
          borderColor={COLORS.accent}
          borderWidth={2}
          delay={60}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.accent, fontWeight: 700 }}>AI</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>史上最强的共象层</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 20, lineHeight: 1.8 }}>
              ✓ 拥有全部模式映射<br />
              ✓ 能回答一切给定的问题<br />
              ✗ 但"为什么要赢这盘棋"不是它的问题<br />
              ✗ "哪种病值得先治"不由它决断
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 15 }}>
              输入空间由人设定
            </div>
          </div>
        </FlatBox>

        {/* VS */}
        <FadeInText delay={100} fontSize={FONTS.title} color={COLORS.highlight} x={880} y={150} fontWeight={700}>
          VS
        </FadeInText>

        {/* 右侧：人 = 对象层 */}
        <FlatBox
          x={960}
          y={30}
          width={780}
          height={320}
          bg={COLORS.bgLight}
          borderColor={COLORS.highlight}
          borderWidth={3}
          delay={80}
          radius={12}
        >
          <div style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: FONTS.heading, color: COLORS.highlight, fontWeight: 700 }}>人</div>
            <div style={{ fontSize: FONTS.body, color: COLORS.white, marginTop: 15 }}>对象层的持有者</div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.gray, marginTop: 20, lineHeight: 1.8 }}>
              ✓ 带着利害提出问题<br />
              ✓ 执持判别标准<br />
              ✓ 检查遮蔽
            </div>
            <div style={{ fontSize: FONTS.caption, color: COLORS.highlight, marginTop: 15, fontWeight: 600 }}>
              只有会死的东西，才知道什么是要紧的
            </div>
          </div>
        </FlatBox>
      </div>

      {/* 三件事 */}
      <div style={{ position: "relative", width: "100%", height: 300, marginTop: 20 }}>
        <FadeInText delay={150} fontSize={FONTS.body} color={COLORS.white} fontWeight={600}>
          人的不可让渡位置——三件事共同根植于"生命通过预测趋利避害"：
        </FadeInText>

        <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
          {threeThings.map((thing, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: interpolate(frame - thing.delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              <div
                style={{
                  background: COLORS.bgLight,
                  border: `2px solid ${COLORS.highlight}`,
                  borderRadius: 12,
                  padding: 30,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: FONTS.body, color: COLORS.highlight, fontWeight: 700 }}>{thing.title}</div>
                <div style={{ fontSize: FONTS.caption, color: COLORS.white, marginTop: 12 }}>{thing.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
