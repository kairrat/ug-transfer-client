import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToggleSwitch } from "../../../shared/components/toggleSwitch";
import { colors, fonts } from "../../../shared/style";
import { SUBSCRIBER_OPTIONS } from "../constants/SettingsConstants";
import { SettingOption } from "../enums/SettingsEnums";

type SettingsProps = {
    moveTo: (route: string) => void;
    urgentOrderSubscriber: boolean;
}

interface ISettings {
    notifications: boolean,
    popupWindows: boolean,
    soundSignal: boolean
}


export const Settings: React.FC<SettingsProps> = ({ moveTo, urgentOrderSubscriber=false}) => {
    const [settings, setSettings] = useState<ISettings | null>(null)

    const handleToggleSetting = (option: SettingOption, value: boolean) => {
        if (SUBSCRIBER_OPTIONS.includes(option) && !urgentOrderSubscriber) {
            moveTo('SubscribeRemind');
            return;
        }
        setSettings(prev => {
            const next = {...prev, [option]: value};
            AsyncStorage.setItem('settings', JSON.stringify(next));
            return next;
        });
    }

    useEffect(() => {
        AsyncStorage.getItem('settings').then((res) => {
            if (res) {
                setSettings(JSON.parse(res));
            }
            else {
                const newSettings: ISettings = {
                    notifications: urgentOrderSubscriber,
                    popupWindows: urgentOrderSubscriber,
                    soundSignal: true
                };
                setSettings(newSettings);
                AsyncStorage.setItem('settings', JSON.stringify(newSettings));
            }
        })
    }, []);

    return (
        <>
            {
                settings !== null &&
                <View style={styles.settings_holder}>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Уведомления</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings.notifications} onChange={(value: boolean) => handleToggleSetting(SettingOption.notification, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings.notifications ? "Вкл" : "Выкл"}</Text>
                        </View>
                    </View>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Всплывающие окна</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings.popupWindows} onChange={(value: boolean) => handleToggleSetting(SettingOption.popupWindows, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings.popupWindows ? "Вкл" : "Выкл"}</Text>
                        </View>
                    </View>
                    <View style={styles.option_holder}>
                        <Text style={[styles.option_name, fonts.info]}>Звуковой сигнал</Text>
                        <View style={styles.option_controller}>
                            <ToggleSwitch value={settings.soundSignal} onChange={(value: boolean) => handleToggleSetting(SettingOption.soundSignal, value)}/>
                            <Text style={[{color: colors.opacity}, fonts.description]}>{settings.soundSignal ? "Вкл" : "Выкл"}</Text>
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