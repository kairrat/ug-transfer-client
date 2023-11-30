import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { UserRole } from "../../../types/role";
import { colors } from "../../../shared/style";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "@screens/orders/ui/FilterButton";

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
  return (
    <View style={{ gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      <FilterButton onPress={handleFindOrderRoute}/>
      {orders.map((order) => (
        <Order
          key={order.id}
          {...order}
          isActive={false}
          showDestinationMoreInfo={false}
        >
          <View style={{ alignSelf: "center", width: "80%" }}>
            <PrimaryButton
              text="Принять заказ"
              onPress={() => {}}
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
