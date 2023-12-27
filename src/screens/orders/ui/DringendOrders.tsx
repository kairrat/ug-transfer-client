import React, { useEffect, useState } from "react";
import { useStore, useUnit } from "effector-react";
import { $profile } from "../../../features/create-profile/models/Profile";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "src/shared/style";
import { $orders, setOrders } from "../model/OrderStore";
// @ts-ignore
import CarShadow from '@assets/img/car-shadow.png';
import { Order } from "./Order";
import { PrimaryButton } from "src/shared/components/button/PrimaryButton";
import { useNavigation } from "@react-navigation/core";
import { getOrders } from "../model/order-actions";
import { RefreshControl } from "react-native-gesture-handler";

const DringendOrders = () => {
  const navigation = useNavigation<any>();
  const {
    data: { role, firstName, subscriptionStatus },
  } = useStore($profile) || { subscriptionStatus: false };

  const [{urgentOrders}, handleSetOrders] = useUnit([$orders, setOrders]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleAcceptOrder = () => {
    navigation.navigate("OrderConfirmPopup", { type: "topupBalance"})
  }
  const handleRefreshOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders('active');
      handleSetOrders({ type: 'urgentOrders', data: response });
    } catch (err) {
      console.error('Failed to refresh active orders', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View
      style={styles.container}>
        <FlatList
            style={styles.list_holder}
            contentContainerStyle={styles.list_container}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={handleRefreshOrders}/>
            }
            data={urgentOrders}
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
                showDestinationMoreInfo={false}
                urgent>
                  <View style={{ alignSelf: "center", width: "80%" }}>
                    <PrimaryButton
                      text="Принять заказ"
                      onPress={handleAcceptOrder}
                      backgroundColorStyle={colors.green}
                      containerStyle={{
                        marginTop: 29,
                      }}/>
                  </View>
              </Order>
            )}/>
    </View>
  );
};

export default DringendOrders;

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
    paddingBottom: 5
  },
  empty_container: {
    paddingVertical: 200, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});