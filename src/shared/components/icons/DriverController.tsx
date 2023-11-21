import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../../../app/types/icon";
import { colors } from "@styles";

export const DriverController = ({
  fillColor = colors.primary,
  size = 25,
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M17.2357 7.8223C17.2357 6.37903 15.2767 5.29077 12.679 5.29077C10.0812 5.29077 8.12219 6.37903 8.12219 7.8223C8.12219 8.10199 8.34888 8.32861 8.6285 8.32861H16.7294C17.009 8.32861 17.2357 8.10199 17.2357 7.8223Z"
        fill={fillColor}
      />
      <Path
        d="M11.575 19.6238L11.9843 19.0781L11.3918 18.5889L11.575 19.6238Z"
        fill={fillColor}
      />
      <Path
        d="M13.2673 22.5728L13.5417 20.9884L12.6791 19.8384L11.8165 20.9885L12.0909 22.5728H13.2673Z"
        fill={fillColor}
      />
      <Path
        d="M13.9663 18.5889L13.374 19.0779L13.7832 19.6236L13.9663 18.5889Z"
        fill={fillColor}
      />
      <Path
        d="M9.99396 16.4983L9.72302 16.5428C7.62215 16.8864 6.09729 18.6704 6.09729 20.7851V22.5731H11.0631L9.99396 16.4983Z"
        fill={fillColor}
      />
      <Path
        d="M19.2611 20.7851C19.2611 18.6704 17.7362 16.8864 15.6354 16.5428L15.3642 16.4983L14.2952 22.5731H19.2611V20.7851Z"
        fill={fillColor}
      />
      <Path
        d="M14.3565 16.3835C14.1403 16.4275 13.921 16.4633 13.6916 16.4633H11.6664C11.437 16.4633 11.2176 16.4275 11.0015 16.3835L11.1194 17.0503L12.679 18.3382L14.2384 17.0505L14.3565 16.3835Z"
        fill={fillColor}
      />
      <Path
        d="M11.6665 15.4509H13.6918C15.0876 15.4509 16.2233 14.3151 16.2233 12.9193V11.5913C15.9242 11.7657 15.5812 11.8729 15.2107 11.8729H10.1476C9.77711 11.8729 9.43407 11.7657 9.13501 11.5913V12.9193C9.13501 14.3151 10.2707 15.4509 11.6665 15.4509Z"
        fill={fillColor}
      />
      <Path
        d="M10.1476 10.8602H15.2107C15.77 10.8602 16.2233 10.4069 16.2233 9.84762V9.34131H9.13501V9.84762C9.13501 10.4069 9.58836 10.8602 10.1476 10.8602Z"
        fill={fillColor}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.371 16.8736C14.371 16.3008 13.9066 15.8364 13.3338 15.8364H12.0636C11.7885 15.8364 11.5247 15.9456 11.3302 16.1402C11.1357 16.3347 11.0264 16.5985 11.0264 16.8736C11.0264 17.4464 11.4908 17.9108 12.0636 17.9108H13.3338C13.9066 17.9108 14.371 17.4464 14.371 16.8736ZM6.59219 14.199C6.76544 14.2122 6.97505 14.2198 7.18559 14.2075C7.29776 14.7763 7.57641 15.3039 7.99235 15.7199C8.54454 16.272 9.29346 16.5823 10.0744 16.5823H10.4701C10.4527 16.6778 10.4437 16.7752 10.4437 16.8736C10.4437 16.9731 10.4527 17.0705 10.4699 17.1649H10.0744C9.13891 17.1649 8.24177 16.7934 7.58033 16.1319C7.05264 15.6042 6.70941 14.9265 6.59219 14.199ZM6.2958 13.579C5.83577 13.5014 5.40769 13.2827 5.07352 12.9485C4.64971 12.5247 4.41162 11.9499 4.41162 11.3505V9.97334C4.41162 9.37399 4.64971 8.79917 5.07352 8.37536C5.49733 7.95156 6.07214 7.71343 6.6715 7.71343H6.82193C7.06239 4.67842 9.60166 2.29028 12.6987 2.29028C15.7957 2.29028 18.335 4.67842 18.5755 7.71343H18.7259C19.3253 7.71343 19.9001 7.95156 20.3239 8.37536C20.7477 8.79917 20.9858 9.37399 20.9858 9.97334V11.3505C20.9858 11.9499 20.7477 12.5247 20.3239 12.9485C19.9001 13.3723 19.3253 13.6104 18.7259 13.6104H18.059C17.7824 13.6104 17.5582 13.3862 17.5582 13.1096V8.1857C17.5582 5.50185 15.3825 3.32617 12.6987 3.32617C10.0149 3.32617 7.83917 5.50185 7.83917 8.1857V13.1096C7.83917 13.3049 7.72739 13.4741 7.5643 13.5567C7.11538 13.7125 6.41917 13.5998 6.2958 13.579Z"
        fill={fillColor}
      />
    </Svg>
  );
};