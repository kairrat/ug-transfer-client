import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { StackScreens } from "../../routes/types/StackScreens";
import { colors, fonts } from "../../shared/style";
import { HeaderWithSteps } from "@components/header/HeaderWithSteps";
import { SafeAreaView } from "react-native";
import CreateForm from "./ui/CreateForm";
import { addData } from "./profile-actions";
import { useNavigation } from "@react-navigation/native";
import { setProfileData } from "./models/Profile";
import { useEvent } from "effector-react";
import { Profile } from "../../types/profile";

type CompProps = NativeStackScreenProps<StackScreens, "CreateProfile">;

export const CreateProfileScreen: React.FC<CompProps> =
  function CreateProfileScreen({ route }) {
    const role = route.params.type;

    const navigation = useNavigation<any>();

    const handleProfileData = useEvent(setProfileData);

    const hanldeFormSubmit = async (values: Profile) => {
      // const { status } = await addData(values);

      // if (status === "success") {
      // handleProfileData({ ...values, role, registrationComplete: true });
      navigation.navigate("CreateProfileComplete");
      // }
    };

    const handleBackPress = () => {
      navigation.navigate("Subscription");
    };

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <HeaderWithSteps
          step={2}
          limit={2}
          title={"Подписка"}
          containerStyle={{ marginVertical: 20 }}
          onPressBack={handleBackPress}
        />

        <CreateForm role={role} onHandleSubmit={hanldeFormSubmit} />
      </SafeAreaView>
    );
  };
