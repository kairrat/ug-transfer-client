import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC } from "react";
import { CrossIcon, BuildingIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { $main, setEditingOrder } from "src/features/main/model/MainStore";
import { useUnit } from "effector-react";
import { Button } from "src/shared/components/Button";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

type Props = TBottomSheetMethods & {};

const DepartureAddress: FC<Props> = function({setBottomSheetState}) {
    const [{editingOrder, order}, handleSetEditingOrder] = useUnit([$main, setEditingOrder])

    /**
     * Resets changes my assigning previous value and moves back to menu
     */
    function close() {
        handleSetEditingOrder({...editingOrder, departure: order.departure});
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }
    
    /**
     * Change text method for input
     * @param address input text
     */
    function onAddressChange(address: string) {
        handleSetEditingOrder({...editingOrder, departure: { ...editingOrder.departure, address }})
    }

    /**
     * Applyies changes, input changes text in effector "editingOrder" store
     */
    function applyChanges() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION)
    }

    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={close}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>С какого адреса едем?</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    {/* [TODO] Style Building Icon */}
                    {/* <BuildingIcon />  */}
                    <BottomSheetTextInput
                        style={styles.input} 
                        value={editingOrder.departure.address} 
                        placeholder="Адрес"
                        placeholderTextColor={colors.opacity}
                        onChangeText={onAddressChange}/>
                    <View style={styles.button_holder}>
                        <Button onPress={applyChanges} projectType="primary">
                            <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
        position: 'relative',
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
    header_title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        color: colors.white,
        marginVertical: 5
    },
    body: {
        paddingVertical: 35
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.white
    },
    dropdown: {
        width: '100%',
        marginTop: 10
    },
    dropdown_item: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    dropdown_item_first: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        borderTopWidth: 1,
        borderTopColor: colors.line,
    },
    dropdown_item_text: {
        color: colors.white,
        fontSize: 16
    },
    button_holder: {
        marginVertical: 20,
        marginTop: 50
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});

export default DepartureAddress;