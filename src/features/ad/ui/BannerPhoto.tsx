import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { colors, fonts } from "../../../shared/style";
import { IFile } from "../../../types/file";
// @ts-ignore
import CameraIcon from "@assets/img/camera.svg";
import { FileHelper } from "../../../shared/helper/FileHelper";
import { Asset } from "react-native-image-picker";

interface IBannerImageProps {
    bannerImg: IFile,
    setBannerImg: (photo: IFile) => void
};

export const BannerImage: React.FC<IBannerImageProps> = ({ bannerImg, setBannerImg }) => {
    const handlePickImage = async () => {
        const res: Asset[] | false = await FileHelper.pickFile({ limit: 1 });
        if (res && res.length > 0) {
            setBannerImg({ uri: res[0].uri, name: res[0].fileName || 'banner', type: res[0].type || 'image/jpg'});
        }
    }
    return(
        <View style={styles.container}>
            {
                bannerImg
                ?
                <Image source={bannerImg} style={styles.image}/>
                :
                <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                    <View />
                    <CameraIcon />
                    <Text style={[fonts.info, styles.button_text]}>Нажмите, чтобы загрузить баннер</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    button: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: colors.stroke,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    button_text: {
        color: colors.opacity,
        fontSize: 16
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    }
});