import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { StackScreens } from "./types/StackScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@styles";
import { InitScreen } from "@screens/init/InitScreen";
import { AuthorizationRouter } from "./AuthorizationRouter";
import { SlideMenu } from "@components/menus/SlideMenu";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SubscriptionScreen } from "@screens/subscription/Subscription";

import { CreateProfileCompleteScreen } from "../fearures/create-profile/CreateProfileComplete";
import { OrdersScreen } from "@screens/orders/Orders";
import { OrderDetailsScreen } from "@screens/orderDetails/OrderDetails";
import { Wallet } from "../screens/wallet";
import { FindOrderRoute } from "../screens/findOrderRoute";
import { OrderConfirmPopup } from "../screens/OrderConfirmPopup";
import { CreateProfileScreen } from "../fearures/create-profile/CreateProfile";
import { Profile } from "../screens/profile";
import { SubscribeRemind } from "../screens/subscribeRemind";
import { ConfirmDeleteAccount } from "../screens/confirmDeleteAccount";

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
      "AuthenticationChoice",
      "PrivacyPolicy",
      "SmsVerification",
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
        drawerContent={SlideMenu}
        screenOptions={({ route }) => ({
          headerShown: false,
          drawerType: "front",
          overlayColor: "rgba(24, 50, 58, 0.41)",
          drawerStyle: { width: "80%" },
          swipeEnabled: shouldShowDrawer({ route }),
        })}
      >
        <Stack.Screen name={"Init"} component={InitScreen} />
        <Stack.Screen name={"Subscription"} component={SubscriptionScreen} />
        <Stack.Screen name={"CreateProfile"} component={CreateProfileScreen} />
        <Stack.Screen
          name={"CreateProfileComplete"}
          component={CreateProfileCompleteScreen}
        />
        <Stack.Screen name={"Wallet"} component={Wallet} />
        <Stack.Screen name={"Profile"} component={Profile} />
        <Stack.Screen name={"SubscribeRemind"} component={SubscribeRemind} />
        <Stack.Screen name={"ConfirmDeleteAccount"} component={ConfirmDeleteAccount} />
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name={"FindOrderRoute"} component={FindOrderRoute} />
          <Stack.Screen name={"Orders"} component={OrdersScreen} />
          <Stack.Screen name={"OrderDetails"} component={OrderDetailsScreen} />
          <Stack.Screen name={"OrderConfirmPopup"} component={OrderConfirmPopup} />
        </Stack.Group>
        {AuthorizationRouter()}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
