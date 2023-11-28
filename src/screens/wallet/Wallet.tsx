import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@styles";
import MenuIcon from "@assets/img/menu.svg";
import { DrawerActions } from "@react-navigation/native";
type CompProps = NativeStackScreenProps<StackScreens, "Wallet">;

export const Wallet: React.FC<CompProps> = function Wallet({
  navigation,
  route,
}) {
  const handleMenuOpen = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={handleMenuOpen}>
        <MenuIcon />
      </TouchableOpacity>
      <Text>Wallet</Text>
    </SafeAreaView>
  );
};
