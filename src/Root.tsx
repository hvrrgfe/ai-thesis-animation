import React from "react";
import { Composition, registerRoot } from "remotion";
import { VideoComposition } from "./Video";

const RemotionRoot: React.FC = () => {
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

registerRoot(RemotionRoot);
