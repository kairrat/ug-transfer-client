import React from "react";
import { Image, Text, View } from "react-native";
import { Order } from "@screens/orders/ui/Order";
import { orders } from "@screens/orders/contants";
import { PrimaryButton } from "@components/button/PrimaryButton";
import { colors, fonts } from "@styles";
import CarShadow from '@assets/img/car-shadow.png';

export const ArchiveOrders = () => {
  return (
    <View style={{ flexGrow: 1, gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      {(!orders || orders?.length === 0) &&
      <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={CarShadow}/>
          <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
      </View>}
      {orders.map((order) => (
        <Order
          {...order}
          isActive={true}
          showDestinationMoreInfo={true}
          showComments={true}
          showContacts={true}
          key={order.id}
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
      ))}
    </View>
  );
};
