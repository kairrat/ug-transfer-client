import React from "react";
import { Modal, SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import { Button, ScreenHeader } from "../../../shared/components";
import { colors, fonts } from "../../../shared/style";
// @ts-ignore
import Cross from '@assets/img/cross.svg';
// @ts-ignore
import Logo from '@assets/img/logo.png';
import { IFile } from "../../../types/file";

interface IAdPopup {
    isOpen: boolean;
    closeModal: () => void,
    bannerImg: IFile,
    title: string;
    description: string;
}

export const AdPopup: React.FC<IAdPopup> = ({ isOpen, closeModal, bannerImg, title, description }) => {
    return (
        <Modal 
            visible={isOpen}
            onRequestClose={() => closeModal()}
            animationType="fade"
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <ScreenHeader leftIcon={<Cross />} onLeftButtonPress={closeModal}/>
                <View style={styles.content}>
                    <Image source={Logo} style={styles.logo} />
                    <Image source={{uri: bannerImg?.uri}} style={styles.bannerImage}/>
                    <Text style={[fonts.name, styles.title]}>{title}</Text>
                    <Text style={[fonts.description, styles.description]}>{description}</Text>
                </View>
                <View style={styles.button_holder}>
                    <Button projectType="primary" onPress={closeModal}>
                        <Text style={[fonts.label, styles.button_text]}>Ок</Text>
                    </Button>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    logo: {
        width: 200,
        objectFit: "contain"
    },
    bannerImage: {
        width: '100%',
        height: 200,
    },
    title: {
        width: '100%',
        fontSize: 18,
        color: colors.green,
        textAlign: "left",
        marginTop: 20,
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: colors.white,
        width: '100%',
        textAlign: 'left'
    },
    button_holder: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    button_text: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 16
    }
});