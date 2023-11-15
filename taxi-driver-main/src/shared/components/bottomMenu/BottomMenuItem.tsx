import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../style";

interface CompProps {
  icon: any;
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const BottomMenuItem = ({
  icon,
  title,
  isActive,
  onPress,
}: CompProps) => {
  const Icon = icon;

  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <Icon size={50} fillColor={isActive ? colors.primary : "#4D4D4D"} />
      <Text
        style={[
          fonts.description,
          { color: isActive ? colors.primary : colors.white },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
