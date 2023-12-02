import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../shared/style";
import Profile from '@assets/img/profile.svg';
import CrownIcon from "@assets/img/crown.svg";
import PhoneIcon from '@assets/img/opacityPhoneRounded.svg';
import TelegramIcon from '@assets/img/opacityTelegramRounded.svg';
import { TouchableOpacity } from "react-native-gesture-handler";

interface DashboardProps {
    firstName: string;
    lastName: string;
    middleName: string;
    avatar?: string;
    telegram: string;
    phone: string;
}

export const PersonalInfoDashboard: React.FC<DashboardProps> = ({phone, avatar, firstName, lastName, middleName, telegram}) => {
    return(
        <>
            <View style={styles.holder}>
                <View style={styles.dashboard}>
                    <View style={styles.avatar_holder}>
                        <CrownIcon />
                        <View style={styles.avatar}>
                            <Profile width={100} height={100}/>
                        </View>
                    </View>
                    <View style={styles.info_holder}>
                        <Text style={[fonts.info, {color: colors.white}]}>{firstName}</Text>
                        <Text style={[fonts.info, {color: colors.white}]}>{lastName}</Text>
                        <Text style={[fonts.info, {color: colors.white}]}>{middleName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5, marginVertical: 5}}>
                            <PhoneIcon />
                            <Text style={[fonts.info, {color: colors.opacity}]}>{phone}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 2}}>
                            <TelegramIcon />
                            <Text style={[fonts.info, {color: colors.opacity, textDecorationLine: 'underline'}]}>@{telegram}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.editButton_holder}>
                <TouchableOpacity>
                    <Text style={[styles.editButton_text, fonts.description]}>Редактировать профиль</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    holder: {
        paddingHorizontal: 20,
    },
    dashboard: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: colors.stroke,
        padding: 15,
        flexDirection: 'row',
        columnGap: 15
    },
    avatar_holder: {
        width: 100,
        height: 130,
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 60,
        overflow: 'hidden'
    },
    info_holder: {
        flex: 1,
        justifyContent: 'center'
    },
    editButton_holder: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    editButton_text: {
        color: colors.opacity,
        textDecorationLine: 'underline'
    }
});