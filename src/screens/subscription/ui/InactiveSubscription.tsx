import React from "react";
import { Text, View } from "react-native";
import { fonts, colors } from "@styles";

export const InactiveSubscription = () => {
  return (
    <View
      style={{
        backgroundColor: colors.gray,
        paddingStart: 17,
        paddingTop: 17,
        paddingBottom: 20,
        gap: 6,
      }}
    >
      <Text style={[fonts.text_semiBold, { color: colors.error }]}>
        НЕАКТИВНА
      </Text>
      <Text style={[fonts.description, { color: colors.white }]}>
        {`*Вы всегда можете \n поменять \ дополнить вашу роль`}
      </Text>
    </View>
  );
};
