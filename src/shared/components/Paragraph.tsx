import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../style/colors';

export enum FontEnum {
  Light = 'Montserrat-Light',
  Regular = 'Montserrat-Regular',
  Medium = 'Montserrat-Medium',
  SemiBold = 'Montserrat-SemiBold',
  Bold = 'Montserrat-Bold',
  Black = 'Montserrat-Black',
}

type Weight = 300 | 400 | 500 | 600 | 700 | 900;
type Align = 'auto' | 'left' | 'right' | 'center';

interface Paragraph extends TextProps {
  weight?: Weight;
  size?: number;
  color?: string;
  align?: Align;
}

const FONTS = {
  300: FontEnum.Light,
  400: FontEnum.Regular,
  500: FontEnum.Medium,
  600: FontEnum.SemiBold,
  700: FontEnum.Bold,
  900: FontEnum.Black,
};

export const Paragraph: React.FC<Paragraph> = function Paragraph({
  weight = 400,
  size = 16,
  color = colors.black,
  align = 'left',
  children,
  style,
}) {
  const FONT = FONTS[weight];

  return (
    <Text style={[{ fontFamily: FONT, fontSize: size, color: color, textAlign: align }, style]}>
      {children}
    </Text>
  );
};
