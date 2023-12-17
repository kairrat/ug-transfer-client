import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { ImageBackground, Modal, SafeAreaView, StyleSheet } from "react-native";
import { AsyncStorakeKeys } from "src/app/types/authorization";
import { RequestCode, VerifyCode } from "src/features/auth";
// import { AsyncStorageKeys } from "src/app";
// import { RequestCode, VerifyCode } from "src/features/auth";
// import { PrivacyPolicy } from "src/features/privacy-policy";
import { StackScreens } from "src/routes";
import { InitBackground } from "src/shared/img";
// import { InitBackground } from "src/shared/img";
import { AuthStateEnum } from "../types/authEnum";
import { AuthMenu } from "./AuthMenu";

type IAuthProps = NativeStackScreenProps<StackScreens, "Auth">;

export const Auth: FC<IAuthProps> = ({ navigation }) => {
    console.log('Auth');
    const [authState, setAuthState] = useState<AuthStateEnum | null>(null);
    const [authType, setAuthType] = useState<'sign-in' | 'sign-up'>('sign-in');
    const [privacyState, setPrivacyState] = useState<'closed' | 'confirm' | 'read'>('closed');

    useEffect(() => {
        setAuthState(AuthStateEnum.MENU);
    }, []);

    const handleSignin = () => {
        setAuthType('sign-in');
        setAuthState(AuthStateEnum.REQUEST_CODE);
    }

    const handleSignup = () => {
        setPrivacyState("confirm");
        setAuthType('sign-up');
    }

    const handleClosePrivacy = () => {
        setPrivacyState('closed');
    }

    const handleConfirmPrivacy = () => {
        setAuthState(AuthStateEnum.REQUEST_CODE);
    }

    const handleAuthorize = async () => {
        console.log('Verifing');
        const token = "sometoken";
        await AsyncStorage.setItem(AsyncStorakeKeys.TOKEN, token);
        navigation.navigate("Main");
    }

    useEffect(() => {
        if ((authState === AuthStateEnum.REQUEST_CODE || authState === AuthStateEnum.VERIFY_CODE) && privacyState !== "closed") {
            setPrivacyState("closed");
        }
    }, [authState]);

    const authComponents = {
        [AuthStateEnum.MENU]: <AuthMenu 
            onSignin={handleSignin}
            onSignup={handleSignup}
            onPrivacyPolicy={() => setPrivacyState("read")}/>,
        [AuthStateEnum.REQUEST_CODE]: <RequestCode type={authType} onVerifyCode={() => setAuthState(AuthStateEnum.VERIFY_CODE)}/>,
        [AuthStateEnum.VERIFY_CODE]: <VerifyCode onBack={() => navigation.goBack()} onSuccessVerify={handleAuthorize}/>,
    }
    return(
        <SafeAreaView style={styles.layout}>
            {
                // privacyState !== 'closed' &&
                // <Modal children={<PrivacyPolicy onBack={handleClosePrivacy} onConfirm={handleConfirmPrivacy} type={privacyState}/>}/>
            }
            <ImageBackground style={styles.backgroundImage} source={InitBackground} resizeMode="cover">
                {
                    authState &&
                    authComponents[authState]
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