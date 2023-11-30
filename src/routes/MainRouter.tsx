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
import { CreateProfileScreen } from "@screens/profile/CreateProfile";
import { CreateProfileCompleteScreen } from "@screens/profile/CreateProfileComplete";
import { OrdersScreen } from "@screens/orders/Orders";
import { OrderDetailsScreen } from "@screens/orderDetails/OrderDetails";
import { Wallet } from "@screens/wallet/Wallet";
import { FindOrderRoute } from "../screens/findOrderRoute";

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
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name={"FindOrderRoute"} component={FindOrderRoute} />
          <Stack.Screen name={"Orders"} component={OrdersScreen} />
          <Stack.Screen name={"OrderDetails"} component={OrderDetailsScreen} />
        </Stack.Group>
        {/* {AuthorizationRouter()} */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
