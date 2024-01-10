import { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "src/shared/components/Button";
import { colors, fonts } from "src/shared/style";
// import { colors, fonts } from "src/shared/styles";

interface IPrivacyPolicy {
    type?: 'confirm' | 'read';
    onConfirm?: () => void;
    onBack: () => void;
}

export const PrivacyPolicy: FC<IPrivacyPolicy> = ({
    type = 'read',
    onConfirm,
    onBack
}) => {
    console.log('Privacy')
    return(
        <SafeAreaView style={styles.layout}>
            <Text style={[fonts.bold, styles.title]}>Политика конфиденциальности</Text>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[fonts.light, styles.description]}>
                Lorem ipsum dolor sit amet consectetur. Ut suspendisse diam ac mus sed tincidunt purus. Malesuada lobortis mattis arcu scelerisque neque sed. Ut venenatis amet curabitur amet. Ac eu faucibus ut pulvinar elementum ligula maecenas etiam. Fermentum et sed non amet etiam faucibus aliquet. Ullamcorper tellus amet turpis aliquam posuere fringilla a commodo eros. Euismod aliquam lorem diam at porttitor turpis ante. Mattis id aliquam at arcu sit eget et massa. Adipiscing diam malesuada neque quam egestas velit praesent sed arcu. Leo vel fusce phasellus felis luctus.
Enim ut sapien phasellus eget tempus eget in orci. Velit est pellentesque eleifend in ultricies tortor bibendum fringilla rutrum. Mi purus mi volutpat egestas. Ornare scelerisque at fringilla at enim leo sed mi. In blandit ultrices senectus quam semper curabitur purus lacus. Diam dolor tempus adipiscing leo pulvinar. Tincidunt eget risus egestas adipiscing in cursus dui nunc etiam. Aliquam nisi elementum amet ut aliquam odio diam massa. Mauris faucibus eleifend urna odio. Ac id egestas turpis ut nulla commodo vestibulum scelerisque. 
                Lorem ipsum dolor sit amet consectetur. Ut suspendisse diam ac mus sed tincidunt purus. Malesuada lobortis mattis arcu scelerisque neque sed. Ut venenatis amet curabitur amet. Ac eu faucibus ut pulvinar elementum ligula maecenas etiam. Fermentum et sed non amet etiam faucibus aliquet. Ullamcorper tellus amet turpis aliquam posuere fringilla a commodo eros. Euismod aliquam lorem diam at porttitor turpis ante. Mattis id aliquam at arcu sit eget et massa. Adipiscing diam malesuada neque quam egestas velit praesent sed arcu. Leo vel fusce phasellus felis luctus.
Enim ut sapien phasellus eget tempus eget in orci. Velit est pellentesque eleifend in ultricies tortor bibendum fringilla rutrum. Mi purus mi volutpat egestas. Ornare scelerisque at fringilla at enim leo sed mi. In blandit ultrices senectus quam semper curabitur purus lacus. Diam dolor tempus adipiscing leo pulvinar. Tincidunt eget risus egestas adipiscing in cursus dui nunc etiam. Aliquam nisi elementum amet ut aliquam odio diam massa. Mauris faucibus eleifend urna odio. Ac id egestas turpis ut nulla commodo vestibulum scelerisque. 
                </Text>
            </ScrollView>
            <View style={styles.buttons_holder}>
                <Button projectType="secondary" onPress={onBack}>
                    <Text style={[fonts.regular, styles.secondary_button_text]}>Назад</Text>
                </Button>
                {
                    (type === "confirm" && onConfirm) &&
                    <Button projectType="primary" onPress={onConfirm}>
                        <Text style={[fonts.regular, styles.primary_button_text]}>Соглашаюсь</Text>
                    </Button>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 40
    },
    content: {
        paddingHorizontal: 20,
        flexGrow: 1
    },
    title: {
        fontSize: 16,
        color: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    description: {
        fontSize: 16,
        color: colors.white,
        lineHeight: 22
    },
    buttons_holder: {
        flexDirection: 'column',
        rowGap: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.line
    },
    secondary_button_text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white
    },
    primary_button_text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.black
    }
});