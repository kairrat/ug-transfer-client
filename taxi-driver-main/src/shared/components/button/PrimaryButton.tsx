import React from "react";
import {
  StyleProp,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { sharedStyles, colors, fonts } from "@styles";

interface CompProps {
  text: string;
  onPress: () => void;
  borderRadiusStyle?: number;
  backgroundColorStyle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textColor?: string;
  paddingVertical?: number;
}

export const PrimaryButton = ({
  text,
  containerStyle,
  backgroundColorStyle = colors.primary,
  borderRadiusStyle = 9,
  disabled = false,
  textColor,
  onPress,
  paddingVertical,
}: CompProps) => {
  const opacityStyle = disabled ? 0.5 : 1;

  const compStyles = StyleSheet.create({
    text: {
      width: "100%",
      paddingVertical: paddingVertical ?? 15,
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        sharedStyles.center,
        containerStyle,
        compStyles.text,
        {
          borderRadius: borderRadiusStyle,
          backgroundColor: backgroundColorStyle,
          opacity: opacityStyle,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[fonts.text_semiBold, { color: textColor ?? colors.black }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const compStyles = StyleSheet.create({
  text: {
    width: "100%",
    paddingVertical: 15,
  },
});
