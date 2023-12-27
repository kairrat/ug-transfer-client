import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { ScreenHeader } from "../../../shared/components";
import { colors } from "../../../shared/style";
// @ts-ignore
import LeftArrow from '@assets/img/arrowLeft.svg';
import { PersonalInfoDashboard } from "../../../features/profile";
import { useStore, useUnit } from "effector-react";
import { $profile, setProfileData } from "../../../features/create-profile";
import { EditInput } from "../../../features/edit-profile";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { Telegram } from "../../../shared/components/icons/Telegram";
import { addData, uploadProfileImages } from "src/features/create-profile/models/profile-actions";
import { useToast } from "react-native-toast-notifications";
import { fileService } from "src/features/files/api/file-service";

type EditProfileProps = NativeStackScreenProps<StackScreens, "EditProfile">;

export const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
    const toast = useToast();
    const [{ data: profileData }, handleSetProfileData] = useUnit([$profile, setProfileData]);
    const [avatar, setAvatar] = useState(profileData.avatar || null);
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const handleMoveBack = () => {
        navigation.goBack();
    }
    const handleMoveTo = (route: keyof StackScreens) => {
        navigation.navigate(route);
        
    }
    const handleUpdateProfile = async () => {
        setLoading(true);
        try {

            let changed = false;
            const updatedData = {};
            if (value !== "") {
                updatedData['telegram'] = value[0] === '@' ? value.slice(1) : value;
                console.log(updatedData['telegram']);
                changed = true;
            }
            if (typeof avatar !== "string" && avatar) {
                const avatarFormData: FormData = new FormData();
                avatarFormData.append('avatar', avatar);
                const res: any = await fileService.uploadFiles(avatarFormData);
                if (res.avatar) {
                    updatedData['avatar'] = res.avatar;
                    changed = true;
                }
            }
            if (changed) {
                const response = await addData(updatedData);
                if (response?.status === "success") {
                    toast.show("Сохранено", {
                        type: "success",
                        placement: "top"
                    });
                    handleSetProfileData({...profileData, ...updatedData});
                    navigation.navigate("Profile");
                }
            }
        } finally {
            setLoading(false);
        }
    }
    return(
        <SafeAreaView style={styles.layout}>
            <ScreenHeader 
                title="Редактировать профиль"
                leftIcon={<View style={{ marginRight: 7 }}><LeftArrow /></View>}
                onLeftButtonPress={handleMoveBack}/>
            <View style={styles.content}>
                <PersonalInfoDashboard 
                    edit
                    firstName={profileData.firstName || ""}
                    lastName={profileData.lastName||  ""}
                    middleName={profileData.middleName || ""}
                    phone={profileData.phone}
                    telegram={profileData.telegram}
                    avatar={avatar}
                    onAvatarChange={setAvatar}/>
                <EditInput 
                    leftIcon={<Telegram />}
                    placeholder={"Telegram"}
                    value={value} 
                    setValue={setValue} />
                <View style={styles.button_holder}>
                    <PrimaryButton text="Сохранить" onPress={handleUpdateProfile}/>
                </View>
                <Text style={[styles.status, styles.inactive_status]} disabled={loading}>
                    Сохранено
                </Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: 10
    },
    button_holder: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    status: {
        textAlign: 'center',
        marginVertical: 10
    },
    active_status: {
        color: colors.green
    },
    inactive_status: {
        color: 'transparent'
    }
});