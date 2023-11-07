import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { StackScreens } from "../../routes/types/StackScreens";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { OrdersHeader } from "./ui/OrdersHeader";
import { colors } from "../../shared/style";
import { CommonOrders } from "./ui/CommonOrders";
import { ActiveOrders } from "./ui/ActiveOrders";
import { ArchiveOrders } from "./ui/ArchiveOrders";
import { TabView } from "react-native-tab-view";
import { OrdersTabs } from "./ui/OrdersTabs";
import { BottomMenu } from "@components/bottomMenu/BottomMenu";
import { useEvent, useStore } from "effector-react";
import { $profile, setProfileData } from "../profile/models/Profile";
import { SubRole, UserRole } from "../../types/role";

type CompProps = NativeStackScreenProps<StackScreens, "Orders">;
const { width } = Dimensions.get("window");

export const OrdersScreen: React.FC<CompProps> = function OrdersScreen({
  route,
}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Общие" },
    { key: "second", title: "Активные" },
    { key: "third", title: "Архив" },
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
        return (
          <CommonOrders
            role={role === UserRole.DRIVERCONTROLLER ? subRole : role}
          />
        );
      case "second":
        return <ActiveOrders />;
      case "third":
        return <ArchiveOrders />;
      default:
        return null;
    }
  };
  return (
    <>
      <View
        style={{ flex: 1, backgroundColor: colors.background, paddingTop: 60 }}
      >
        <OrdersHeader title={"Заказы"} />
        <Animated.View style={{ height: "100%", marginTop: 25 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={(route) => (
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  paddingBottom: 230,
                }}
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
      </View>
      {role === UserRole.DRIVERCONTROLLER && (
        <BottomMenu
          onToggleActive={(selectedSubRole) =>
            handleProfileData({ ...data, subRole: selectedSubRole })
          }
        />
      )}
    </>
  );
};
