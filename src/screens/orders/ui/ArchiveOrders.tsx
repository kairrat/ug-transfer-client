import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Order } from "@screens/orders/ui/Order";
import { colors, fonts } from "@styles";
// @ts-ignore
import CarShadow from '@assets/img/car-shadow.png';
import { useUnit } from "effector-react";
import { $orders, setOrders } from "../model/OrderStore";
import { getOrders } from "../model/order-actions";
import { RefreshControl } from "react-native-gesture-handler";

export const ArchiveOrders = () => {
  const [{archiveOrders}, handleSetOrders] = useUnit([$orders, setOrders]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders('archive');
      handleSetOrders({ type: 'archiveOrders', data: response });
    } catch (err) {
      console.error('Failed to refresh active orders', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={{ flexGrow: 1, gap: 15, paddingHorizontal: "5%", paddingTop: "5%" }}>
      <FlatList
        style={styles.list_holder}
        contentContainerStyle={styles.list_container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefreshOrders}/>
        }
        ListEmptyComponent={() => (
          <View style={styles.empty_container}>
            <Image source={CarShadow}/>
            <Text style={[fonts.label, { color: colors.opacity}]}>Заказы</Text>
          </View>
        )}
        data={archiveOrders}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        renderItem={(order) => (
          <Order
          {...order.item}
          isActive={true}
          showDestinationMoreInfo={true}
          showComments={true}
          showContacts={true}
          key={order.item._id}>
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
              ]}>
              Завершен
            </Text>
          </View>
        </Order>
        )}/>
    </View>
  );
};


const styles = StyleSheet.create({
  list_holder: {
    flex: 1,
  },
  list_container: {
    paddingBottom: 10
  },
  empty_container: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 200
  }
});