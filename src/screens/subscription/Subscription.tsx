import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../routes/types/StackScreens";
import { SubscriptionItem } from "./ui/SubscriptionItem";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { colors, fonts, sharedStyles } from "../../shared/style";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../shared/components/button/PrimaryButton";
import { HeaderWithSteps } from "../../shared/components/header/HeaderWithSteps";
import { getSubscriptionActions } from "./subscription-actions";
import { UserRole } from "../../types/role";

type CompProps = NativeStackScreenProps<StackScreens, "Subscription">;

export const SubscriptionScreen: React.FC<CompProps> =
  function SubscriptionScreen({ navigation, route }) {
    const { subscription_status } = route.params || {
      subscription_status: false,
    };
    const [subscriptionStatus, setSubscriptionStatus] =
      useState(subscription_status);

    const [subsrciptionData, setSubscriptionData] = useState(null);
    const handleChangeSubscriptionStatusToTrue = () => {
      setSubscriptionStatus(true);
    };
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
      navigation.navigate("CreateProfile", { type: UserRole.DRIVER });
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
              handleChangeSubscriptionStatusToTrue={
                handleChangeSubscriptionStatusToTrue
              }
              title={item.type}
              desciption={item.description}
              isActive={subscriptionStatus ?? false}
              price={item.price}
            />
          )}
        ></FlatList>
        <View style={{ paddingHorizontal: "5%", marginVertical: '10%' }}>
          {subscriptionStatus && (
            <PrimaryButton
              text="Далее"
              onPress={handleNextButton}
              containerStyle={{ marginTop: 20 }}
            />
          )}
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
