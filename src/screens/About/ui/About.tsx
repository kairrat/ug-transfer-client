import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect } from "react";
import { BackHandler, Image, Linking, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { VERSION } from "src/appConfig";
import { StackScreens } from "src/routes";
import { ScreenHeader } from "src/shared/components/ScreenHeader";
import { AboutLinkIcon, ArrowLeftIcon, ArrowRightIcon, Logo } from "src/shared/img";
import { colors } from "src/shared/style";
import { ABOUT_LINKS } from "../constants/Links";
import { LinkItem } from "./LinkItem";
import { AboutLink } from "../types/AboutLink";

type AboutProps = NativeStackScreenProps<StackScreens, "About">;

export const About: FC<AboutProps> = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Main");
            return true;
        });
        return () => {
            backHandler.remove();
        }
    }, []);

    return(
        <SafeAreaView style={[styles.layout]}>
            <ScreenHeader title="О сервисе" leftIcon={<ArrowLeftIcon />} onLeftIconPress={() => navigation.navigate("Main")}/>
            <View style={styles.content}>
                <View />
                <View style={styles.body}>
                    <Image source={Logo} style={styles.logo}/>
                    <View style={styles.links}>
                        {
                            ABOUT_LINKS.map((item: AboutLink, index: number) => (
                            <LinkItem 
                                key={index} 
                                onPress={() => Linking.openURL(item.link)} title={item.label}
                                leftIcon={<AboutLinkIcon />}
                                rightIcon={<ArrowRightIcon />}/>))
                        }
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.version_text}>ver.{VERSION}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    body: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        width: '55%',
        objectFit: 'contain'
    },
    links: {
        flexDirection: 'column',
        rowGap: 10,
        width: '100%'
    },
    footer: {
        paddingVertical: 10
    },
    version_text: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.white
    },
});