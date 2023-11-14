import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackScreens } from "../../routes/types/StackScreens";
import { Image, Text, View } from "react-native";

import { colors, fonts } from "../../shared/style";
import { PrimaryButton } from "../../shared/components/button/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

type CompProps = NativeStackScreenProps<StackScreens, "CreateProfileComplete">;

export const CreateProfileCompleteScreen: React.FC<CompProps> =
  function CreateProfileCompleteScreen() {
    const navigation = useNavigation<any>();

    const hanldeButtonPress = () => {
      navigation.navigate("Orders");
    };

    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          paddingTop: 300,
          paddingHorizontal: 32,
          backgroundColor: colors.background,
          flex: 1,
        }}
      >
        <Image
          style={{ height: 67, width: 172 }}
          source={require("@assets/img/logo.png")}
        />
        <Text
          style={[
            fonts.label,
            { color: colors.white, textAlign: "center", marginTop: 45 },
          ]}
        >
          Данные отправлены на проверку. После проверки вы сможете пользоваться
          всеми услугами приложения
        </Text>
        <PrimaryButton
          text="OK"
          onPress={hanldeButtonPress}
          containerStyle={{ marginTop: "auto", marginBottom: 35 }}
        />
      </View>
    );
  };
