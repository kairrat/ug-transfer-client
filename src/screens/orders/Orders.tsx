import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { StackScreens } from "../../routes/types/StackScreens";
import {
  Alert,
  Animated,
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { OrdersHeader } from "./ui/OrdersHeader";
import { colors } from "../../shared/style";
import { CommonOrders } from "./ui/CommonOrders";
import { ActiveOrders } from "./ui/ActiveOrders";
import { ArchiveOrders } from "./ui/ArchiveOrders";
import { TabView } from "react-native-tab-view";
import { OrdersTabs } from "./ui/OrdersTabs";
import { BottomMenu } from "@components/bottomMenu/BottomMenu";
import { useEvent, useStore } from "effector-react";
import { $profile, setProfileData } from "../../fearures/create-profile/models/Profile";
import { SubRole, UserRole } from "../../types/role";
import { useIsFocused } from "@react-navigation/native";
import DringendOrders from "@screens/orders/ui/DringendOrders";
import { orders } from "./contants";

type CompProps = NativeStackScreenProps<StackScreens, "Orders">;
const { width } = Dimensions.get("window");

export const OrdersScreen: React.FC<CompProps> = function OrdersScreen({
  route,
}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Срочные" },
    { key: "second", title: "Общие" },
    { key: "third", title: "Активные" },
    { key: "fourth", title: "Архив" },
  ]);
  const {
    data,
    data: { role = UserRole.DRIVERCONTROLLER, subRole = SubRole.CONTROLLER },
  } = useStore($profile);

  const handleProfileData = useEvent(setProfileData);

  const animation = useRef(new Animated.Value(0)).current;

  const animate = (toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleIndexChange = (indexValue: number) => {
    setIndex(indexValue);
    animate(indexValue);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <DringendOrders />;
      case "second":
        return (
          <CommonOrders
            role={role === UserRole.DRIVERCONTROLLER ? subRole : role}
          />
        );
      case "third":
        return <ActiveOrders />;
      case "fourth":
        return <ArchiveOrders />;
      default:
        return null;
    }
  };
  // Code is duplicated as in AuthenticationChoice.tsx
  // Don't know how to make DRY with useEffect
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      if (!isFocused) {
        return false;
      }
      Alert.alert("Подождите!", "Вы уверены, что хотите выйти?", [
        {
          text: "Закрыть",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Да",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [isFocused]);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: "2%",
        }}
      >
        <OrdersHeader title={"Заказы"} />
        <Animated.View style={{ flex: 1, paddingTop: "1%" }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={(route) => (
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 100, flex: orders?.length > 0 ? 0 : 1}}
              >
                {renderScene(route)}
              </ScrollView>
            )}
            initialLayout={{ width }}
            renderTabBar={(props) => (
              <OrdersTabs
                tabProps={props}
                translateValue={animation}
                handleTabPress={handleIndexChange}
              />
            )}
            onIndexChange={handleIndexChange}
            swipeEnabled={false}
          />
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
