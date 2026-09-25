import React from "react";
import { Sequence, Audio, Series, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Scene01_Hook } from "./scenes/Scene01_Hook";
import { Scene02_Value } from "./scenes/Scene02_Value";
import { Scene03_Externalization } from "./scenes/Scene03_Externalization";
import { Scene04_MemoryVsGradual } from "./scenes/Scene04_MemoryVsGradual";
import { Scene05_UpperLower } from "./scenes/Scene05_UpperLower";
import { Scene06_Concealment } from "./scenes/Scene06_Concealment";
import { Scene07_AIGradual } from "./scenes/Scene07_AIGradual";
import { Scene08_HumanPosition } from "./scenes/Scene08_HumanPosition";
import { Scene09_Risk } from "./scenes/Scene09_Risk";
import { Scene10_Conclusion } from "./scenes/Scene10_Conclusion";
import { Scene11_Interactive } from "./scenes/Scene11_Interactive";

// 场景时间表 (30fps)
const FPS = 30;
const SCENES = [
  { component: Scene01_Hook, start: 0, duration: 300 },          // 0:00-0:10
  { component: Scene02_Value, start: 300, duration: 450 },       // 0:10-0:25
  { component: Scene03_Externalization, start: 750, duration: 1950 },  // 0:25-1:30
  { component: Scene04_MemoryVsGradual, start: 2700, duration: 2700 }, // 1:30-3:00
  { component: Scene05_UpperLower, start: 5400, duration: 1800 },     // 3:00-4:00
  { component: Scene06_Concealment, start: 7200, duration: 1350 },    // 4:00-4:45
  { component: Scene07_AIGradual, start: 8550, duration: 3150 },      // 4:45-6:30
  { component: Scene08_HumanPosition, start: 11700, duration: 2250 }, // 6:30-7:45
  { component: Scene09_Risk, start: 13950, duration: 2250 },          // 7:45-9:00
  { component: Scene10_Conclusion, start: 16200, duration: 1350 },    // 9:00-9:45
  { component: Scene11_Interactive, start: 17550, duration: 450 },    // 9:45-10:00
];

// SFX 时间点 (基于全局帧)
const SFX_POINTS = [
  { file: "sfx/sfx_boom.mp3", frame: 75, volume: 0.7 },        // Scene01 冲击点
  { file: "sfx/sfx_ding.mp3", frame: 420, volume: 0.5 },       // Scene02 "渐构者与记忆者"
  { file: "sfx/sfx_intro.mp3", frame: 750, volume: 0.4 },      // Scene03 开始
  { file: "sfx/sfx_whoosh.mp3", frame: 1110, volume: 0.4 },    // Scene03 箭头1
  { file: "sfx/sfx_whoosh.mp3", frame: 1410, volume: 0.4 },    // Scene03 箭头2
  { file: "sfx/sfx_warn.mp3", frame: 2050, volume: 0.5 },      // Scene03 危险提示
  { file: "sfx/sfx_intro.mp3", frame: 2700, volume: 0.4 },     // Scene04 开始
  { file: "sfx/sfx_ding.mp3", frame: 3300, volume: 0.5 },      // Scene04 "创造的核心工序"
  { file: "sfx/sfx_tech_hum.mp3", frame: 3500, volume: 0.3 },  // Scene04 科技氛围
  { file: "sfx/sfx_emphasis.mp3", frame: 5400, volume: 0.5 },  // Scene05 开始
  { file: "sfx/sfx_ding.mp3", frame: 5700, volume: 0.4 },      // Scene05 上层揭示
  { file: "sfx/sfx_intro.mp3", frame: 7200, volume: 0.4 },     // Scene06 开始
  { file: "sfx/sfx_alarm.mp3", frame: 8100, volume: 0.4 },     // Scene06 警告
  { file: "sfx/sfx_tension.mp3", frame: 8400, volume: 0.3 },   // Scene06 紧张氛围
  { file: "sfx/sfx_emphasis.mp3", frame: 8750, volume: 0.5 },  // Scene07 案例1
  { file: "sfx/sfx_emphasis.mp3", frame: 9350, volume: 0.5 },  // Scene07 案例2
  { file: "sfx/sfx_boom.mp3", frame: 9950, volume: 0.6 },      // Scene07 案例3 AlphaGo
  { file: "sfx/sfx_boom.mp3", frame: 10750, volume: 0.7 },     // Scene07 结论
  { file: "sfx/sfx_notify.mp3", frame: 11700, volume: 0.4 },   // Scene08 开始
  { file: "sfx/sfx_ding.mp3", frame: 12300, volume: 0.4 },     // Scene08 三件事
  { file: "sfx/sfx_alarm.mp3", frame: 13950, volume: 0.4 },    // Scene09 开始
  { file: "sfx/sfx_warn.mp3", frame: 14700, volume: 0.5 },     // Scene09 危险
  { file: "sfx/sfx_tension.mp3", frame: 15000, volume: 0.3 },  // Scene09 紧张
  { file: "sfx/sfx_fanfare.mp3", frame: 16800, volume: 0.6 },  // Scene10 金句
  { file: "sfx/sfx_ding.mp3", frame: 17550, volume: 0.5 },     // Scene11 开始
  { file: "sfx/sfx_resolve.mp3", frame: 17900, volume: 0.6 },  // 结尾收束
];

export const VideoComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // BGM 音量曲线：解说段-15dB约0.18，过渡段-8dB约0.4，高潮段-5dB约0.56
  // 用 Remotion 的 volume (0-1) 控制
  const bgmVolume = interpolate(
    frame,
    [
      0, 300,     // 开头安静
      750, 2700,  // 概念讲解段
      5400, 7200, // 结构段
      8550, 11700, // 论点一高潮
      13950, 16200, // 论点三高潮
      16500, 17550, // 结论升华
      17700, 18000, // 结尾
    ],
    [
      0.15, 0.25,
      0.25, 0.25,
      0.25, 0.3,
      0.35, 0.35,
      0.35, 0.35,
      0.3, 0.4,
      0.35, 0.3,
    ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <>
      {/* BGM: Deep Ambient (0-5分钟) → Cyberpunk City (5-10分钟) */}
      <Sequence from={0} durationInFrames={9000}>
        <Audio src={staticFile("audio/bgm/bgm_deep_ambient.mp3")} volume={bgmVolume} />
      </Sequence>
      <Sequence from={9000} durationInFrames={9000}>
        <Audio src={staticFile("audio/bgm/bgm_cyberpunk_city.mp3")} volume={bgmVolume} />
      </Sequence>

      {/* SFX 音效 */}
      {SFX_POINTS.map((sfx, i) => (
        <Sequence key={i} from={sfx.frame} durationInFrames={120}>
          <Audio src={staticFile(`audio/${sfx.file}`)} volume={sfx.volume} />
        </Sequence>
      ))}

      {/* 场景序列 */}
      {SCENES.map((scene, i) => {
        const SceneComponent = scene.component;
        return (
          <Sequence
            key={i}
            from={scene.start}
            durationInFrames={scene.duration}
            name={`Scene ${String(i + 1).padStart(2, "0")}`}
          >
            <SceneComponent />
          </Sequence>
        );
      })}
    </>
  );
};
