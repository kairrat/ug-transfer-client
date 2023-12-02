import React from "react";
import { View } from "react-native";
import { Input } from "@components/input/Input";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import PhoneRoundedIcon from "@assets/img/phoneRounded.svg";
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
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Номер телефона"
            keyboardType={"phone-pad"}
            leftIcon={<PhoneRoundedIcon />}
          />
        )}
        name="phone"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Фамилия"
            leftIcon={<ProfileRoundedIcon />}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Имя"
            leftIcon={<ProfileRoundedIcon />}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Отчество (если есть)"
            leftIcon={<ProfileRoundedIcon />}
          />
        )}
        name="middleName"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Telegram (если есть)"
            leftIcon={<Telegram />}
          />
        )}
        name="telegram"
      />
    </View>
  );
};
