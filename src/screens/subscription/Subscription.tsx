import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SubscriptionItem } from "./ui/SubscriptionItem";
import { Image, Platform, Text, View } from "react-native";
import { colors, fonts } from "../../shared/style";
import { SelectSubscription } from "./ui/SelectSubscription";
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

    const [step, setStep] = useState(0);

    const navigation = useNavigation();

    const handleDecrementStep = () => {
      if (step === 0) {
        navigation.navigate("AuthenticationChoice");
        return;
      } else {
        setStep(step - 1);
      }
    };

    const handleIncrementStep = () => {
      if (step === 1) {
        navigation.navigate("CreateProfile", { type: selectedSubscrion.role });
        return;
      } else {
        setStep(step + 1);
      }
    };

    const handleSelectSubscrion = (subscription: Subscription) => {
      setSelectedSubscripion((currentSubscription) =>
        currentSubscription?.title === subscription.title ? null : subscription,
      );
    };

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: colors.background,
          paddingTop: Platform.OS === "ios" ? 65 : 20,
        }}
      >
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
      </View>
    );
  };
