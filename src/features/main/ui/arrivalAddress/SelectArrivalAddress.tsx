import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { BottomSheetContext } from "../../context/BottomSheetContext";

interface ISelectArrivalAddressProps {
    snapPosition: number;
    onClose: () => void;
    setDepartureAddress: (address: string) => void;
};

export const SelectArrivalAddress: React.FC<ISelectArrivalAddressProps> = ({ onClose, setDepartureAddress, snapPosition: defaultSnapPosition }) => {
    const { modalRef } = useContext(BottomSheetContext);
    const [ address, setAddress ] = useState<string>("");
    const isKeyboardVisible = useKeyboardVisibility();
    const [ snapPosition, setSnapPosition ] = useState<number>(defaultSnapPosition);

    useEffect(() => {
        if (isKeyboardVisible) {
            modalRef.current?.snapToPosition(snapPosition + 320);
        }
        else {
            modalRef.current?.snapToPosition(snapPosition);
        }
    }, [isKeyboardVisible]);

    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={onClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>В какой адрес едем?</Text>
            </View>
            <View style={styles.body}>
                <Input
                    value={address}
                    onChange={setAddress}
                    leftIcon={<BuildingIcon />}
                    placeholder="Адрес"
                    rightIcon={address !== "" && <CrossIcon width={30} />}
                    onRightIconPress={() => setAddress("")}/>
                <View style={styles.button_holder}>
                    <Button onPress={() => setDepartureAddress(address)} projectType="primary">
                        <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                    </Button>
                </View>
            </View>
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