import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'src/shared/components/Button';
import { BuildingIcon, CrossIcon, LocationMarkIcon } from 'src/shared/img';
import { colors, fonts } from 'src/shared/style';

interface IArriveAddressMenu {
    onClose: () => void;
    city: string;
    address: string;
    onSelectCity: () => void;
    onSelectAddress: () => void;
    onApply: () => void;
};

export const ArriveAddressMenu: React.FC<IArriveAddressMenu> = ({ onClose, onSelectCity, onSelectAddress, onApply, city, address }) => {
    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={onClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>Куда едем?</Text>
            </View>
            <View style={styles.container_body}>
                <Button onPress={onSelectCity} projectType="address_input">
                    <BuildingIcon width={25}/>
                    <Text style={[fonts.regular, styles.button_text]}>{city || "Выберите город"}</Text>
                </Button>
                <Button onPress={onSelectAddress} projectType="address_input">
                    <LocationMarkIcon width={25}/>
                    <Text style={[fonts.regular, styles.button_text]}>{address || "Адрес"}</Text>
                </Button>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={onApply} projectType="primary">
                    <Text style={[fonts.medium, styles.apply_button_text]}>Применить</Text>
                </Button>
            </View>
        </View>
    )
};

export const styles = StyleSheet.create({
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
        color: colors.white
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