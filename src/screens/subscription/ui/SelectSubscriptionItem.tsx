import React, { useCallback } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { colors, fonts } from "@styles";

interface CompProps {
  title: string;
  icon: any;
  isActive: boolean;
  onPress: () => void;
}

export const SelectSubscriptionItem = ({
  title,
  icon,
  isActive,
  onPress,
}: CompProps) => {
  const Icon = icon;

  const calculatedStyles = useCallback(() => {
    return {
      borderWidth: isActive ? 0 : 1,
      borderColor: isActive ? "none" : colors.stroke,
      backgroundColor: isActive ? colors.primary : colors.background,
    };
  }, [isActive]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          calculatedStyles(),
          {
            flexDirection: "row",
            paddingStart: 10,
            paddingVertical: 15,
            borderRadius: 7,
            alignItems: "center",
            gap: 7,
          },
        ]}
      >
        <Icon fillColor={isActive ? colors.black : colors.primary} />
        <Text
          style={[
            fonts.text,
            { color: isActive ? colors.black : colors.white },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
