import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "src/shared/style";
import { ArrowRightIcon, UnknownUser } from 'src/shared/img';
import { DRAWER_NAVS } from "../model/drawerNavs";
import { useNavigation } from "@react-navigation/core";

interface IDrawerContentProps {};

export const DrawerContent: React.FC<IDrawerContentProps> = () => {
    const navigation = useNavigation<any>();
    
    return(
        <DrawerContentScrollView 
            contentContainerStyle={styles.layout}>
                <View style={styles.content}>
                    <TouchableOpacity 
                        style={styles.profile_button}
                        onPress={() => navigation.navigate("Profile")}>
                            <Image source={UnknownUser} style={styles.avatar}/>
                            <Text style={[fonts.regular, styles.profile_text]}>Мой профиль</Text>
                            <ArrowRightIcon />
                    </TouchableOpacity>
                    {
                        DRAWER_NAVS.map(({ icon, label, route, url }, index) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    if (route) {
                                        navigation.navigate(route);
                                    }
                                    else if (url){
                                        Linking.openURL(url);
                                    }
                                }}
                                style={[styles.nav_button, index === 0 && styles.first_nav_button]} 
                                key={index}>
                                    {icon}
                                <Text style={[fonts.regular, styles.nav_text]}>{label}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        onPress={() => Linking.openURL("https://t.me")}>
                        <Text style={[fonts.regular, styles.footer_text]}>Помощь</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.footer_button}
                        onPress={() => {}}>
                        <Text style={[fonts.regular, styles.footer_text]}>О сервисе</Text>
                    </TouchableOpacity>
                </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    profile_button: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    avatar: {
        width: 50,
        height: 50
    },
    profile_text: {
        color: colors.white,
        fontSize: 20,
        flexGrow: 1
    },
    content: {
        flexGrow: 1
    },
    nav_button: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    first_nav_button: {
        borderTopWidth: 1,
        borderTopColor: colors.line
    },
    nav_text: {
        color: colors.white,
        fontSize: 16
    },
    footer: {
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    footer_button: {
        paddingVertical: 5,
    },
    footer_text: {
        fontSize: 16,
        color: colors.white
    }
});