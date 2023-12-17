
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { EarthIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";

interface IGpsModalSheetProps {
    onDecline: () => void,
    onAccept: () => void
}

export const GpsModalSheet: React.FC<IGpsModalSheetProps> = ({ onAccept, onDecline }) => {
    
    return(
        <View style={styles.container}>
            <EarthIcon style={styles.earth_icon}/>
            <Text style={[fonts.bold, styles.title]}>Где вы находитесь?</Text>
            <View style={styles.description_holder}>
                <Text style={[fonts.medium, styles.description]}>Установите ваше местоположение,чтобы мы могли найти ближайший к вам доступный автомобиль</Text>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={onAccept} projectType="primary">
                    <Text style={[fonts.regular, styles.primary_text]}>Включить GPS</Text>
                </Button>
                <Button onPress={onDecline} projectType="secondary">
                    <Text style={[fonts.regular, styles.secondary_text]}>Включить позже</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    earth_icon: {
        marginVertical: 20
    },
    title: {
        fontSize: 16,
        color: colors.white
    },
    description_holder: {
        paddingHorizontal: 10,
        marginVertical: 20
    },
    description: {
        fontWeight: "400",
        fontSize: 16,
        textAlign: 'center',
        color: colors.white
    },
    buttons_holder: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'column',
        rowGap: 10
    },
    primary_text: {
        color: colors.black,
        textAlign: 'center'
    },
    secondary_text: {
        color: colors.white,
        textAlign: 'center'
    }
});