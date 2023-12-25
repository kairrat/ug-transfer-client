import React, { useState } from "react";
import { Keyboard, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BaggageIcon, CrossIcon, UserIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import Checkbox from '@react-native-community/checkbox';


interface IDetailsProps {
    defaultBaggage: string;
    defaultPassangersAmount: string;
    defaultOptions: {
        babyChair: boolean,
        buster: boolean,
        animalTransfer: boolean
    },
    defaultComment: string;
    onClose: () => void;
    onApply: (details: any) => void;
};

export const Details: React.FC<IDetailsProps> = ({
    defaultBaggage,
    defaultPassangersAmount,
    defaultOptions,
    defaultComment,
    onClose,
    onApply
}) => {
    const [baggage, setBaggage] = useState<string>(defaultBaggage);
    const [passangersAmount, setPassangersAmount] = useState<string>(defaultPassangersAmount);
    const [options, setOptions] = useState<IDetailsProps['defaultOptions']>(defaultOptions);
    const [comment, setComment] = useState<string>(defaultComment);

    const handleApplyChanges = () => {
        onApply({
            baggage,
            passangersAmount,
            options,
            comment
        });
    }

    return(
        <SafeAreaView style={styles.layout}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.close_holder}
                    onPress={onClose}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>Дополнительно</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.body}>
                        <Input 
                            placeholder="Багаж" 
                            value={baggage}
                            onChange={setBaggage}
                            keyboardType="numeric"
                            leftIcon={<BaggageIcon />}/>
                        <Input 
                            placeholder="Количество человек" 
                            value={passangersAmount}
                            onChange={setPassangersAmount}
                            keyboardType="numeric"
                            leftIcon={<UserIcon />}/>
                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setOptions(prev => ({...prev, babyChair: !prev.babyChair}))}>
                                <Checkbox
                                    value={options.babyChair}   
                                    onValueChange={() => Platform.OS !== "ios" && setOptions(prev => ({...prev, babyChair: !prev.babyChair}))}
                                    tintColor={colors.primary}
                                    boxType="square"
                                    tintColors={{ true: colors.primary, false: colors.primary }}
                                    onCheckColor={colors.primary}
                                    onTintColor={colors.primary}/>
                                <Text style={styles.option_text}>Детское кресло</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setOptions(prev => ({...prev, buster: !prev.buster}))}>
                                <Checkbox
                                    value={options.buster}
                                    tintColors={{ true: colors.primary, false: colors.primary }}
                                    tintColor={colors.primary}
                                    boxType="square"
                                    onValueChange={(e) => Platform.OS !== "ios" && setOptions(prev => ({...prev, buster: !prev.buster}))}
                                    onCheckColor={colors.primary}
                                    onTintColor={colors.primary}/>
                                <Text style={styles.option_text}>Бустер</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.option_holder}>
                            <TouchableOpacity style={styles.option_button} onPress={(e) => setOptions(prev => ({...prev, animalTransfer: !prev.animalTransfer}))}>
                                <Checkbox
                                    value={options.animalTransfer}
                                    onValueChange={() => Platform.OS !== "ios" && setOptions(prev => ({...prev, animalTransfer: !prev.animalTransfer}))}
                                    boxType="square"
                                    tintColors={{ true: colors.primary, false: colors.primary }}
                                    tintColor={colors.primary}
                                    onCheckColor={colors.primary}
                                    onTintColor={colors.primary}/>
                                <Text style={styles.option_text}>Перевозка животных</Text>
                            </TouchableOpacity>
                        </View>
                        <Input 
                            placeholder="Пожелания к заказу"
                            value={comment} 
                            onChange={setComment} 
                            textAlignVertical="top"
                            multiline 
                            numberOfLines={3}/>
                    </View>
                    <View style={styles.button_holder}>
                        <Button onPress={handleApplyChanges} projectType="primary">
                            <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        position: 'relative',
        paddingVertical: 15
    },
    close_holder: {
        position: 'absolute',
        left: 15,
        top: 12,
        padding: 8,
        borderRadius: 12,
        backgroundColor: colors.opacity,
        zIndex: 10

    },
    header_title: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    body: {
        paddingVertical: 20,
        flexDirection: 'column',
        rowGap: 10
    },
    option_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
    },
    option_button: {
        flexDirection: 'row', 
        alignItems: 'center',
        columnGap: Platform.OS === "ios" ? 10 : 0
    },
    option_text: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.white
    },
    button_holder: {
        marginVertical: 20
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});