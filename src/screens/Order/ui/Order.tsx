import { StyleSheet, View } from "react-native";
import { colors } from "src/shared/style";
import OrderStatusBarBackground from "./StatusBarBackground";
import { Map } from "src/features/map";
import { OrderBottomSheet } from "src/features/order";

const Order = function() {
    console.log("Render");
    return(
        <View style={styles.layout}>
            <OrderStatusBarBackground />
            <Map />
            <OrderBottomSheet />
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.white,
        position: "relative"
    }
});

export default Order;