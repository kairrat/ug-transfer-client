import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { $profile } from "src/features/create-profile";
import { setSettings } from "src/features/create-profile/models/Profile";
import { AsyncStorageKeys } from "../../../app/types/authorization";
import { ToggleSwitch } from "../../../shared/components/toggleSwitch";
import { colors, fonts } from "../../../shared/style";
import { SUBSCRIBER_OPTIONS } from "../constants/SettingsConstants";
import { SettingOption } from "../enums/SettingsEnums";

type SettingsProps = {
    moveTo: (route: string) => void;
    urgentOrderSubscriber: boolean;
}

interface ISettings {
    [SettingOption.notification]: boolean,
    [SettingOption.popupWindows]: boolean,
    [SettingOption.soundSignal]: boolean
}


export const Settings: React.FC<SettingsProps> = ({ moveTo, urgentOrderSubscriber=false}) => {
    const [{settings}, handleSetSettings] = useUnit([$profile, setSettings]);

    const handleToggleSetting = (option: SettingOption, value: boolean) => {
        if (SUBSCRIBER_OPTIONS.includes(option) && !urgentOrderSubscriber) {
            moveTo('SubscribeRemind');
            return;
        }
        const newSettings: ISettings = {...settings, [option]: value};
        AsyncStorage.setItem(AsyncStorageKeys.SETTINGS, JSON.stringify(newSettings));
        handleSetSettings(newSettings);
    }
    return (
        <>
            {
                settings !== null &&
                <View style={styles.settings_holder}>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Уведомления</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings[SettingOption.notification]} onChange={(value: boolean) => handleToggleSetting(SettingOption.notification, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings[SettingOption.notification] ? "Вкл" : "Выкл"}</Text>
                        </View>
                    </View>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Всплывающие окна</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings[SettingOption.popupWindows]} onChange={(value: boolean) => handleToggleSetting(SettingOption.popupWindows, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings[SettingOption.popupWindows] ? "Вкл" : "Выкл"}</Text>
                        </View>
                    </View>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Звуковой сигнал</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings[SettingOption.soundSignal]} onChange={(value: boolean) => handleToggleSetting(SettingOption.soundSignal, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings[SettingOption.soundSignal] ? "Вкл" : "Выкл"}</Text>
                        </View>
                    </View>

                </View>
            }
        </>
    )
};

const styles = StyleSheet.create({
    settings_holder: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        rowGap: 10
    },
    option_holder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    option_name: {
        color: colors.white
    },
    option_controller: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        columnGap: 10
    },
});