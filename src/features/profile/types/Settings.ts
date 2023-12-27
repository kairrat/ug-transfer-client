import { SettingOption } from "../enums/SettingsEnums";

export type ISettings = {
    [SettingOption.notification]: boolean,
    [SettingOption.popupWindows]: boolean,
    [SettingOption.soundSignal]: boolean
};