import React, { useState } from "react";
import { View } from "react-native";
import { subscriptions } from "../contants";
import { Subscription } from "effector";
import { SelectSubscriptionItem } from "@screens/subscription/ui/SelectSubscriptionItem";

interface CompProps {
  onSelectSubscription: (subscription: Subscription) => void;
  selectedSubscription: Subscription;
}

export const SelectSubscription = ({
  selectedSubscription,
  onSelectSubscription,
}: CompProps) => {
  const handleSubscriptionItemPress = (subscription: Subscription) => {
    onSelectSubscription(subscription);
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ gap: 13 }}>
        {subscriptions.map((subscription) => (
          <SelectSubscriptionItem
            key={subscription.title}
            {...subscription}
            isActive={selectedSubscription?.title === subscription.title}
            onPress={() => handleSubscriptionItemPress(subscription)}
          />
        ))}
      </View>
    </View>
  );
};
