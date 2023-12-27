import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEvent, useStore } from "effector-react";
import React, { useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import {  RefreshControl, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorageKeys } from "../../../app/types/authorization";
import { $profile } from "../../../features/create-profile";
import { setProfileData } from "../../../features/create-profile/models/Profile";
import { getProfile } from "../../../features/create-profile/models/profile-actions";
import { Footer, PersonalInfoDashboard, Settings } from "../../../features/profile";
import { Divider } from "../../../features/profile/ui/Divider";
import { Remark } from "../../../features/profile/ui/Remark";
import { StackScreens } from "../../../routes/types/StackScreens";
import { ScreenHeader } from "../../../shared/components";
import { colors, fonts } from "../../../shared/style";

type ProfileProps = NativeStackScreenProps<StackScreens, "Profile">;

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const { data: profileData } = useStore($profile);
    const handleSetProfile = useEvent(setProfileData);
    console.log('Profile: ', profileData);

    const [refrehsingProfile, setRefreshingProfile] = useState<boolean>(false);

    const handleMoveBack = () => {
        navigation.navigate("Orders");
    }

    const handleMoveTo = (route: keyof StackScreens) => {
        navigation.navigate(route);
    }

    const handleUpdateProfile = async () => {
        try {
            setRefreshingProfile(true);
            const response = await getProfile();
            handleSetProfile(response);
        } catch (err) {
            console.error('Profile update: ', err);
        } finally {
            setRefreshingProfile(false);
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem(AsyncStorageKeys.TOKEN);
        await AsyncStorage.removeItem(AsyncStorageKeys.USER_ROLE);
        navigation.navigate("AuthenticationChoice");
    }

    return (
        <View style={styles.layout}>
            <View >
                <ScreenHeader title="Профиль" onLeftButtonPress={handleMoveBack}/>
                <ScrollView 
                    style={{flexGrow: 1}}
                    refreshControl={
                        <RefreshControl refreshing={refrehsingProfile} onRefresh={handleUpdateProfile}/>
                    }
                >
                    <PersonalInfoDashboard 
                        avatar={profileData.avatar}
                        firstName={profileData.firstName || ""}
                        lastName={profileData.lastName||  ""}
                        middleName={profileData.middleName || ""}
                        phone={profileData.phone}
                        telegram={profileData.telegram}/>
                    <View style={styles.editButton_holder}>
                        <TouchableOpacity onPress={() => handleMoveTo("EditProfile")}>
                            <Text style={[styles.editButton_text, fonts.description]}>Редактировать профиль</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider />
                    <Settings moveTo={handleMoveTo} urgentOrderSubscriber={profileData.subscription_status}/>
                    <Divider />
                    <Remark />
                    <Divider />
                </ScrollView>
            </View>
            <Footer 
                onLogout={handleLogout} 
                onDeleteAccount={() => navigation.navigate('ConfirmDeleteAccount')} 
                onPrivacyPolicy={() => navigation.navigate("PrivacyPolicy", { fromProfile: true })}/>
        </View>
    )
};

const styles  = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between'
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