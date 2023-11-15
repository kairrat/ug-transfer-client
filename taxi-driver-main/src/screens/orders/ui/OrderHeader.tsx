import React from "react";
import { colors, fonts } from "../../../shared/style";
import { Text, View } from "react-native";

export const OrderHeader = ({ id, time, date }: Order) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {id && <Text style={[fonts.text, { color: colors.opacity }]}>{id}</Text>}
      <Text
        style={[
          fonts.text,
          {
            color: colors.opacity,
            marginLeft: id ? "auto" : 0,
            marginRight: id ? 10 : 0,
          },
        ]}
      >
        на {date}
      </Text>
      <Text style={[fonts.text, { color: colors.opacity }]}>{time}</Text>
    </View>
  );
};
