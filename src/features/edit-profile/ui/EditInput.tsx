import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "../../../shared/components/input/Input";
import { colors } from "../../../shared/style";

type EditInputProps = {
    value: string;
    setValue: (value: string) => void;
    leftIcon?: any,
    placeholder?: string;
};

export const EditInput: React.FC<EditInputProps> = ({ value, setValue, leftIcon=null, placeholder="" }) => {
    const handleTextChange = (text: string) => {
        setValue(text);
    }
    return(
        <View style={styles.holder}>
            <Input 
                placeholder={placeholder}
                value={value} 
                onChangeText={handleTextChange}
                leftIcon={leftIcon}/>
        </View>
    )
};

const styles = StyleSheet.create({
    holder: {
        paddingHorizontal: 20
    },
    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 7
    }
});