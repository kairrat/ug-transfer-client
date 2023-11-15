import React from "react";
import { ScrollView, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { UserRole } from "../../../types/role";
import { colors } from "../../../shared/style";
import { useNavigation } from "@react-navigation/native";

interface CompProps {
  role: UserRole;
}

export const CommonOrders = ({ role }) => {
  const navigation = useNavigation<any>();

  const handleOrderDetailsPress = (orderId: string) => {
    navigation.navigate("OrderDetails", { id: orderId });
  };
  return (
    <View style={{ gap: 15 }}>
      {orders.map((order) => (
        <Order
          key={order.id}
          {...order}
          isActive={false}
          showDestinationMoreInfo={false}
        >
          <View style={{ alignSelf: "center", width: "80%" }}>
            {role === UserRole.DRIVER ? (
              <PrimaryButton
                text="Принять заказ"
                onPress={() => {}}
                containerStyle={{
                  marginTop: 29,
                }}
              />
            ) : (
              <PrimaryButton
                text="Подробнее"
                backgroundColorStyle={colors.background}
                textColor={colors.white}
                onPress={() => handleOrderDetailsPress(order.id)}
                containerStyle={{
                  marginTop: 29,
                  borderWidth: 1,
                  borderColor: colors.white,
                }}
              />
            )}
          </View>
        </Order>
      ))}

      {/* <View style={{ flex: 1, alignItems: "center", marginTop: 250 }}>
      
        <Car fillColor={"#2D2D2D"} size={150} />
        <Text style={[fonts.text, { color: colors.opacity }]}>Заказы</Text>
      </View> */}
    </View>
  );
};
