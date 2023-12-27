import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import WalletIcon from "@assets/img/wallet.svg";
import { colors, fonts } from "../../../shared/style";
import MenuIcon from "@assets/img/menu.svg";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { $wallet } from "../../../features/wallet";
import { useStore } from "effector-react";

interface CompProps {
  title: string;
}

export const OrdersHeader = ({ title }: CompProps) => {
  const navigation = useNavigation<any>();
  const { amount } = useStore($wallet);

  const handleMenuOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleMoveToWallet = () => {
    navigation.navigate("Wallet");
  }
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

        <Text style={[, { color: colors.white, fontSize: 16, fontWeight: "500" }]}>
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TouchableOpacity
          onPress={handleMoveToWallet}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: colors.primary, fontSize: 24 }}>+</Text>
          <WalletIcon width={20}/>
        </TouchableOpacity>

        <Text
          style={[
            fonts.info,
            { color: colors.primary, position: "relative", top: 2 },
          ]}
        >
          {amount} р
        </Text>
      </View>
    </View>
  );
};
