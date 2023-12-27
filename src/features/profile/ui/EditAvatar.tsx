import { FC } from "react";
import { TouchableOpacity } from "react-native";
// @ts-ignore
import EditIcon from "@assets/img/edit.svg";
import { colors } from "src/shared/style";
import { Asset } from "react-native-image-picker";
import { FileHelper } from "src/shared/helper/FileHelper";

type EditAvatarProps = {
    avatar: string | File | null | undefined;
    onAvatarChange?: (data: File) => void;
}

export const EditAvatar: FC<EditAvatarProps> = ({onAvatarChange}) => {
    const handlePickAvatar = async () => {
        try {
            const res: Asset[] | false = await FileHelper.pickFile({limit: 1});
            if (res && res.length) {
                onAvatarChange({ uri: res[0].uri, name: res[0].fileName || 'avatar', type: res[0].type || 'image/jpg'});
            }
        } catch (err) {
            console.error('Failed to select avatar', err);
        }
    }
    return(
        <TouchableOpacity 
            onPress={handlePickAvatar}
            style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                zIndex: 10,
                backgroundColor: colors.green,
                paddingTop: 4,
                paddingLeft: 5,
                paddingBottom: 5,
                paddingRight: 4,
                borderRadius: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <EditIcon />
        </TouchableOpacity>
    );
};