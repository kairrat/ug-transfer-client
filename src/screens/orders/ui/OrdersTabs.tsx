import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Route, TabBarProps } from "react-native-tab-view";
import React, { useRef, useEffect } from "react";
import { colors, fonts } from "../../../shared/style";
import { fontScale } from "../../../helpers/scale";

interface OrdersTabsProps {
  tabProps: TabBarProps<Route>;
  translateValue: any;
  handleTabPress: (index: number) => void;
}

export const OrdersTabs = ({
  tabProps,
  translateValue,
  handleTabPress,
}: OrdersTabsProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: tabProps.navigationState.index,
      duration: 100, // duration of animation
      useNativeDriver: true, // leverage native driver for better performance
    }).start();
  }, [tabProps.navigationState.index]);

  const translateX = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get("window").width / 4],
  });
  const currentIndex = tabProps.navigationState.index;
  return (
    <View style={compStyles.tabs}>
      <Animated.View
        style={[
          compStyles.activeTab,
          {
            left: currentIndex === 0 ? "5%" : "3%",
            width: "23%",
            transform: [{ translateX }],
            borderBottomColor:
              currentIndex === 0 ? colors.secondary : colors.primary,
          },
        ]}
      />
      {tabProps.navigationState.routes.map((route, index) => {
        const isFocused = currentIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={compStyles.tab}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                compStyles.tabText,
                fonts.text_semiBold,
                { fontSize: fontScale(11) },
                isFocused && currentIndex === 0
                  ? compStyles.dringendTabText
                  : isFocused && compStyles.activeTabText,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const compStyles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.opacity,
  },
  activeTab: {
    position: "absolute",
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    zIndex: 1,
    height: "100%",
  },
  tabText: {
    color: colors.opacity,
  },
  dringendTabText: {
    color: colors.secondary,
  },
  activeTabText: {
    color: colors.primary,
  },
});
