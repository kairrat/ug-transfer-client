import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackScreens } from "../../routes/types/StackScreens";
import { orders } from "../orders/contants";
import { Order } from "../orders/ui/Order";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fonts } from "@styles";
import CrossIcon from "@assets/img/cross.svg";
import { useNavigation } from "@react-navigation/native";

type CompProps = NativeStackScreenProps<StackScreens, "OrderDetails">;

export const OrderDetailsScreen: React.FC<CompProps> =
  function OrderDetailsScreen({ route }) {
    const navigation = useNavigation<any>();
    const { id } = route.params;
    const order = orders.find((item) => item.id === id);

    const handleBackPress = () => {
      navigation.navigate("Orders");
    };

    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          flex: 1,
          paddingHorizontal: 5,
          paddingTop: Platform.OS === "android" ? 41 : 61,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", left: 16 }}
            onPress={handleBackPress}
          >
            <CrossIcon />
          </TouchableOpacity>

          <Text
            style={[
              fonts.text_semiBold,
              {
                color: colors.white,
              },
            ]}
          >
            Заказ
          </Text>
        </View>

        <Order
          {...order}
          showDestinationMoreInfo
          showBorder={false}
          showComments
          showDriverInfo
          isActive={true}
        />
      </ScrollView>
    );
  };
