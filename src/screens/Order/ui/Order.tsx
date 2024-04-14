import { Platform, StyleSheet, View } from "react-native";
import { colors } from "src/shared/style";
import OrderStatusBarBackground from "./StatusBarBackground";
import { Map } from "src/features/map";
import { OrderBottomSheet } from "src/features/order";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { LocationScopeIcon, MenuIcon, StatusBarBackground } from "src/shared/img";

const Order = function({navigation}) {
    console.log("Render");
    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    return(
        <View style={styles.layout}>
             <View style={[styles.header, Platform.OS === "ios" && { marginTop: 50 }]}>
                <TouchableOpacity 
                    style={[styles.menu_button, Platform.OS === "ios" && { padding: 10 }]}
                    onPress={handleOpenDrawer}>
                    <MenuIcon />
                </TouchableOpacity>
            </View>
            <>
            <OrderStatusBarBackground />
            <Map />
            <OrderBottomSheet />
            </>
           
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.white,
        position: "relative"
    },
    status_bar: {
        width: '100%',
        height: 50,
        position: "absolute",
        top: 0,
        zIndex: 10
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        position: 'absolute',
        top: 0,
        zIndex: 10
    },
    menu_button: {
        padding: 8,
        backgroundColor: colors.black,
        borderRadius: 12
    },
    bottomSheetBackground: {
        backgroundColor: colors.background,
    },
    bottomSheetHandleIndicator: {
        width: '10%',
        backgroundColor: colors.opacity
    },
    myLocation_container: {
        backgroundColor: colors.background,
        position: 'absolute',
        right: 15,
        bottom: 235,
        padding: 10,
        borderRadius: 100
    }
});

export default Order;