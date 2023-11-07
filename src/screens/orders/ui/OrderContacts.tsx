import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PhoneRounded } from "../../../shared/components/icons/PhoneRounded";
import { Telegram } from "../../../shared/components/icons/Telegram";
import { colors, fonts } from "../../../shared/style";

export const OrderContacts = ({
  controllerNumber,
  controllerTelegram,
  clientNumber,
}: Order) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
        >
          <PhoneRounded
            fillColor={controllerNumber ? colors.primary : colors.opacity}
          />
          <Text
            style={[
              fonts.text,
              {
                color: controllerNumber ? colors.primary : colors.opacity,
                textDecorationLine: "underline",
              },
            ]}
          >
            Диспетчер
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 9,
            gap: 7,
            alignItems: "center",
          }}
        >
          <Telegram
            fillColor={controllerTelegram ? colors.primary : colors.opacity}
          />
          <Text
            style={[
              fonts.text,
              {
                color: controllerTelegram ? colors.primary : colors.opacity,
                textDecorationLine: "underline",
              },
            ]}
          >
            Диспетчер
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          gap: 7,
          alignItems: "center",
        }}
      >
        <PhoneRounded
          fillColor={clientNumber ? colors.primary : colors.opacity}
        />
        <Text
          style={[
            fonts.text,
            {
              color: clientNumber ? colors.primary : colors.opacity,
              textDecorationLine: "underline",
            },
          ]}
        >
          Пассажир
        </Text>
      </TouchableOpacity>
    </View>
  );
};
