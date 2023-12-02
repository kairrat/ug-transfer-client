import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { useNavigation } from "@react-navigation/core";
import { colors, fonts } from "../../../shared/style";
import CarShadow from '@assets/img/car-shadow.png';

export const ActiveOrders = () => {
  const navigation = useNavigation<any>();
  const handleFinishOrder = (from: string, to: string, id: string) => {
    const navigationParams = { 
      type: "confirmFinishOrder", 
      from,
      to,
      id
    }
    navigation.navigate("OrderConfirmPopup", navigationParams);
  }
  return (
    <View style={{ flexGrow: 1, gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      {(!orders || orders?.length === 0) &&
      <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={CarShadow}/>
          <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
      </View>}
      {
        orders?.map((order) => (
          <Order
          {...order}
          isActive={true}
          showDestinationMoreInfo={true}
          showComments={true}
          showContacts={true}
          key={order.id}
        >
          <View style={{ alignSelf: "center", width: "80%" }}>
            <PrimaryButton
              text="Завершить заказ"
              onPress={() => handleFinishOrder(order.from, order.to, order.id)}
              containerStyle={{
                marginTop: 29,
              }}
            />
          </View>
        </Order>
        ))
      }
    </View>
  );
};
