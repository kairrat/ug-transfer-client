import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ProfileForm } from "src/features/profile/ui/ProfileForm";
import { StackScreens } from "src/routes";
import { ScreenHeader } from "src/shared/components/ScreenHeader";
import { CrossIcon } from "src/shared/img";
import { colors } from "src/shared/style";

type IProfileProps = NativeStackScreenProps<StackScreens, "Profile">;

export const Profile: FC<IProfileProps> = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.layout}>
            <ScreenHeader 
                leftIcon={<CrossIcon />} 
                onLeftIconPress={() => navigation.navigate("Main")}
                leftIconStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                title="Профиль"/>
            <ProfileForm navigateToAuth={() => navigation.navigate("Auth")}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    }
});