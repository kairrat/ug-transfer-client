import { useUnit } from "effector-react";
import { FC, useEffect, useState } from "react";
import { 
    Image, 
    Keyboard, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import { AuthCredentials } from "src/screens/Auth/types/authCredentials";
import { Button } from "src/shared/components/Button";
import { PincodeInput } from "src/shared/components/PincodeInput";
import { ScreenHeader } from "src/shared/components/ScreenHeader";
import { ArrowLeftIcon, Logo } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { Profile } from "src/types/profile";
import { requestCode, verifyCode } from "../model/auth-actions";
import { $auth, setLoggedState } from "../model/AuthStore";
import { RequestCodeResponse, VerifyCodeResponse } from "../types/AuthResponse";

interface IVerifyCodeProps {
    credentials: AuthCredentials
    onBack: () => void;
    onSuccessVerify: (token: string, profile: Profile) => Promise<void>;
    onCodeChange: (code: string) => void;
};

export const VerifyCode: FC<IVerifyCodeProps> = ({ 
    credentials,
    onBack, 
    onSuccessVerify,
    onCodeChange
}) => {
    const [ _, handleSetLoggedState ] = useUnit([$auth, setLoggedState]);
    const [ error, setError ] = useState<boolean>(false);
    const [ resendCodeParams, setResendCodeParams ] = useState({ resended: false, timer: 59});
    const [loading, setLoading] = useState<boolean>(false);

    const handleResendCode = async () => {
        try {
            const data: RequestCodeResponse =  await requestCode(credentials.phone);
            if (data && data.success) {
                setResendCodeParams(prev => ({...prev, resended: true}));
            }
        } catch (err) {
            console.error('Failed to resend code');
        }
    }

    const handleVerifyCode = async () => {
        handleSetLoggedState(true);
        try {
            setLoading(true);
            error && setError(false);
            const res: VerifyCodeResponse = await verifyCode(credentials.phone, credentials.code) as VerifyCodeResponse;
            console.log('Verify code response: ', res);
            if (res && res.token) {
                onSuccessVerify(res.token, res.user_data);
            }
        } catch (err) {
            console.error('Failed to verify code', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const { timer, resended } = resendCodeParams;
        const interval = resended && setInterval(() => {
            if (timer > 0) {
                setResendCodeParams(prev => ({...prev, timer: timer - 1}));
            }
            else {
                setResendCodeParams({ resended: false, timer: 60 });
            }
        }, 1000);

        if (!resended && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [resendCodeParams]);

    return(
        <SafeAreaView style={styles.layout}>
            <ScreenHeader 
                leftIcon={<ArrowLeftIcon />} 
                onLeftIconPress={onBack} 
                leftIconStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.body}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={[fonts.regular, styles.title]}>Проверочные цифры</Text>
                        <PincodeInput
                            cellStyle={styles.codeChar}
                            cellStyleFocused={{
                                borderColor: colors.primary,
                            }}
                            textStyle={styles.codeText}
                            codeLength={4}
                            cellSpacing={13}
                            value={credentials.code}
                            onTextChange={onCodeChange}
                            error={error}
                        />
                        <Text style={[styles.description]}>
                            Введите пожалуйста
                            <Text style={{ color: colors.green }}>
                                {' '} 4 последние {' '}
                            </Text>
                            цифры номера телефона нашего автоответчика
                        </Text>
                        <Text style={styles.error_message}>
                            {error && "Неправильные цифры"}
                        </Text>
                    </View>
            </TouchableWithoutFeedback>
            <View style={styles.footer}>
                {
                    resendCodeParams.resended 
                    ?
                    <View style={styles.timer_holder}>
                        <Text style={styles.timer_label}>Вы сможете отправить код повторно через</Text>
                        <Text style={styles.timer}>00:{resendCodeParams.timer} сек</Text>
                    </View>
                    :
                    <View>
                        <Text style={[styles.recall_label]}>Не было звонка?</Text>
                        <TouchableOpacity style={styles.recall_button} onPress={handleResendCode}>
                            <Text style={[styles.recall_button_text]}>Перезвонить повторно</Text>
                        </TouchableOpacity>
                    </View>
                }
                <Button 
                    projectType="primary" 
                    onPress={handleVerifyCode}
                    disabled={credentials.code.length < 4 ? true : loading }>
                    <Text style={styles.button_text}>Далее</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    title: {
        fontSize: 18,
        color: colors.white,
        marginVertical: 10
    },
    body: {
      paddingHorizontal: 20,
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1
    },
    logo: {
        paddingHorizontal: 20,
        width: '55%',
        objectFit: 'contain',
        marginVertical: 40
    },
    codeChar: {
        borderBottomWidth: 2,
        borderColor: colors.white,
    },
    codeText: {
        color: colors.white,
        fontSize: 30,
    },
    enterCodeText: {
        color: colors.white,
        marginTop: "5%",
        paddingHorizontal: 45,
        textAlign: "center",
        marginBottom: "10%",
    },
    errorTextContainer: {
        height: "10%",
    },
    errorText: {
        color: colors.error,
    },
    description: {
        color: colors.white,
        fontSize: 16,
        width: '80%',
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: "300"
    },
    error_message: {
        color: colors.error,
        fontWeight: "300",
        fontSize: 16
    },
    footer: {
        marginVertical: 20,
        paddingHorizontal: 20
    },
    recall_label: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontWeight: "300"
    },
    recall_button: {
        width: '50%',
        alignSelf: 'center',
        marginBottom: 20
    },
    recall_button_text: {
        textDecorationLine: 'underline',
        color: colors.green,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "500"
    },
    timer_holder: {
        width: '60%',
        alignSelf: 'center',
    },
    timer_label: {
        fontSize: 16,
        fontWeight: "300",
        color: colors.white,
        textAlign: 'center'
    },
    timer: {
        fontSize: 28,
        color: colors.opacity,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    button_text: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center'
    }
});