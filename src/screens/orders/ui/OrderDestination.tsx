import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "../../../shared/style";
import { ArrowLong } from "../../../shared/components/icons/ArrowLong";
import ArrowVerticalIcon from "@assets/img/arrowVertical.svg";

interface CompProps extends Order {
  showDestinationMoreInfo: boolean;
}

export const OrderDestination = ({
  from,
  to,
  fromStreet,
  toStreet,
  showDestinationMoreInfo,
}: CompProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 23,
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {showDestinationMoreInfo && (
          <View style={{ marginRight: 17 }}>
            <ArrowVerticalIcon />
          </View>
        )}

        <View
          style={{
            flexDirection: showDestinationMoreInfo ? "column" : "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: showDestinationMoreInfo ? "row" : "column",
            }}
          >
            <Text style={[fonts.text_Bold, { color: colors.white }]}>
              Откуда:
            </Text>
            <Text
              style={[
                fonts.text,
                {
                  color: colors.secondary,
                  marginLeft: showDestinationMoreInfo ? 10 : 0,
                },
              ]}
            >
              {from}
            </Text>
          </View>
          {fromStreet && showDestinationMoreInfo && (
            <Text style={[fonts.text, { color: colors.white }]}>
              {fromStreet}
            </Text>
          )}

          {!showDestinationMoreInfo && (
            <View style={{ marginHorizontal: 10 }}>
              <ArrowLong width={45} />
            </View>
          )}

          <View
            style={{
              flexDirection: showDestinationMoreInfo ? "row" : "column",
              marginTop: showDestinationMoreInfo ? 9 : 0,
            }}
          >
            <Text style={[fonts.text_Bold, { color: colors.white }]}>Куда</Text>
            <Text
              style={[
                fonts.text,
                {
                  color: colors.secondary,
                  marginLeft: showDestinationMoreInfo ? 10 : 0,
                },
              ]}
            >
              {to}
            </Text>
          </View>
          {toStreet && showDestinationMoreInfo && (
            <Text style={[fonts.text, { color: colors.white }]}>
              {toStreet}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
