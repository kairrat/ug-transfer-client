import React from "react";
import { Image, View } from "react-native";
import { Input } from "@components/input/Input";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
// @ts-ignore
import PhoneRoundedIcon from "@assets/img/phoneRounded.svg";
// @ts-ignore
import ProfileRoundedIcon from "@assets/img/profileRounded.svg";
import { $profile } from "../models/Profile";
import { useStore } from "effector-react";
import { Telegram } from "../../../shared/components/icons/Telegram";

interface CompProps {
  control: Control<FieldValues, any>;
}

export const PersonalInfo = ({ control }: CompProps) => {
  const {
    data: { phone },
  } = useStore($profile);

  return (
    <View style={{ gap: 10 }}>
      <Controller
        control={control}
        defaultValue={phone ?? ""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Номер телефона"
            keyboardType={"phone-pad"}
            leftIcon={<PhoneRoundedIcon />}
            error={error}
          />
        )}
        name="phone"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Фамилия"
            leftIcon={<ProfileRoundedIcon />}
            error={error}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Имя"
            leftIcon={<ProfileRoundedIcon />}
            error={error}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Отчество (если есть)"
            leftIcon={<ProfileRoundedIcon />}
            error={error}
          />
        )}
        name="middleName"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Telegram (если есть)"
            leftIcon={<Telegram />}
            error={error}
          />
        )}
        name="telegram"
      />
    </View>
  );
};
