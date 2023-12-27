import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { UserRole } from "../../../types/role";
import { colors, fonts } from "../../../shared/style";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "@screens/orders/ui/FilterButton";
// @ts-ignore
import CarShadow from '@assets/img/car-shadow.png';
import { useUnit } from "effector-react";
import { $orders, setOrders } from '../model/OrderStore';
import { getOrders } from "../model/order-actions";
import { RefreshControl } from "react-native-gesture-handler";

interface CompProps {
  role: UserRole;
}

export const CommonOrders = ({ role, }) => {
  const navigation = useNavigation<any>();
  const [{commonOrders}, handleSetOrders] = useUnit([$orders, setOrders]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOrderDetailsPress = (orderId: string) => {
    navigation.navigate("OrderDetails", { id: orderId });
  };
  const handleFindOrderRoute = () => {
    navigation.navigate("FindOrderRoute");
  }

  const handleAcceptOrder = () => {
    navigation.navigate("OrderConfirmPopup", { type: "topupBalance"})
  }

  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders('active');
      handleSetOrders({ type: 'commonOrders', data: response });
    } catch (err) {
      console.error('Failed to refresh active orders', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {
        commonOrders?.length > 0 && 
        <>
          <FilterButton onPress={handleFindOrderRoute}/>
        </>
      }
      <FlatList
            style={styles.list_holder}
            contentContainerStyle={styles.list_container}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={handleRefreshOrders}/>
            }
            data={commonOrders}
            ListEmptyComponent={() => (
              <View style={styles.empty_container}>
                <Image source={CarShadow}/>
                <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
            </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
            renderItem={(order) => (
              <Order
                key={order.item._id}
                {...order.item}
                isActive={false}
                showDestinationMoreInfo={false}>
                  <View style={{ alignSelf: "center", width: "80%" }}>
                    <PrimaryButton
                      text="Принять заказ"
                      onPress={handleAcceptOrder}
                      containerStyle={{
                        marginTop: 29,
                      }}/>
                  </View>
              </Order>
            )}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: "5%", 
    paddingTop: "5%",
    marginBottom: 10
  },
  list_holder: {
    flex: 1,
  },
  list_container: {
    paddingBottom: 5,
    paddingTop: 15
  },
  empty_container: {
    paddingVertical: 200, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});