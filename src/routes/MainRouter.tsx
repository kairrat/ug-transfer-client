import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { StackScreens } from "./types/StackScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@styles";
import { InitScreen } from "@screens/init/InitScreen";
import { SlideMenu } from "@components/menus/SlideMenu";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SubscriptionScreen } from "@screens/subscription/Subscription";

import { CreateProfileCompleteScreen } from "../features/create-profile/CreateProfileComplete";
import { OrdersScreen } from "@screens/orders/Orders";
import { OrderDetailsScreen } from "@screens/orderDetails/OrderDetails";
import { Wallet } from "../screens/wallet";
import { FindOrderRoute } from "../screens/findOrderRoute";
import { OrderConfirmPopup } from "../screens/OrderConfirmPopup";
import { CreateProfileScreen } from "../features/create-profile/CreateProfile";
import { Profile } from "../screens/profile";
import { SubscribeRemind } from "../screens/subscribeRemind";
import { ConfirmDeleteAccount } from "../screens/confirmDeleteAccount";
import { EditProfile } from "../screens/editProfile";
import { AdBanners } from "../screens/adBanners";
import  { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SubScreen } from "../screens/subScreen";
import { SmsVerification } from "src/screens/authorization/SmsVerification";
import { PrivacyPolicy } from "src/screens/privacyPolicy/PrivacyPolicy";
import { AuthenticationChoice } from "src/screens/authorization/AuthenticationChoice";

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
        <Stack.Screen name={"SubScreen"} component={SubScreen} />
        <Stack.Screen name={"CreateProfile"} component={CreateProfileScreen} />
        <Stack.Screen
          name={"CreateProfileComplete"}
          component={CreateProfileCompleteScreen}
          />
        <Stack.Screen name={"Wallet"} component={Wallet} />
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name={"Profile"} component={Profile} />
          <Stack.Screen name={"EditProfile"} component={EditProfile} options={{ unmountOnBlur: true } as CustomStackNavigationOptions}/>
          <Stack.Screen name={"SubscribeRemind"} component={SubscribeRemind} />
          <Stack.Screen name={"ConfirmDeleteAccount"} component={ConfirmDeleteAccount} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name={"FindOrderRoute"} component={FindOrderRoute} />
          <Stack.Screen name={"Orders"} component={OrdersScreen} />
          <Stack.Screen name={"OrderDetails"} component={OrderDetailsScreen} />
          <Stack.Screen name={"OrderConfirmPopup"} component={OrderConfirmPopup} />
        </Stack.Group>
        <Stack.Screen name={"AdBanners"} component={AdBanners} options={{ unmountOnBlur: true } as CustomStackNavigationOptions}/>
        <Stack.Group>
      <Stack.Screen
          name="AuthenticationChoice"
          component={AuthenticationChoice}
          options={{ unmountOnBlur: true } as CustomStackNavigationOptions}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="SmsVerification" component={SmsVerification} options={{ unmountOnBlur: true } as CustomStackNavigationOptions}/>
      </Stack.Group>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
