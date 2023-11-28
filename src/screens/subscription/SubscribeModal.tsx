import React, { useState } from "react";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
type CompProps = NativeStackScreenProps<StackScreens, "SubscribeModal">;
export const SubscribeModal: React.FC<CompProps> = function SubscribeModal({
  navigation,
  route,
}) {
  const { url } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  return (
    <WebView
      onError={(event) => {
        if (!event.nativeEvent.url.includes("success")) {
          navigation.pop();
        }
      }}
      source={{ uri: url }}
      style={!isLoading && compStyles.flex}
      onLoadStart={() => {
        setIsLoading(true);
      }}
      onLoadEnd={(event) => {
        setIsLoading(false);
        if (event.nativeEvent.url.includes("success")) {
          // dispatch(setDefaultCreateForm(DefaultCreateForm));
          // dispatch(approveSubscribe({id: organizationId, type}));
        }
      }}
    />
  );
};

const compStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
