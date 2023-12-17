import { FC, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FileHelper } from "src/features/file-picker/model/FileHelper";
import { AddGreenIcon, PhoneRoundedIcon, UnknownUser, UserIcon } from "src/shared/img";
import { Asset } from 'react-native-image-picker';
import { useUnit } from "effector-react";
import { $auth, setLoggedState } from "src/features/auth/model/AuthStore";
import { Input } from "src/shared/components/Input";
import { Button } from "src/shared/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount";
import { PrivacyPolicy } from "src/features/privacy-policy";
import { AsyncStorakeKeys } from "src/app/types/authorization";
import { colors } from "src/shared/style";
// import { PrivacyPolicy } from "src/features/privacy-policy";

interface IProfileFormProps {
    navigateToAuth: () => void;
}

export const ProfileForm: FC<IProfileFormProps> = ({ navigateToAuth }) => {
    const [{profile, phone}, handleChangeLoggedState] = useUnit([$auth, setLoggedState]);
    const [newAvatar, setNewAvatar] = useState<any>(null);
    const [personalData, setPersonalData] = useState({firstName: profile?.firstName || "", phone});
    const [changed, setChanged] = useState<boolean>(false);
    const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
    const [openPrivacy, setOpenPrivacy] = useState<boolean>(false);
    
    const handleSelectAvatar = async () => {
        try {
            const res: Asset[] | false = await FileHelper.pickFile({ limit: 1 });
            if (res && res.length > 0) {
                setNewAvatar({ uri: res[0].uri, name: res[0].fileName || 'avatar', type: res[0].type || 'image/jpg'});
            }
        } catch (err) {
            console.error('Failed to select avatar', err);
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem(AsyncStorakeKeys.TOKEN);
        handleChangeLoggedState(false);
        navigateToAuth();
    }

    const handleDeleteAccount = async () => {
        setOpenDeleteAccount(false);
    }

    return(
        <>
            <Modal visible={openDeleteAccount} children={<ConfirmDeleteAccount onClose={() => setOpenDeleteAccount(false)} onConfirm={handleDeleteAccount} />}/>
            <Modal visible={openPrivacy} children={<PrivacyPolicy type="read" onBack={() => setOpenPrivacy(false)}/>} />
            <View style={styles.form_holder}>
                <View />
                <View style={styles.body}>
                    <View style={styles.avatar_holder}>
                        {
                            newAvatar
                            ?
                            <Image source={newAvatar} style={styles.avatar}/>
                            :
                            <Image 
                                source={profile?.avatar || UnknownUser}
                                style={styles.avatar}/>
                        }
                        <TouchableOpacity 
                            style={styles.add_avatar}
                            onPress={handleSelectAvatar}>
                            <AddGreenIcon />
                        </TouchableOpacity>
                    </View>
                    <Input 
                        leftIcon={<UserIcon />}
                        placeholder="Имя"
                        value={personalData.firstName} 
                        onChange={(firstName: string) => setPersonalData(prev => ({...prev, firstName}))}/>
                    <Input 
                        leftIcon={<PhoneRoundedIcon />}
                        placeholder="Номер телефона"
                        keyboardType="phone-pad"
                        value={personalData.phone}
                        onChange={(phone: string) => setPersonalData(prev => ({...prev, phone}))}/>
                    <Button 
                        onPress={() => {}} 
                        projectType="primary"
                        disabled={!changed}>
                            <Text style={styles.button_text}>Сохранить</Text>
                    </Button>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleLogout} style={styles.footer_button}>
                        <Text style={styles.footer_button_text}>Выйти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpenDeleteAccount(true)} style={styles.footer_button}>
                        <Text style={styles.footer_button_text}>Удалить аккаунт</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpenPrivacy(true)} style={styles.footer_button}>
                        <Text style={styles.footer_button_text}>Политика конфиденциальности</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    form_holder: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        paddingHorizontal: 20,
        rowGap: 10
    },
    avatar_holder: {
        width: 100,
        height: 100,
        position: 'relative',
        alignSelf: 'center'
    },
    avatar: {
        width: 95,
        height: 95,
        alignSelf: 'center',
        borderRadius: 100
    },
    add_avatar: {
        position: 'absolute',
        right: 15,
        bottom: 5
    },
    button_text: {
        fontSize: 16,
        color: colors.black,
        textAlign: 'center'
    },
    footer: {
        paddingVertical: 10
    },
    footer_button: {
        alignSelf: 'center'
    },
    footer_button_text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "300",
        marginVertical: 2
    }
});