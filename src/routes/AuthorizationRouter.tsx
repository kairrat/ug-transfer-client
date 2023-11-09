import React from "react";
import { StackScreens } from "./types/StackScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationChoice } from "@screens/authorization/AuthenticationChoice";
import { PrivacyPolicy } from "@screens/privacyPolicy/PrivacyPolicy";
import { SmsVerification } from "@screens/authorization/SmsVerification";
import { AuthorizationComplete } from "@screens/authorization/AuthorizationComplete";

const Stack = createNativeStackNavigator<StackScreens>();

export const AuthorizationRouter = () => {
  return (
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="AuthenticationChoice"
        component={AuthenticationChoice}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SmsVerification" component={SmsVerification} />
      <Stack.Screen
        name="AuthorizationComplete"
        component={AuthorizationComplete}
      />
    </Stack.Group>
  );
};
