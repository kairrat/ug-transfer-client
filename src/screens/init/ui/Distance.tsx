import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "@styles";
import { DistanceResult } from "./DistanceResult";

export const Distance = () => {
  return (
    <View style={compStyles.container}>
      <Text style={[fonts.text, compStyles.text]}>
        {"Наша компания проехала всего:"}
      </Text>
      <DistanceResult />
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
  text: {
    color: colors.white,
  },
});
