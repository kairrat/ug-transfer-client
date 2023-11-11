import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SubscriptionItem } from "./ui/SubscriptionItem";
import { Image, SafeAreaView, Text, View } from "react-native";
import { colors, fonts } from "../../shared/style";
import { useState } from "react";
import { PrimaryButton } from "../../shared/components/button/PrimaryButton";
import { HeaderWithSteps } from "../../shared/components/header/HeaderWithSteps";
import { Subscription } from "../../types/subsciption";
import { useNavigation } from "@react-navigation/native";

type CompProps = NativeStackScreenProps<StackScreens, "Subscription">;

export const SubscriptionScreen: React.FC<CompProps> =
  function SubscriptionScreen() {
    const [selectedSubscrion, setSelectedSubscripion] =
      useState<Subscription>(null);

    const navigation = useNavigation();

    const handleDecrementStep = () => {
      console.log("нажал назад");
      // navigation.navigate("Authentication");
    };

    const handleIncrementStep = () => {
      navigation.navigate("CreateProfile", { type: selectedSubscrion.role });
    };

    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <HeaderWithSteps
          title={"Подписка"}
          containerStyle={{ marginBottom: 20 }}
          onPressBack={handleDecrementStep}
        />
        <SubscriptionItem
          {...selectedSubscrion}
          isActive={selectedSubscrion.isActive}
        />
        {selectedSubscrion && (
          <PrimaryButton
            containerStyle={{ marginTop: "auto", marginBottom: 40 }}
            text="Далее"
            onPress={handleIncrementStep}
          />
        )}
      </SafeAreaView>
    );
  };
