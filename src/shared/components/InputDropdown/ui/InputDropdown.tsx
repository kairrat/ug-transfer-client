import { FC, memo, useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { colors } from "src/shared/style";

type InputDropdownProps = {
    placeholder?: string;
    value: string;
    setValue: (text: string) => void;
    projectType?: string;
    leftIcon?: any;
    debaunceCb: () => Promise<any[]>;
}

export const InputDropdown: FC<InputDropdownProps> = memo(({
    placeholder = "",
    value,
    setValue,
    projectType = "default",
    leftIcon,
    debaunceCb
}) => {
    const [droplist, setDroplist] = useState<Partial<any[]>>([{label: "Москва", value: "москва"}, {label: "Санкт-Петербург", value: "санкт-петербург"}]);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const handleSelectItem = (item) => {
        setValue(item.label);
        setDroplist([]);
    }
    const handleSetInputFocus = () => {
        setInputFocus(true);
    }
    const handleSetInputBlur = () => {
        setInputFocus(false);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            debaunceCb().then(res => setDroplist(res));
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, [value]);

    return(
        <View style={{ position: 'relative' }}>
            <View style={[styles.input_holder, styles[`${projectType}_container`]]}>
                {leftIcon}
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    style = {styles[`${projectType}_input`]}
                    onChangeText={setValue}
                    onFocus={handleSetInputFocus}
                    onBlur={handleSetInputBlur}
                    placeholderTextColor={colors.white}
                />
            </View>
            {
                (droplist.length > 0 && inputFocus) &&
                <FlatList
                    contentContainerStyle={styles.dropdown_container}
                    style={styles.flatlist}
                    data={droplist}
                    renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{ marginVertical: 5 }}
                        onPress={() => handleSelectItem(item)}>
                        <Text style={styles[`${projectType}_text`]}>
                            {item?.label || ''}
                        </Text>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(_, index) => `${index}`}
                />
            }
        </View>
    )
});

const styles = StyleSheet.create({
    input_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    default_container: {
        backgroundColor: colors.field,
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
    },
    default_input: {
        paddingHorizontal: 20,
        flexGrow: 1,
        color: colors.white
    },
    flatlist: {
        position: 'absolute',
        width: '100%',
        bottom: -80,
        left: 0,
        backgroundColor: colors.field,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        zIndex: 9000,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.stroke,
    },
    dropdown_container: {
        
    },
    default_text: {
        color: colors.white
    }
});