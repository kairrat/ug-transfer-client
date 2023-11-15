import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "@components/input/Input";
import { Dropdown } from "@components/dropdown/Dropdown";
import { carColors } from "../contants";

interface CompProps {
  control: Control<FieldValues, any>;
}

export const CarInfo = ({ control }: CompProps) => {
  return (
    <View>
      <View style={{ gap: 10, marginTop: 30 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Гос. номер"
            />
          )}
          name="publicNumber"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          defaultValue={"65036cc3dda044ecb92c4191"}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Марка авто"
            />
          )}
          name="carBrandId"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Модель авто"
            />
          )}
          name="carModel"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              list={carColors}
              currentValue={value}
              setCurrentValue={(currentValue) => onChange(currentValue)}
              placeholder="Цвет авто"
            />
          )}
          name="carColor"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Класс авто"
            />
          )}
          name="carClass"
        />
      </View>
    </View>
  );
};
