import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreens } from "../../routes/types/StackScreens";
import { colors, fonts } from "../../shared/style";

import CreateForm from "./ui/CreateForm";
import { addData } from "./profile-actions";
import { useNavigation } from "@react-navigation/native";
import { setProfileData } from "./models/Profile";
import { useEvent } from "effector-react";
import { Profile } from "../../types/profile";
import { UserRole } from "../../types/role";

type CompProps = NativeStackScreenProps<StackScreens, "CreateProfile">;

export const CreateProfileScreen: React.FC<CompProps> =
  function CreateProfileScreen({ route, navigation }) {
    const role = UserRole.DRIVER; //route.params.type

    const handleProfileData = useEvent(setProfileData);

    const handleForSubmit = async (values: Profile) => {
      const { status } = await addData(values);

      if (status === "success") {
        handleProfileData({ ...values, role, registrationComplete: true });
        navigation.navigate("CreateProfileComplete");
      }
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
        <CreateForm role={role} onHandleSubmit={handleForSubmit} />
      </SafeAreaView>
    );
  };
