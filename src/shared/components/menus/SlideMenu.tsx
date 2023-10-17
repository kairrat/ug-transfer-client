import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '@styles';
import ProfileIcon from '@assets/img/profile.svg';
import { MenuProfileItem } from './MenuProfileItem';
import { MenuItem } from './MenuItem';
import { menuItems } from './contants';
import { UserRole } from '../../../types/role';
import { useNavigation } from '@react-navigation/native';

export const SlideMenu = () => {
  const navigation = useNavigation();
  const role = UserRole.CONTROLLER;

  const filteredMenus = menuItems.filter(item => (item.role && item.role === role) ?? true);

  const handleMenuItemPress = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={compStyles.container}>
      <MenuProfileItem title={'Админ'} icon={ProfileIcon} />
      {filteredMenus.map(menuItem => (
        <MenuItem key={menuItem.route} {...menuItem} onPress={handleMenuItemPress} />
      ))}
    </DrawerContentScrollView>
  );
};

const compStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 55 : 65,
  },
});
