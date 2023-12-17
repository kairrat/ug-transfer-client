import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import  { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Main } from "src/screens/Main";
import { Auth } from "src/screens/Auth";
import { Profile } from "src/screens/Profile";
import { DrawerContent } from "src/widgets/Drawer";
import { Init } from "src/screens/Init";
import { StackScreens } from "../types/StackScreens";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

type CustomStackNavigationOptions = NativeStackNavigationOptions & {
  unmountOnBlur?: boolean;
};

const Stack = createNativeStackNavigator<StackScreens>();
const Drawer = createDrawerNavigator();

export const MainRouter: React.FC = function MainRouter() {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({ fade: true });
    })();
  }, []);
  const shouldShowDrawer = ({ route }: { route: { name: string } }) => {
    const bannedRoutes = [
      "Init",
      "Auth"
    ];
    return !bannedRoutes.includes(route.name);
  };
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: colors.white },
      }}
    >
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={DrawerContent}
        screenOptions={({ route }) => ({
          headerShown: false,
          drawerType: "front",
          overlayColor: "rgba(24, 50, 58, 0.41)",
          drawerStyle: { width: "80%" },
          swipeEnabled: shouldShowDrawer({ route }),
        })}
      >
        <Stack.Screen name={"Init"} component={Init} />
        <Stack.Screen name={"Auth"} component={Auth} />
        <Stack.Screen name={"Main"} component={Main} />
        <Stack.Screen name={"Profile"} component={Profile} />
        {/* {AuthorizationRouter()} */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
