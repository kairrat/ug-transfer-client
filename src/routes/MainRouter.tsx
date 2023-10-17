import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { StackScreens } from './types/StackScreens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@styles';
import { InitScreen } from '@screens/init/InitScreen';
import { AuthorizationRouter } from './AuthorizationRouter';
import { SlideMenu } from '../shared/components/menus/SlideMenu';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator<StackScreens>();
const Drawer = createDrawerNavigator();

export const MainRouter: React.FC = function MainRouter() {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({ fade: true });
    })();
  }, []);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: colors.white },
      }}
    >
      <Drawer.Navigator
        drawerContent={SlideMenu}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          overlayColor: 'rgba(24, 50, 58, 0.41)',
          drawerStyle: { width: '75%' },
        }}
      >
        <Stack.Screen name={'Init'} component={InitScreen} />

        {AuthorizationRouter()}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
