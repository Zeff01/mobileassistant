import React, { FC } from "react";
import { Defs, LinearGradient, Rect, Svg, Stop } from "react-native-svg";

import { COLORS } from "../constants";

type GradientOverlayProps = {
  height: number | string;
  width: number | string;
};

const GradientOverlay: FC<GradientOverlayProps> = ({
  height,
  width,
  ...props
}) => {
  return (
    <Svg width={width} height={height} {...props}>
      <Defs>
        <LinearGradient x1="0%" x2="0%" y1="0%" y2="100%" id="overlay">
          <Stop offset="0" stopColor={COLORS.black} stopOpacity="0" />
          <Stop offset="1" stopColor={COLORS.black} stopOpacity="0.8" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#overlay)" />
    </Svg>
  );
};

export default GradientOverlay;
