import React from "react";
import { StackScreens } from "./types/StackScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivacyPolicy } from "@screens/privacyPolicy/PrivacyPolicy";
import { SmsVerification } from "@screens/authorization/SmsVerification";
import { AuthenticationChoice } from "@screens/authorization/AuthenticationChoice";

const Stack = createNativeStackNavigator<StackScreens>();

export const AuthorizationRouter = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="AuthenticationChoice"
        component={AuthenticationChoice}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SmsVerification" component={SmsVerification} />
    </Stack.Group>
  );
};
