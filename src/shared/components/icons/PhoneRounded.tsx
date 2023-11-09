import React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "@styles";
import { IconProps } from "src/app/types/icon";

export const PhoneRounded = ({
  fillColor: backgroundColor = colors.primary,
  size = 23,
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none">
      <Path
        d="M19.4011 4.08028C15.0892 -0.23035 8.09919 -0.229315 3.78856 4.08265C-0.522068 8.39462 -0.521033 15.3846 3.79094 19.6952C8.1029 24.0058 15.0929 24.0048 19.4035 19.6928C21.4737 17.622 22.6364 14.8135 22.6358 11.8854C22.6352 8.95769 21.4716 6.15015 19.4011 4.08028ZM17.2756 16.2262C17.2751 16.2267 17.2746 16.2272 17.2741 16.2277V16.224L16.7148 16.7797C15.9914 17.5122 14.9378 17.8136 13.9364 17.5746C12.9275 17.3045 11.9685 16.8746 11.0955 16.3013C10.2845 15.783 9.53298 15.1771 8.85447 14.4945C8.23016 13.8747 7.66929 13.1942 7.18009 12.4632C6.64501 11.6765 6.22149 10.8195 5.92156 9.91664C5.57773 8.85596 5.86265 7.69209 6.65756 6.91016L7.31257 6.25515C7.49468 6.07222 7.7906 6.07157 7.97349 6.25369C7.97396 6.25416 7.97448 6.25463 7.97495 6.25515L10.0431 8.32325C10.226 8.50536 10.2266 8.80128 10.0445 8.98417C10.044 8.98464 10.0436 8.98512 10.0431 8.98563L8.82868 10.2C8.48024 10.5447 8.43642 11.0923 8.72566 11.488C9.16487 12.0908 9.65092 12.658 10.1792 13.1844C10.7683 13.776 11.4086 14.3142 12.0928 14.7926C12.4881 15.0683 13.024 15.0218 13.366 14.6822L14.5399 13.4899C14.722 13.307 15.0179 13.3063 15.2008 13.4884C15.2013 13.4889 15.2018 13.4894 15.2023 13.4899L17.2741 15.5654C17.4571 15.7474 17.4577 16.0433 17.2756 16.2262Z"
        fill={backgroundColor}
      />
    </Svg>
  );
};
