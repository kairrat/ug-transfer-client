import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import { StackScreens } from '../../../routes/types/StackScreens';
import { Button, ScreenHeader } from '../../../shared/components';
import { colors, fonts } from '../../../shared/style';
// @ts-ignore
import LeftArrow from '@assets/img/arrowLeft.svg';
import { IFile } from '../../../types/file';
import { BannerImage } from '../../../features/ad';
import { Input } from '../../../shared/components/input/Input';
// @ts-ignore
import AdIcon from '@assets/img/ad-icon.svg'
import { Datepicker } from '../../../shared/components/datepicker/Datepicker';
import { Controller, useForm } from 'react-hook-form';
import { AdPopup } from './AdPopup';

type IAdBannersProps = NativeStackScreenProps<StackScreens, "AdBanners">;
interface IModalData {
    title: string;
    description: string;
    bannerImg: IFile;
}

export const AdBanners: React.FC<IAdBannersProps> = ({ navigation }) => {
    const [ bannerImg, setBannerImg ] = useState<IFile>(null);
    const [ error, setError ] = useState<string>('Заполните все поля');
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ modalData, setModalData ] = useState<IModalData>(null);

    const handleSubmitAd = (form) => {
        if (form) {
            setModalData({ title: form.title, description: form.description, bannerImg: bannerImg });
            setIsModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        navigation.navigate("Orders");
        setIsModalOpen(false);
    }

    return (
        <SafeAreaView style={styles.layout}>
            <ScreenHeader 
                title="Рекламный баннер" 
                leftIcon={<LeftArrow />} 
                onLeftButtonPress={() => navigation.navigate("Orders")}
                textStyle={{ color: colors.green }}/>
            {
                (isModalOpen && modalData) &&
                <AdPopup 
                    isOpen={isModalOpen} 
                    closeModal={handleCloseModal} 
                    title={modalData.title} 
                    description={modalData.description} 
                    bannerImg={modalData.bannerImg}/>
            }
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <BannerImage bannerImg={bannerImg} setBannerImg={setBannerImg}/>
                <View style={styles.content}>
                    <Controller 
                        control={control}
                        name="title"
                        rules={{ required: true }}
                        render={({ field: {value, onChange}, fieldState: { error }}) => (
                            <Input 
                                placeholder="Заголовок"
                                leftIcon={<AdIcon />}
                                value={value} 
                                onChangeText={onChange}
                                error={error}/>  
                    )}/>
                    <Controller 
                        control={control}
                        name="description"
                        rules={{ required: true }}
                        render={({ field: {value, onChange}, fieldState: { error }}) => (
                            <Input 
                                placeholder="Рекламный текст"
                                value={value}
                                onChangeText={onChange}
                                numberOfLines={10}
                                inputStyle={{ textAlignVertical: 'top' }}
                                containerStyle={{ marginVertical: 15 }}
                                error={error}
                                multiline/>
                    )}/>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[fonts.label, styles.label]}>Реклама действует</Text>
                        <View style={styles.ad_duration_holder}>
                            <Text style={[fonts.label, styles.date_text]}>с</Text>
                            <Controller 
                                control={control}
                                name="startAd"
                                rules={{ required: true }}
                                render={({ field: {value, onChange}, fieldState: { error }}) => (
                                    <Datepicker 
                                        calendarIcon={false}
                                        placeholder="DD.MM.YY" 
                                        value={value} 
                                        projectType="ad_banner"
                                        onChangeDate={onChange}
                                        error={error}/>
                            )}/>
                            <Text style={[fonts.label, styles.date_text]}>по</Text>
                            <Controller 
                                control={control}
                                name="endAd"
                                rules={{ required: true }}
                                render={({ field: {value, onChange}, fieldState: { error }}) => (
                                    <Datepicker 
                                        calendarIcon={false}
                                        placeholder="DD.MM.YY" 
                                        value={value} 
                                        projectType="ad_banner"
                                        onChangeDate={onChange}
                                        error={error}/>
                            )}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.button_holder}>
                {errors.description && <Text style={[fonts.info, styles.error_message]}>{error}</Text>}
                <Button onPress={handleSubmit(handleSubmitAd)} projectType="primary">
                    <Text style={[fonts.label, styles.button_text]}>Опубликовать</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles  = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    description_holder: {
        width: '100%',
        position: 'relative'
    },
    label: {
        color: colors.green,
        fontSize: 16
    },
    ad_duration_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginVertical: 5
    },
    date_text: {
        fontSize: 16,
        color: colors.opacity
    },
    button_holder: {
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    error_message: {
        color: colors.error,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15
    },
    button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16
    }
});