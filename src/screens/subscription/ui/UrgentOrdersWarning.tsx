import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "@styles";

export const UrgentOrdersWarning = () => {
  return (
    <View
      style={{
        backgroundColor: colors.gray,
        borderRadius: 7,
        paddingStart: 14,
        paddingTop: 10,
        paddingBottom: 13,
      }}
    >
      <Text
        style={[fonts.text_semiBold, { color: colors.white, marginBottom: 7 }]}
      >
        Срочные заказы
      </Text>
      <Text
        style={[fonts.text_semiBold, { color: colors.error, marginBottom: 8 }]}
      >
        НЕАКТИВНО
      </Text>
      <Text style={[fonts.description, { color: colors.white }]}>
        Уведомления и всплывающие окна работают только при активном
      </Text>
      <TouchableOpacity>
        <Text
          style={[
            fonts.text_semiBold,
            { color: colors.secondary, textDecorationLine: "underline" },
          ]}
        >
          “Срочном заказе”
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={[
            fonts.text_semiBold,
            {
              marginLeft: "auto",
              color: colors.white,
              textDecorationLine: "underline",
              marginRight: 15,
              marginTop: 5,
            },
          ]}
        >
          Подробнее
        </Text>
      </TouchableOpacity>
    </View>
  );
};
