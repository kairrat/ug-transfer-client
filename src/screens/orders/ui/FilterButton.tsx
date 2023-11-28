import React from "react";
import { Text, View } from "react-native";
import SettingsIcon from "@assets/img/settings.svg";
import { colors } from "@styles";

const FilterButton = () => {
  return (
    <View style={{ borderWidth: 1, borderColor: colors.stroke }}>
      <View style={{ marginRight: 17 }}>
        <SettingsIcon />
      </View>
      <Text style={{ color: "white" }}>Подобрать маршрут</Text>
    </View>
  );
};

export default FilterButton;
