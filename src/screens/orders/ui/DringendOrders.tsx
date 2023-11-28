import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $profile } from "@screens/profile/models/Profile";
import { Text, View } from "react-native";

const DringendOrders = () => {
  const {
    data: { role, firstName, subscriptionStatus },
  } = useStore($profile) || { subscriptionStatus: false };

  return (
    <View
      style={[
        {
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        },
        { backgroundColor: subscriptionStatus ? "green" : "red" },
      ]}
    >
      <Text>
        {subscriptionStatus ? "Подписка активна" : "Подписка не активна"}
      </Text>
    </View>
  );
};

export default DringendOrders;
