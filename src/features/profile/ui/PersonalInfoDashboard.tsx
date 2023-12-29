import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../shared/style";
// @ts-ignore
import Profile from '@assets/img/profile.svg';
// @ts-ignore
import CrownIcon from "@assets/img/crown.svg";
// @ts-ignore
import PhoneIcon from '@assets/img/opacityPhoneRounded.svg';
// @ts-ignore
import TelegramIcon from '@assets/img/opacityTelegramRounded.svg';
import { EditAvatar } from "./EditAvatar";

interface DashboardProps {
    firstName: string;
    lastName: string;
    middleName: string;
    avatar?: string | File;
    telegram: string;
    phone: string;
    edit?: boolean;
    onAvatarChange?: (data: File) => void;
}

export const PersonalInfoDashboard: React.FC<DashboardProps> = ({phone, avatar, firstName, lastName, middleName, telegram, edit=false, onAvatarChange }) => {
    return(
        <>
            <View style={styles.holder}>
                <View style={styles.dashboard}>
                    <View style={styles.avatar_holder}>
                        <CrownIcon />
                        <View style={styles.avatar}>
                            {
                                avatar 
                                ?
                                <Image source={typeof avatar === "string" ? {uri: avatar} : avatar} style={{ width: 100, height: 100}}/>
                                :
                                <Profile width={100} height={100}/>
                            }
                        </View>
                        {
                            edit &&
                            <EditAvatar avatar={avatar} onAvatarChange={onAvatarChange}/>
                        }
                    </View>
                    <View style={styles.info_holder}>
                        <Text style={[fonts.info, {color: colors.white}]}>{firstName}</Text>
                        <Text style={[fonts.info, {color: colors.white}]}>{lastName}</Text>
                        {
                            middleName &&
                            <Text style={[fonts.info, {color: colors.white}]}>{middleName}</Text>
                        }   
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5, marginVertical: 5}}>
                            <PhoneIcon />
                            <Text style={[fonts.info, {color: colors.opacity}]}>{phone}</Text>
                        </View>
                        {
                            telegram &&
                            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 2}}>
                                <TelegramIcon />
                                <Text style={[fonts.info, {color: colors.opacity, textDecorationLine: 'underline'}]}>@{telegram.replace('@', '')}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    holder: {
        paddingHorizontal: 20,
    },
    dashboard: {
        backgroundColor: colors.board,
        borderColor: colors.stroke,
        borderWidth: 1,
        borderRadius: 7,
        padding: 15,
        flexDirection: 'row',
        columnGap: 15
    },
    avatar_holder: {
        width: 100,
        height: 130,
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 60,
        overflow: 'hidden',
        position: 'relative'
    },
    info_holder: {
        flex: 1,
        justifyContent: 'center'
    }
});