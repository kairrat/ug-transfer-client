import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "src/shared/components/Button";
import { BuildingIcon, CrossIcon, LocationMarkIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";

interface IDepartureAddressMenu {
    onSelectCity: () => void;
    onSelectAddress: () => void;
    onClose: () => void;
    onApply: () => void;
    city: string;
    address: string;
}

export const DepartureAddressMenu: React.FC<IDepartureAddressMenu> = ({
    onSelectCity,
    onSelectAddress,
    onClose, 
    onApply,
    city, 
    address
}) => {
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
                <Button onPress={onSelectCity} projectType="address_input">
                    <BuildingIcon width={25} height={20}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{city || "Выберите город"}</Text>
                </Button>
                <Button onPress={onSelectAddress} projectType="address_input">
                    <LocationMarkIcon width={25} height={20}/>
                    <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}>{address || "Адрес"}</Text>
                </Button>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={onApply} projectType="primary">
                    <Text style={[fonts.medium, styles.apply_button_text]}>Применить</Text>
                </Button>
            </View>
        </View>
    );
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