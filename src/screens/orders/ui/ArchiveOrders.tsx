import React from "react";
import { Text, View } from "react-native";
import { Order } from "@screens/orders/ui/Order";
import { orders } from "@screens/orders/contants";
import { PrimaryButton } from "@components/button/PrimaryButton";
import { colors, fonts } from "@styles";

export const ArchiveOrders = () => {
  return (
    <View style={{ gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      <Order
        {...orders[0]}
        isActive={true}
        showDestinationMoreInfo={true}
        showComments={true}
        showContacts={true}
      >
        <View
          style={{
            marginTop: "5%",
            alignSelf: "center",
            width: "80%",
            borderTopWidth: 1,
            borderColor: colors.stroke,
          }}
        >
          <Text
            style={[
              fonts.text_semiBold,
              {
                marginTop: "10%",
                color: colors.secondary,
                textAlign: "center",
              },
            ]}
          >
            Завершен
          </Text>
        </View>
      </Order>
      <Order
        {...orders[0]}
        isActive={true}
        showDestinationMoreInfo={true}
        showComments={true}
        showContacts={true}
      >
        <View
          style={{
            marginTop: "5%",
            alignSelf: "center",
            width: "80%",
            borderTopWidth: 1,
            borderColor: colors.stroke,
          }}
        >
          <Text
            style={[
              fonts.text_semiBold,
              {
                marginTop: "10%",
                color: colors.error,
                textAlign: "center",
              },
            ]}
          >
            Отменен
          </Text>
        </View>
      </Order>
    </View>
  );
};
