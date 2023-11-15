import React from "react";
import { Path, Svg } from "react-native-svg";
import { IconProps } from "../../../app/types/icon";
import { colors } from "../../style";

interface CompProps extends IconProps {
  width: number;
}

export const ArrowLong = ({
  width,
  size = 16,
  fillColor = colors.opacity,
}: CompProps) => {
  return (
    <Svg width={width} height={size} viewBox="0 0 45 16" fill="none">
      <Path
        d="M1.60962 6.70703C1.05733 6.70703 0.609619 7.15475 0.609619 7.70703C0.609619 8.25932 1.05733 8.70703 1.60962 8.70703L1.60962 6.70703ZM43.9496 8.41414C44.3401 8.02362 44.3401 7.39045 43.9496 6.99993L37.5856 0.635967C37.1951 0.245442 36.562 0.245442 36.1714 0.635966C35.7809 1.02649 35.7809 1.65966 36.1714 2.05018L41.8283 7.70703L36.1714 13.3639C35.7809 13.7544 35.7809 14.3876 36.1714 14.7781C36.562 15.1686 37.1951 15.1686 37.5856 14.7781L43.9496 8.41414ZM1.60962 8.70703L43.2425 8.70703L43.2425 6.70703L1.60962 6.70703L1.60962 8.70703Z"
        fill={fillColor}
      />
    </Svg>
  );
};
