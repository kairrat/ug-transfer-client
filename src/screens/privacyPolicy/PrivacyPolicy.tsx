import { PrimaryButton } from "@components/button/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, fonts, sharedStyles } from "@styles";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackScreens } from "src/routes/types/StackScreens";
const { width, height } = Dimensions.get("window");
type CompProps = NativeStackScreenProps<StackScreens, "PrivacyPolicy">;
const fontScale = (size) => size * Platform.select({ ios: 1, android: 1.2 });

export const PrivacyPolicy: React.FC<CompProps> = function PrivacyPolicyScreen({
  navigation,
  route
}) {
  const params = route?.params;
  const hanldeConfirmPress = () => {
    navigation.navigate("SmsVerification");
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View style={compStyles.container}>
         <Text style={[compStyles.title, fonts.text_Bold]}>
           {"Политика конфиденциальности"}
         </Text>
         <ScrollView style={{ maxHeight: '75%'}}>
          <Text style={[compStyles.description, fonts.description]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              lorem eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor quam
              vehicula turpis, eu vulputate neque nisi eu quam. Sed dignissim ex
              ut odio elementum, in bibendum sapien malesuada. Fusce accumsan
              venenatis ligula, eget volutpat libero vestibulum ut. Phasellus
              vulputate ipsum vitae velit rutrum, non pharetra elit sodales.
              Quisque in lorem vitae nunc luctus vestibulum. Maecenas ac ligula
              eget arcu laoreet feugiat. Cras congue nulla ut suscipit fringilla.
              Morbi malesuada nisi nec neque vehicula, in tincidunt urna lacinia.
              Duis vitae mi nunc. Nulla id tellus ut massa cursus blandit nec sit
              amet libero. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed ac lorem eget libero consectetur gravida.
              Integer a tortor nec purus efficitur viverra. Nunc vestibulum
              posuere metus, at blandit risus vestibulum at. Sed venenatis, ex
              quis bibendum bibendum, tortor quam vehicula turpis, eu vulputate
              neque nisi eu quam. Sed dignissim ex ut odio elementum, in bibendum
              sapien malesuada. Fusce accumsan venenatis ligula, eget volutpat
              libero vestibulum ut. Phasellus vulputate ipsum vitae velit rutrum,
              non pharetra elit sodales. Quisque in lorem vitae nunc luctus
              vestibulum. Maecenas ac ligula eget arcu laoreet feugiat. Cras
              congue nulla ut suscipit fringilla. Morbi malesuada nisi nec neque
              vehicula, in tincidunt urna lacinia. Duis vitae mi nunc. Nulla id
              tellus ut massa cursus blandit nec sit amet libero. Nulla facilisi.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              lorem eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor quam
              vehicula turpis, eu vulputate neque nisi eu quam. Sed dignissim ex
              ut odio elementum, in bibendum sapien malesuada. Fusce accumsan
              venenatis ligula, eget volutpat libero vestibulum ut. Phasellus
              vulputate ipsum vitae velit rutrum, non pharetra elit sodales.
              Quisque in lorem vitae nunc luctus vestibulum. Maecenas ac ligula
              eget arcu laoreet feugiat. Cras congue nulla ut suscipit fringilla.
              Morbi malesuada nisi nec neque vehicula, in tincidunt urna lacinia.
              Duis vitae mi nunc. Nulla id tellus ut massa cursus blandit nec sit
              amet libero. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed ac lorem eget libero consectetur gravida.
              Integer a tortor nec purus efficitur viverra. Nunc vestibulum
              posuere metus, at blandit risus vestibulum at. Sed venenatis, ex
              quis bibendum bibendum, tortor quam vehicula turpis, eu vulputate
              neque nisi eu quam. Sed dignissim ex ut odio elementum, in bibendum
              sapien malesuada. Fusce accumsan venenatis ligula, eget volutpat
              libero vestibulum ut. Phasellus vulputate ipsum vitae velit rutrum,
              non pharetra elit sodales. Quisque in lorem vitae nunc luctus
              vestibulum. Maecenas ac ligula eget arcu laoreet feugiat. Cras
              congue nulla ut suscipit fringilla. Morbi malesuada nisi nec neque
              vehicula, in tincidunt urna lacinia. Duis vitae mi nunc. Nulla id
              tellus ut massa cursus blandit nec sit amet libero. Nulla facilisi.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              lorem eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor quam
              vehicula turpis, eu vulputate neque nisi eu quam. Sed dignissim ex
              ut odio elementum, in bibendum sapien malesuada. Fusce accumsan
              venenatis ligula, eget volutpat libero vestibulum ut. Phasellus
              vulputate ipsum vitae velit rutrum, non pharetra elit sodales.
              Quisque in lorem vitae nunc luctus vestibulum. Maecenas ac ligula
              eget arcu laoreet feugiat. Cras congue nulla ut suscipit fringilla.
              Morbi malesuada nisi nec neque vehicula, in tincidunt urna lacinia.
              Duis vitae mi nunc. Nulla id tellus ut massa cursus blandit nec sit
              amet libero. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed ac lorem eget libero consectetur gravida.
              Integer a tortor nec purus efficitur viverra. Nunc vestibulum
              posuere metus, at blandit risus vestibulum at. Sed venenatis, ex
              quis bibendum bibendum, tortor quam vehicula turpis, eu vulputate
              neque nisi eu quam. Sed dignissim ex ut odio elementum, in bibendum
              sapien malesuada. Fusce accumsan venenatis ligula, eget volutpat
              libero vestibulum ut. Phasellus vulputate ipsum vitae velit rutrum,
              non pharetra elit sodales. Quisque in lorem vitae nunc luctus
              vestibulum. Maecenas ac ligula eget arcu laoreet feugiat. Cras
              congue nulla ut suscipit fringilla. Morbi malesuada nisi nec neque
              vehicula, in tincidunt urna lacinia. Duis vitae mi nunc. Nulla id
              tellus ut massa cursus blandit nec sit amet libero. Nulla facilisi.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              lorem eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor quam
              vehicula turpis, eu vulputate neque nisi eu quam. Sed dignissim ex
              ut odio elementum, in bibendum sapien malesuada. Fusce accumsan
              venenatis ligula, eget volutpat libero vestibulum ut. Phasellus
              vulputate ipsum vitae velit rutrum, non pharetra elit sodales.
              Quisque in lorem vitae nunc luctus vestibulum. Maecenas ac ligula
              eget arcu laoreet feugiat. Cras congue nulla ut suscipit fringilla.
              Morbi malesuada nisi nec neque vehicula, in tincidunt urna lacinia.
              Duis vitae mi nunc. Nulla id tellus ut massa cursus blandit nec sit
              amet libero. Nulla facilisi.
            </Text>
         </ScrollView>
      <View style={compStyles.buttonsContainer}>
        <PrimaryButton
          text="Назад"
          paddingVertical={Math.floor(height * 0.01)}
          backgroundColorStyle={colors.background}
          containerStyle={compStyles.backButton}
          textColor={colors.white}
          onPress={handleBackNavigation}
        />
        {
          !params?.fromProfile &&
          <PrimaryButton
            text="Соглашаюсь"
            onPress={hanldeConfirmPress}
            paddingVertical={Math.floor(height * 0.01)}
          />
        }
      </View>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === "android" ? 41 : 81,
  },
  title: {
    color: colors.white
  },
  description: {
    color: colors.white,
  },
  buttonsContainer: {
    marginTop: 10,
    paddingVertical: 20,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.25)"
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 9,
  },
});
