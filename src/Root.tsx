import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComp"
        component={VideoComposition}
        durationInFrames={18000}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
