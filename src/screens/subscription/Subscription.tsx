import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SubscriptionItem } from "./ui/SubscriptionItem";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts, sharedStyles } from "../../shared/style";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../shared/components/button/PrimaryButton";
import { HeaderWithSteps } from "../../shared/components/header/HeaderWithSteps";
import { Subscription } from "../../types/subsciption";
import { InactiveSubscription } from "./ui/InactiveSubscription";
import { subscriptions } from "./contants";
import { SubscriptionExpire } from "./ui/SubscriptionExpire";
import { getSubscriptionActions } from "./subscription-actions";
import { ISubscriptionType } from "./subscription-response";
import { UserRole, UserRoleBackend } from "../../types/role";

type CompProps = NativeStackScreenProps<StackScreens, "Subscription">;

export const SubscriptionScreen: React.FC<CompProps> =
  function SubscriptionScreen({ navigation, route }) {
    const { subscription_status } = route.params;

    const [selectedSubscrion, setSelectedSubscripion] =
      useState<Subscription>(null);

    const [subsrciptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
      const fetchSubscription = async () => {
        try {
          const data = await getSubscriptionActions();
          if (data) {
            setSubscriptionData(data.data);
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
        }
      };
      fetchSubscription();
      return () => {};
    }, []);

    const handleNextButton = () => {
      navigation.navigate("CreateProfile", {
        type: UserRole.DRIVER,
      });
    };

    const handleBackButton = () => {
      navigation.navigate("AuthenticationChoice");
    };

    // const handleSelectSubscrion = (subscription: Subscription) => {
    //   setSelectedSubscripion((currentSubscription) =>
    //     currentSubscription?.title === subscription.title ? null : subscription
    //   );
    // };

    return (
      <SafeAreaView style={[sharedStyles.flex, compStyles.container]}>
        <HeaderWithSteps
          step={1}
          limit={2}
          title={"Подписка"}
          containerStyle={{ marginBottom: 20 }}
          onPressBack={handleBackButton}
        />
        <FlatList
          style={{ borderWidth: 0, borderColor: "transparent" }}
          data={subsrciptionData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SubscriptionItem
              title={item.type}
              desciption={item.description}
              isActive={subscription_status ?? false}
              price={item.price}
            />
          )}
        ></FlatList>
        <View style={{ paddingHorizontal: "5%" }}>
          <PrimaryButton
            containerStyle={{ marginTop: "auto", marginBottom: "5%" }}
            text="Далее"
            onPress={handleNextButton}
          />
        </View>
      </SafeAreaView>
    );
  };

const compStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: "5%",
  },
});
