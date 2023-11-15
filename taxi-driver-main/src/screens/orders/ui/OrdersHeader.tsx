import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import WalletIcon from "@assets/img/wallet.svg";
import { colors, fonts } from "../../../shared/style";
import MenuIcon from "@assets/img/menu.svg";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface CompProps {
  title: string;
}

export const OrdersHeader = ({ title }: CompProps) => {
  const navigation = useNavigation<any>();

  const handleMenuOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 25 }}>
        <TouchableOpacity onPress={handleMenuOpen}>
          <MenuIcon />
        </TouchableOpacity>

        <Text style={[fonts.text_semiBold, { color: colors.white }]}>
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: colors.primary, fontSize: 30 }}>+</Text>
          <WalletIcon />
        </TouchableOpacity>

        <Text
          style={[
            fonts.text,
            { color: colors.primary, position: "relative", top: 2 },
          ]}
        >
          0 р
        </Text>
      </View>
    </View>
  );
};
