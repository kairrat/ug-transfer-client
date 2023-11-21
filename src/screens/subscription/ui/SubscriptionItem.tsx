import React, { useState } from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "@components/button/PrimaryButton";
import { colors, fonts } from "@styles";
import { InactiveSubscription } from "./InactiveSubscription";
import { UrgentOrdersWarning } from "./UrgentOrdersWarning";
import { SubscriptionExpire } from "./SubscriptionExpire";
import { Car } from "@components/icons/Car";

export const SubscriptionItem = ({ title, desciption, isActive, price }) => {
  const Icon = Car;
  const [isSubLoading, setIsSubLoading] = useState(false);
  const handleGetSubscription = () => {};
  return (
    <>
      <View style={{ paddingHorizontal: "5%" }}>
        {!isActive ? (
          <InactiveSubscription />
        ) : (
          <SubscriptionExpire title={"Водитель"} />
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#B7B7B7",
            borderRadius: 10,
            width: "100%",
            marginTop: "4%",
            marginBottom: "4%",
          }}
        >
          <View
            style={{
              paddingVertical: "3%",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              paddingStart: "3%",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              backgroundColor: isActive ? colors.secondary : colors.opacity,
            }}
          >
            <Icon fillColor={colors.black} />
            <Text style={[fonts.text_semiBold, { color: colors.black }]}>
              Водитель
            </Text>
          </View>
          <Text
            style={[
              fonts.timer,
              { marginBottom: "2%", color: colors.white, padding: "5%" },
            ]}
          >
            {desciption}
          </Text>
          <Text
            style={[
              fonts.text_semiBold,
              { textAlign: "center", marginBottom: "5%", color: colors.white },
            ]}
          >
            {`${price} р\\мес`}
          </Text>
          <View style={{ paddingHorizontal: "15%", marginBottom: "5%" }}>
            <PrimaryButton
              text={isActive ? "Продлить" : "Подписаться"}
              borderRadiusStyle={4}
              backgroundColorStyle={
                isActive ? colors.background : colors.primary
              }
              textColor={isActive ? colors.white : colors.background}
              containerStyle={{
                borderWidth: isActive ? 1 : 0,
                borderColor: colors.opacity,
              }}
              onPress={handleGetSubscription}
            />
          </View>
        </View>
      </View>
      {/* <UrgentOsrdersWarning /> */}
    </>
  );
};
