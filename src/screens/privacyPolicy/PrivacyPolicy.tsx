import { PrimaryButton } from "@components/button/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, fonts, sharedStyles } from "@styles";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackScreens } from "src/routes/types/StackScreens";

type CompProps = NativeStackScreenProps<StackScreens, "PrivacyPolicy">;

export const PrivacyPolicy: React.FC<CompProps> =
  function PrivacyPolicyScreen() {
    const navigation = useNavigation();

    const hanldeConfirmPress = () => {
      navigation.navigate("SmsVerification");
    };

    const handleBackNavigation = () => {
      navigation.goBack();
    };

    return (
      <View style={[sharedStyles.flex, compStyles.container]}>
        <View
          style={[compStyles.scrollContainer, sharedStyles.paddingHorizontal]}
        >
          <Text style={[compStyles.title, fonts.text_Bold]}>
            {"Политика конфиденциальности"}
          </Text>
          <ScrollView>
            <Text style={[compStyles.description, fonts.description]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              lorem eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lorem
              eget libero consectetur gravida. Integer a tortor nec purus
              efficitur viverra. Nunc vestibulum posuere metus, at blandit risus
              vestibulum at. Sed venenatis, ex quis bibendum bibendum, tortor
              quam vehicula turpis, eu vulputate neque nisi eu quam. Sed
              dignissim ex ut odio elementum, in bibendum sapien malesuada.
              Fusce accumsan venenatis ligula, eget volutpat libero vestibulum
              ut. Phasellus vulputate ipsum vitae velit rutrum, non pharetra
              elit sodales. Quisque in lorem vitae nunc luctus vestibulum.
              Maecenas ac ligula eget arcu laoreet feugiat. Cras congue nulla ut
              suscipit fringilla. Morbi malesuada nisi nec neque vehicula, in
              tincidunt urna lacinia. Duis vitae mi nunc. Nulla id tellus ut
              massa cursus blandit nec sit amet libero. Nulla facilisi.
            </Text>
          </ScrollView>
        </View>

        <View style={compStyles.buttonsContainer}>
          <View style={sharedStyles.paddingHorizontal}>
            <PrimaryButton
              text="Назад"
              backgroundColorStyle={colors.background}
              containerStyle={compStyles.backButton}
              textColor={colors.white}
              onPress={handleBackNavigation}
            />
            <PrimaryButton text="Соглашаюсь" onPress={hanldeConfirmPress} />
          </View>
        </View>
      </View>
    );
  };

const compStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 41 : 81,
  },
  scrollContainer: {
    height: "75%",
    gap: 10,
  },
  title: {
    color: colors.white,
  },
  description: {
    color: colors.white,
  },
  buttonsContainer: {
    marginBottom: 40,
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 9,
  },
});
