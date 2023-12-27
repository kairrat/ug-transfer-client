import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Platform, StyleSheet } from "react-native";
import { colors } from "@styles";
// @ts-ignore
import ProfileIcon from "@assets/img/profile.svg";
import { MenuProfileItem } from "./MenuProfileItem";
import { MenuItem } from "./MenuItem";
import { menuItems } from "./contants";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "effector-react";
import { $profile } from "../../../features/create-profile/models/Profile";

export const SlideMenu = () => {
  const navigation = useNavigation<any>();
  const {
    data: { role, firstName },
  } = useStore($profile);

  const filteredMenus = menuItems.filter(
    (item) => (item.role && item.role === role) ?? true
  );

  const handleMenuItemPress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={compStyles.container}>
      <MenuProfileItem title={firstName} icon={ProfileIcon} onPress={handleMenuItemPress}/>
      {filteredMenus.map((menuItem) => (
        <MenuItem
          key={menuItem.route}
          {...menuItem}
          onPress={handleMenuItemPress}
        />
      ))}
    </DrawerContentScrollView>
  );
};

const compStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
