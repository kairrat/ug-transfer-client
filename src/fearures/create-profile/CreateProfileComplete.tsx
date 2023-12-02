import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackScreens } from "../../routes/types/StackScreens";
import { Alert, Image, Text, View } from "react-native";

import { colors, fonts } from "../../shared/style";
import { PrimaryButton } from "../../shared/components/button/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

type CompProps = NativeStackScreenProps<StackScreens, "CreateProfileComplete">;
// @TODO: uncomment this
// верстка кривая на маленьком экране
export const CreateProfileCompleteScreen: React.FC<CompProps> =
  function CreateProfileCompleteScreen({ navigation }) {
    const handleButtonPress = () => {
      // @TODO: uncomment this
      Alert.alert(
        "Подтверждение",
        "Здесь должно перенести на первый экран Регистрация или Авторизация. Но, чтобы посмотреть верстку, тут переходит на след экран"
      );
      navigation.navigate("Orders");
      // navigation.navigate("AuthenticationChoice");
    };

    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          paddingTop: "50%",
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
            { color: colors.white, textAlign: "center", marginTop: "10%" },
          ]}
        >
          Данные отправлены на проверку. После проверки вы сможете пользоваться
          всеми услугами приложения
        </Text>
        <PrimaryButton
          text="OK"
          onPress={handleButtonPress}
          containerStyle={{ marginTop: "auto", marginBottom: 35 }}
        />
      </View>
    );
  };
