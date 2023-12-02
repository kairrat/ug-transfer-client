import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Footer, PersonalInfoDashboard, Settings } from "../../../fearures/profile";
import { Divider } from "../../../fearures/profile/ui/Divider";
import { Remark } from "../../../fearures/profile/ui/Remark";
import { StackScreens } from "../../../routes/types/StackScreens";
import { ScreenHeader } from "../../../shared/components/screenHeader";
import { colors } from "../../../shared/style";

type ProfileProps = NativeStackScreenProps<StackScreens, "Profile">;

export const Profile: React.FC<ProfileProps> = () => {
    const navigation = useNavigation<any>();

    const handleMoveBack = () => {
        navigation.goBack();
    }

    const handleMoveTo = (route: string) => {
        navigation.navigate(route);
    }

    const handleLogout =() => {}

    return (
        <View style={styles.layout}>
            <View>

                <ScreenHeader title="Профиль" onLeftButtonPress={handleMoveBack}/>
                <PersonalInfoDashboard 
                    firstName={"Джон"}
                    lastName={"Джоненко"}
                    middleName={"Джонович"}
                    phone={"+7 099 744 21 21"}
                    telegram={"Jhonn123"}/>
                <Divider />
                <Settings moveTo={handleMoveTo} urgentOrderSubscriber={false}/>
                <Divider />
                <Remark />
                <Divider />
            </View>
            <Footer onLogout={handleLogout} onDeleteAccount={() => {handleMoveTo('ConfirmDeleteAccount')}}/>
        </View>
    )
};

const styles  = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});