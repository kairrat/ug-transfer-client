import React from "react"
import { Image, StyleSheet, Text, View, ScrollView } from "react-native"
import { colors, fonts } from "../../../style";

interface IProfilePhotoBlockProps {
    data: string[];
    title: string;
}

export const ProfilePhotoBlock: React.FC<IProfilePhotoBlockProps> = ({ data = [], title="" }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[fonts.description, styles.title]}>{title}</Text>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.img_list}>
                {
                    data && data.map((uri: string, i: number) => (
                        <Image key={i} source={{uri}} style={styles.img}/>
                    ))
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 20
    },
    header: {
        backgroundColor: colors.gray,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 7
    },
    title: {
        color: colors.green,
        fontSize: 16
    },
    img_list: {
        columnGap: 12,
        marginVertical: 15,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 12,
    }
});