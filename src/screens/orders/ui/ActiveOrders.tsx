import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Order } from "./Order";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { orders } from "../contants";
import { useNavigation } from "@react-navigation/core";
import { colors, fonts } from "../../../shared/style";
// @ts-ignore
import CarShadow from '@assets/img/car-shadow.png';
import { useUnit } from "effector-react";
import { $orders, setOrders } from "../model/OrderStore";
import { RefreshControl } from "react-native-gesture-handler";
import { getOrders } from "../model/order-actions";

export const ActiveOrders = () => {
  const navigation = useNavigation<any>();
  const [{activeOrders}, handleSetOrders] = useUnit([$orders, setOrders]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleFinishOrder = (from: string, to: string, id: string) => {
    const navigationParams = { 
      type: "confirmFinishOrder", 
      from,
      to,
      id
    }
    navigation.navigate("OrderConfirmPopup", navigationParams);
  }

  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders('active');
      handleSetOrders({ type: 'activeOrders', data: response });
    } catch (err) {
      console.error('Failed to refresh active orders', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flexGrow: 1, gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      {(!orders || orders?.length === 0) &&
      <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={CarShadow}/>
          <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
      </View>}
      <FlatList
        style={styles.list_holder}
        contentContainerStyle={styles.list_container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefreshOrders}/>
        }
        data={activeOrders}
        ListEmptyComponent={() => (
          <View style={styles.empty_container}>
            <Image source={CarShadow}/>
            <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
        </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        renderItem={(order) => (
          <Order
            {...order.item}
            isActive={true}
            showDestinationMoreInfo={true}
            showComments={true}
            showContacts={true}
            key={order.item._id}
          >
            <View style={{ alignSelf: "center", width: "80%" }}>
              <PrimaryButton
                text="Завершить заказ"
                onPress={() => handleFinishOrder(order.item.from, order.item.to, order.item._id)}
                containerStyle={{
                  marginTop: 29,
                }}
              />
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
    paddingBottom: 20,
  },
  empty_container: {
    paddingVertical: 200, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});