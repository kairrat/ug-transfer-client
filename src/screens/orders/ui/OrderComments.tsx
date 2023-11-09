import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "../../../shared/style";

export const OrderComments = ({ comments }: Order) => {
  return (
    <View style={{ gap: 8 }}>
      <Text style={[fonts.text_Bold, { color: colors.white }]}>
        Комментарий:
      </Text>
      <Text style={[fonts.description, { color: colors.white }]}>
        {comments}
      </Text>
    </View>
  );
};
