import React from "react";
import { Text, View } from "react-native";
import DiscountIcon from "@assets/img/discount.svg";
import WalletIcon from "@assets/img/wallet.svg";
import { Car } from "../../../shared/components/icons/Car";
import { colors, fonts } from "../../../shared/style";

export const OrderInfo = ({ aditionalInfo, type, discount, price }: Order) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 5, flexDirection: "column" }}>
        <View style={{ flexDirection: "row", gap: 13, alignItems: "center" }}>
          <Car fillColor={colors.opacity} />
          <Text style={[fonts.text, { color: colors.opacity }]}>{type}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 13, alignItems: "center" }}>
          <DiscountIcon />
          <Text style={[fonts.text, { color: colors.opacity }]}>
            {discount} р
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 13, alignItems: "center" }}>
          <WalletIcon />
          <Text style={[fonts.text, { color: colors.primary }]}>{price} р</Text>
        </View>
      </View>
      <View
        style={{
          borderLeftWidth: 1,
          borderStartColor: colors.opacity,
          paddingLeft: 8,
          gap: 7,
        }}
      >
        {aditionalInfo.length > 0 ? (
          <View style={{ flexDirection: "column" }}>
            {aditionalInfo?.map((info) => (
              <Text
                key={info}
                style={[
                  fonts.info,
                  { color: colors.white, flexWrap: "wrap", width: "95%" },
                ]}
              >
                {info}
              </Text>
            ))}
          </View>
        ) : (
          <Text
            style={[
              fonts.info,
              {
                marginRight: 40,
                marginTop: "25%",
                color: colors.opacity,
              },
            ]}
          >
            Нет дополнений
          </Text>
        )}
      </View>
    </View>
  );
};
