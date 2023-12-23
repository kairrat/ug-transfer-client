import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEvent } from "effector-react";
import { FC, useEffect, useState } from "react";
import { ImageBackground, Modal, SafeAreaView, StyleSheet } from "react-native";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { RequestCode, VerifyCode } from "src/features/auth";
import { PrivacyPolicy } from "src/features/privacy-policy";
import { setProfile } from "src/features/profile";
import { StackScreens } from "src/routes";
import { InitBackground } from "src/shared/img";
import { Profile } from "src/types/profile";
import { AuthCredentials } from "../types/authCredentials";
import { AuthStateEnum } from "../types/authEnum";
import { AuthMenu } from "./AuthMenu";

type IAuthProps = NativeStackScreenProps<StackScreens, "Auth">;
type AuthState = {
    state: AuthStateEnum,
    type: 'sign-in' | 'sign-up'
}

export const Auth: FC<IAuthProps> = ({ navigation }) => {
    const [authState, setAuthState] = useState<AuthState>({ state: null, type: 'sign-in'});
    const [privacyState, setPrivacyState] = useState<'closed' | 'confirm' | 'read'>('closed');
    const [credentials, setCredentials] = useState<AuthCredentials>({ phone: "", code: "" });
    const handleSetProfile = useEvent(setProfile);

    useEffect(() => {
        setAuthState(prev => ({...prev, state: AuthStateEnum.MENU}));
    }, []);

    const handleSignin = () => {
        setAuthState({state: AuthStateEnum.REQUEST_CODE, type: 'sign-in'});
    }

    const handleSignup = () => {
        setPrivacyState("confirm");
        setAuthState(prev => ({...prev, type: 'sign-up'}));
    }

    const handleConfirmPrivacy = () => {
        setAuthState(prev => ({...prev, state: AuthStateEnum.REQUEST_CODE}));
        setTimeout(() => setPrivacyState("closed"));
    }

    const handleChangePhone = (phone: string) => {
        setCredentials(prev => ({...prev, phone}));
    }

    const handleChangeCode = (code: string) => {
        setCredentials(prev => ({...prev, code}));
    }

    const handleAuthorize = async (token: string, profile: Profile) => {
        await AsyncStorage.setItem(AsyncStorageKeys.TOKEN, token);
        handleSetProfile(profile);
        navigation.navigate("Main");
    }

    useEffect(() => {
        if ((authState.state === AuthStateEnum.REQUEST_CODE || authState.state === AuthStateEnum.VERIFY_CODE) && privacyState !== "closed") {
            setPrivacyState("closed");
        }
    }, [authState]);

    const authComponents = {
        [AuthStateEnum.MENU]: <AuthMenu 
            onSignin={handleSignin}
            onSignup={handleSignup}
            onPrivacyPolicy={() => setPrivacyState("read")}/>,
        [AuthStateEnum.REQUEST_CODE]: <RequestCode 
            type={authState.type} 
            phone={credentials.phone}
            onVerifyCode={() => setAuthState(prev => ({...prev, state: AuthStateEnum.VERIFY_CODE}))} 
            onBack={() => setAuthState(prev => ({...prev, state: AuthStateEnum.MENU}))}
            onPhoneChange={handleChangePhone}/>,
        [AuthStateEnum.VERIFY_CODE]: <VerifyCode 
            credentials={credentials}
            onBack={() => setAuthState(prev => ({...prev, state: AuthStateEnum.REQUEST_CODE}))} 
            onSuccessVerify={handleAuthorize}
            onCodeChange={handleChangeCode}/>,
    }
    return(
        <SafeAreaView style={styles.layout}>
            {
                privacyState !== 'closed' &&
                <Modal children={<PrivacyPolicy onBack={() => setPrivacyState("closed")} onConfirm={handleConfirmPrivacy} type={privacyState}/>}/>
            }
            <ImageBackground style={styles.backgroundImage} source={InitBackground} resizeMode="cover">
                {
                    authState &&
                    authComponents[authState.state]
                }
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1
    },
    backgroundImage: {
        flex: 1
    }
});