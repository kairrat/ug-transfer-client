import React from "react";
import { Text, View } from "react-native";
import SettingsIcon from "@assets/img/settings.svg";
import { colors, fonts } from "@styles";
import EditIcon from '@assets/img/edit.svg';
import Svg from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

const FilterButton = ({onPress}) => {
  return (
    <TouchableOpacity 
      style={{ borderWidth: 1, borderColor: colors.stroke, borderRadius: 7, padding: 10, flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center' }}
      onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ marginRight: 17 }}>
            <SettingsIcon />
          </View>
          <Text style={{ color: colors.primary, fontSize:  16 }}>Подобрать маршрут</Text>
        </View>
        <View style={{ transform: [{scale: 1.5}], marginHorizontal: 5, borderColor: colors.primary }}>
            <EditIcon/>
        </View>
    </TouchableOpacity>
  );
};

export default FilterButton;
