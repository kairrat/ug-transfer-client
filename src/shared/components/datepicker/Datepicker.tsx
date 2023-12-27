import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../../style";
// @ts-ignore
import Calendar from '@assets/img/calendar.svg';
import DateTimePicker from '@react-native-community/datetimepicker';

type DatepickerProps = {
    value: Date | null,
    onChangeDate: (newValue: Date) => void,
    placeholder: string,
    projectType?: string,
    calendarIcon?: boolean;
    error?: any;
}

export const Datepicker: React.FC<DatepickerProps> = ({value, onChangeDate, placeholder, projectType = "default", calendarIcon=true, error}) => {
    const [date, setDate] = useState(value || new Date());
    const [show, setShow] = useState<boolean>(false);
    const [text, setText] = useState<string>(placeholder);
    const handlePressButton = () => {
        setShow(true);
    }
    const handleChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        onChangeDate(currentDate);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let day = tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : `${tempDate.getDate()}`;
        let month = (tempDate.getMonth() + 1) < 10 ? `0${tempDate.getMonth() + 1}` : tempDate.getMonth() + 1;
        let fDate = day + '/' + month + '/' + tempDate.getFullYear();
        setText(fDate);
    }
    useEffect(() => {
        if (value === null) {
            setText(placeholder);
            setDate(new Date());
        }
    }, [value])
    return (
        <>
            <TouchableOpacity 
                style={[styles[`${projectType}_holder`], {borderColor: error ? colors.error : styles[`${projectType}_holder`]['borderColor']}]}
                onPress={handlePressButton}
            >
                {
                    calendarIcon &&
                    <Calendar />
                }
                <Text
                    style={styles[`${projectType}_placeholder`]}>{text}</Text>
            </TouchableOpacity>
            {
                show && 
                <DateTimePicker 
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChangeDate}/>
            }
        </>
    )
};

const styles = StyleSheet.create({
    default_holder: {
        backgroundColor: colors.gray,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: colors.stroke,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        minWidth: 160,
    },
    default_placeholder: {
        color: colors.opacity
    },
    ad_banner_holder: {
        backgroundColor: colors.gray,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: colors.stroke,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        minWidth: 120,
    },
    ad_banner_placeholder: {
        color: colors.opacity
    }
});