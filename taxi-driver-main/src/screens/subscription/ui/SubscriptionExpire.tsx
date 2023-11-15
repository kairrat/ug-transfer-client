import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "@styles";

interface CompProps {
  title: string;
}

export const SubscriptionExpire = ({ title }: CompProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingStart: 19,
        paddingEnd: 12,
        paddingVertical: 17,
        justifyContent: "space-between",
        backgroundColor: colors.gray,
        borderRadius: 7,
      }}
    >
      <Text style={[fonts.text, { color: colors.secondary }]}>{title}</Text>
    </View>
  );
};
