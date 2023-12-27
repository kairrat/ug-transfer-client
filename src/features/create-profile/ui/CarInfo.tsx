import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "@components/input/Input";
import { Dropdown } from "@components/dropdown/Dropdown";
import { carBrands, carColors } from "../contants";

interface CompProps {
  control: Control<FieldValues, any>;
}

export const CarInfo = ({ control }: CompProps) => {
  return (
    <View>
      <View style={{ gap: 10, marginTop: "10%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Гос. номер"
              error={error}
            />
          )}
          name="publicNumber"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          defaultValue={""}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown
              list={carBrands}
              currentValue={value}
              setCurrentValue={(currentValue) => onChange(currentValue)}
              placeholder="Марка авто"
              error={error}
              zIndex={5001}
            />
          )}
          name="carBrandId"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Модель авто"
              error={error}
            />
          )}
          name="carModel"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown
              list={carColors}
              currentValue={value}
              setCurrentValue={(currentValue) => onChange(currentValue)}
              placeholder="Цвет авто"
              error={error}
              zIndex={5002}
            />
          )}
          name="carColor"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Класс авто"
              error={error}
            />
          )}
          name="carClass"
        />
      </View>
    </View>
  );
};
