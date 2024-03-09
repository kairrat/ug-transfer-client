import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC } from "react";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { colors, fonts } from "src/shared/style";
import { BuildingIcon, CrossIcon, LocationMarkIcon } from "src/shared/img";
import { Button } from "src/shared/components/Button";
import { useUnit } from "effector-react";
import { $main, setEditingOrder, setOrder } from "src/features/main/model/MainStore";

type Props = TBottomSheetMethods & {};

const DepartureMenu: FC<Props> = function({ setBottomSheetState }) {

    const [{order, editingOrder}, handleSetOrder, handleSetEditingOrder] = useUnit([$main, setOrder, setEditingOrder]);

    function applyLocation() {
        handleSetOrder({...order, departure: editingOrder.departure});
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    /**
     * 
     */
    function onClose() {
        handleSetEditingOrder({...editingOrder, departure: order.departure});
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    function openCitySelection() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_CITY);
    }
    function openAddressSelection() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_ADDRESS);
    }

    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={onClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>Откуда едем?</Text>
            </View>
            <View style={styles.container_body}>
                <Button onPress={openCitySelection} projectType="address_input">
                    <BuildingIcon width={25}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{editingOrder.arrival.city || "Выберите город"}</Text>
                </Button>
                <Button onPress={openAddressSelection} projectType="address_input">
                    <LocationMarkIcon width={25}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{editingOrder.arrival.address || "Адрес"}</Text>
                </Button>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={applyLocation} projectType="primary">
                    <Text style={[fonts.medium, styles.apply_button_text]}>Применить</Text>
                </Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
    },
    header_title: {
        width: '100%',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginVertical: 5
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        zIndex: 1
    },
    button_text: {
        fontSize: 16,
        color: colors.white,
        width: '90%'
    },
    container_body: {
        marginVertical: 35,
        flexDirection: 'column',
        rowGap: 10
    },
    buttons_holder: {

    },
    apply_button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16
    }
});

export default DepartureMenu;