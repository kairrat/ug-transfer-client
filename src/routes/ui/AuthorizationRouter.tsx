import React from "react";
import { StackScreens } from "../types/StackScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<StackScreens>();

export const AuthorizationRouter = () => {
  return (
    <Stack.Group>
      {/* <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SmsVerification" component={SmsVerification} /> */}
    </Stack.Group>
  );
};
