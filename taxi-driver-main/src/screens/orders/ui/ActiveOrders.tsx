import React from "react";
import { ScrollView, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";

export const ActiveOrders = () => {
  return (
    <Order
      {...orders[0]}
      isActive={true}
      showDestinationMoreInfo={true}
      showComments={true}
      showContacts={true}
    >
      <View style={{ alignSelf: "center", width: "80%" }}>
        <PrimaryButton
          text="Заввершить заказ"
          onPress={() => {}}
          containerStyle={{
            marginTop: 29,
          }}
        />
      </View>
    </Order>
  );
};
