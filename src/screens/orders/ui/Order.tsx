import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "@styles";
import { OrderHeader } from "./OrderHeader";
import { OrderDestination } from "./OrderDestination";
import { OrderInfo } from "./OrderInfo";
import { OrderComments } from "./OrderComments";
import { OrderContacts } from "./OrderContacts";
import { DriverInfo } from "./DriverInfo";

interface CompProps extends Order {
  isActive: boolean;
  showDestinationMoreInfo: boolean;
  showBorder?: boolean;
  showComments?: boolean;
  showContacts?: boolean;
  showDriverInfo?: boolean;
  children?: React.ReactNode;
  urgent?: boolean;
}

export const Order = ({
  _id,
  time,
  from,
  to,
  fromStreet,
  toStreet,
  type,
  clientNumber,
  comments,
  controllerNumber,
  controllerTelegram,
  aditionalInfo,
  date,
  discount,
  price,
  isActive,
  showBorder = true,
  showDestinationMoreInfo = false,
  showComments = false,
  showContacts = false,
  showDriverInfo = false,
  children,
  urgent = false
}: CompProps) => {
  const calculateStyles = () => {
    if (!showBorder) {
      return {};
    }

    return {
      borderRadius: 7,
      borderWidth: 1,
      borderColor: urgent ? colors.green : colors.stroke,
    };
  };
  return (
    <View
      style={[
        calculateStyles(),
        {
          paddingHorizontal: "5%",
          paddingBottom: "7%",
          paddingTop: "3%",
        },
      ]}
    >
      <OrderHeader id={isActive ? _id : null} time={time} date={date} />
      <View style={{ paddingHorizontal: 20 }}>
        <OrderDestination
          from={from}
          to={to}
          fromStreet={fromStreet}
          toStreet={toStreet}
          showDestinationMoreInfo={showDestinationMoreInfo}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.opacity,
            width: "100%",
            marginTop: 20,
            marginBottom: 16,
          }}
        />
        <OrderInfo
          aditionalInfo={aditionalInfo}
          discount={discount}
          type={type}
          price={price}
          urgent={urgent}
        />
        {showComments && comments && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: colors.opacity,
                width: "100%",
                marginTop: 20,
                marginBottom: 22,
              }}
            />
            <OrderComments comments={comments} />
          </>
        )}

        {showContacts && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: colors.opacity,
                width: "100%",
                marginTop: 12,
                marginBottom: 18,
              }}
            />
            <OrderContacts
              clientNumber={clientNumber}
              controllerNumber={controllerNumber}
              controllerTelegram={controllerTelegram}
            />
          </>
        )}

        {showDriverInfo && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: colors.opacity,
                width: "100%",
                marginTop: 12,
                marginBottom: 18,
              }}
            />
            <DriverInfo />
            <View
              style={{
                height: 1,
                backgroundColor: colors.opacity,
                width: "100%",
                marginTop: 20,
              }}
            />
          </>
        )}

        {children && children}
      </View>
    </View>
  );
};
