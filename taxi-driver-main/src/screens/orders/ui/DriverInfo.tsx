import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProfileIcon from "@assets/img/profile.svg";
import { PhoneRounded } from "../../../shared/components/icons/PhoneRounded";
import { colors, fonts } from "../../../shared/style";

export const DriverInfo = () => {
  return (
    <View>
      <Text style={[fonts.text_semiBold, { color: colors.white }]}>
        Водитель
      </Text>
      <Text
        style={[
          fonts.text,
          { color: colors.white, marginTop: 10, marginBottom: 7 },
        ]}
      >
        Антон Чехов
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ProfileIcon height="75" width="75" />

        <View style={{ marginLeft: 8, gap: 5 }}>
          <Text style={[fonts.text, { color: colors.white }]}>Стандарт</Text>
          <Text style={[fonts.text, { color: colors.white }]}>Bmw</Text>
          <Text style={[fonts.text, { color: colors.white }]}>X5</Text>
        </View>
        <View style={{ marginLeft: "auto", gap: 5 }}>
          <Text style={[fonts.text, { color: colors.white }]}>454АОА</Text>
          <Text style={[fonts.text, { color: colors.white }]}>Красная</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 13,
          alignItems: "center",
        }}
      >
        <PhoneRounded fillColor={colors.opacity} />
        <Text
          style={[
            fonts.text,
            { color: colors.opacity, textDecorationLine: "underline" },
          ]}
        >
          +7 988 888 88 88
        </Text>
      </TouchableOpacity>
    </View>
  );
};
