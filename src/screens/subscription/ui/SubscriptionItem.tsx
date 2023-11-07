import React from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "@components/button/PrimaryButton";
import { colors, fonts } from "@styles";
import { InactiveSubscription } from "./InactiveSubscription";
import { UrgentOrdersWarning } from "./UrgentOrdersWarning";
import { SubscriptionExpire } from "./SubscriptionExpire";

interface CompProps extends Subscription {}

export const SubscriptionItem = ({
  title,
  text,
  icon,
  isActive,
  price,
  expires,
}: CompProps) => {
  const Icon = icon;
  return (
    <>
      {!isActive ? (
        <InactiveSubscription />
      ) : (
        <SubscriptionExpire title={title} expire={expires} />
      )}

      <View
        style={{
          borderWidth: 1,
          borderColor: "#B7B7B7",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          width: "100%",
          marginTop: 15,
          marginBottom: 55,
        }}
      >
        <View
          style={{
            paddingVertical: 9,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            paddingStart: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: isActive ? colors.secondary : colors.opacity,
          }}
        >
          <Icon fillColor={colors.black} />
          <Text style={fonts.label}>{title}</Text>
        </View>

        <Text
          style={[
            fonts.text,
            {
              paddingStart: 17,
              width: "90%",
              marginTop: 18,
              color: colors.white,
              marginBottom: 20,
            },
          ]}
        >
          {text}
        </Text>
        <Text
          style={[
            fonts.label,
            { textAlign: "center", marginBottom: 12, color: colors.white },
          ]}
        >
          {`${price} р\\мес`}
        </Text>
        <View style={{ paddingHorizontal: 55, marginBottom: 19 }}>
          <PrimaryButton
            text={isActive ? "Продлить" : "Подписаться"}
            borderRadiusStyle={4}
            backgroundColorStyle={isActive ? colors.background : colors.primary}
            textColor={isActive ? colors.white : colors.background}
            containerStyle={{
              borderWidth: isActive ? 1 : 0,
              borderColor: colors.opacity,
            }}
            onPress={() => {}}
          />
        </View>
      </View>
      <UrgentOrdersWarning />
    </>
  );
};
