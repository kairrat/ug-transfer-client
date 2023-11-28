import React from "react";
import { ScrollView, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";

export const ActiveOrders = () => {
  return (
    <View style={{ gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      <Order
        {...orders[0]}
        isActive={true}
        showDestinationMoreInfo={true}
        showComments={true}
        showContacts={true}
      >
        <View style={{ alignSelf: "center", width: "80%" }}>
          <PrimaryButton
            text="Завершить заказ"
            onPress={() => {}}
            containerStyle={{
              marginTop: 29,
            }}
          />
        </View>
      </Order>
      <Order
        {...orders[0]}
        isActive={true}
        showDestinationMoreInfo={true}
        showComments={true}
        showContacts={true}
      >
        <View style={{ alignSelf: "center", width: "80%" }}>
          <PrimaryButton
            text="Завершить заказ"
            onPress={() => {}}
            containerStyle={{
              marginTop: 29,
            }}
          />
        </View>
      </Order>
    </View>
  );
};
