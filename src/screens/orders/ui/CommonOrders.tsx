import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { UserRole } from "../../../types/role";
import { colors, fonts } from "../../../shared/style";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "@screens/orders/ui/FilterButton";
import CarShadow from '@assets/img/car-shadow.png';

interface CompProps {
  role: UserRole;
}

export const CommonOrders = ({ role, }) => {
  const navigation = useNavigation<any>();
  const handleOrderDetailsPress = (orderId: string) => {
    navigation.navigate("OrderDetails", { id: orderId });
  };
  const handleFindOrderRoute = () => {
    navigation.navigate("FindOrderRoute");
  }

  const handleAcceptOrder = () => {
    navigation.navigate("OrderConfirmPopup", { type: "topupBalance"})
  }

  return (
    <View style={{ flexGrow: 1, gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      <FilterButton onPress={handleFindOrderRoute}/>
      {(!orders || orders?.length === 0) &&
      <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={CarShadow}/>
          <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
      </View>}
      {orders?.map((order) => (
        <Order
          key={order.id}
          {...order}
          isActive={false}
          showDestinationMoreInfo={false}
        >
          <View style={{ alignSelf: "center", width: "80%" }}>
            <PrimaryButton
              text="Принять заказ"
              onPress={handleAcceptOrder}
              containerStyle={{
                marginTop: 29,
              }}
            />
          </View>
        </Order>
      ))}
    </View>
  );
};
