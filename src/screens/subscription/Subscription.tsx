import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SubscriptionItem } from "./ui/SubscriptionItem";
import { Image, Platform, SafeAreaView, Text, View } from "react-native";
import { colors, fonts } from "@styles";
import { SelectSubscription } from "./ui/SelectSubscription";
import { useState } from "react";
import { PrimaryButton } from "@components/button/PrimaryButton";
import { HeaderWithSteps } from "@components/header/HeaderWithSteps";
import { Subscription } from "../../types/subsciption";

type CompProps = NativeStackScreenProps<StackScreens, "Subscription">;
export const SubscriptionScreen: React.FC<CompProps> =
  function SubscriptionScreen({ navigation }) {
    const [selectedSubscrion, setSelectedSubscripion] =
      useState<Subscription>(null);

    const handleButton = () => {
      if (step === 1) {
        navigation.navigate("CreateProfile", { type: selectedSubscrion.role });
        return;
      }
    };

    const handleSelectSubscrion = (subscription: Subscription) => {
      setSelectedSubscripion((currentSubscription) =>
        currentSubscription?.title === subscription.title ? null : subscription
      );
    };

    return (
      <SafeAreaView>
        <HeaderWithSteps
          step={step}
          limit={2}
          title={"Подписка"}
          containerStyle={{ marginBottom: 20 }}
          onPressBack={handleDecrementStep}
        />

        {step === 0 && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <Image
              style={{ width: 190, height: 67, marginTop: 160 }}
              source={require("@assets/img/logo.png")}
            />
            <Text
              style={[
                fonts.label,
                { color: colors.white, marginTop: 51, marginBottom: 21 },
              ]}
            >
              Выберите роль
            </Text>
            <SelectSubscription
              selectedSubscription={selectedSubscrion}
              onSelectSubscription={handleSelectSubscrion}
            />
          </View>
        )}
        {step === 1 && (
          <SubscriptionItem
            {...selectedSubscrion}
            isActive={selectedSubscrion.isActive}
          />
        )}

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
