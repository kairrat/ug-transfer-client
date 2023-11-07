import React from "react";
import { PersonalInfo } from "./PersonalInfo";
import { CarInfo } from "./CarInfo";
import { AvatarChange } from "./AvatarChange";
import { withForm } from "../../../hoc/withForm";
import { ScrollView, Text, View } from "react-native";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { UploadPassport } from "./UploadPassport";
import { colors, fonts } from "../../../shared/style";
import { UploadCarImages } from "./UploadCarImages";
import { UserRole } from "../../../types/role";

interface CompProps {
  control: Control<FieldValues, any>;
  handleSubmit: any;
  onHandleSubmit: (values) => void;
  onImagesAttach: (formData: FormData) => void;
  role: UserRole;
}

const CreateForm = ({
  control,
  role,
  handleSubmit,
  onImagesAttach,
  onHandleSubmit,
}: CompProps) => {
  console.log(role);
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View
          style={{
            backgroundColor: colors.gray,
            borderRadius: 7,
            paddingVertical: 15,
            paddingStart: 19,
            marginTop: 19,
          }}
        >
          <Text style={[fonts.description, { color: colors.secondary }]}>
            {role}
          </Text>
        </View>

        <AvatarChange />
        <UploadPassport />

        <PersonalInfo control={control} />

        {role === UserRole.DRIVER ||
          (role === UserRole.DRIVERCONTROLLER && (
            <>
              <View
                style={{
                  backgroundColor: colors.gray,
                  borderRadius: 7,
                  paddingVertical: 15,
                  paddingStart: 19,
                  marginTop: 19,
                  marginBottom: 60,
                }}
              >
                <Text style={[fonts.description, { color: colors.secondary }]}>
                  {"Ваше авто"}
                </Text>
              </View>
              <UploadCarImages />
              <CarInfo control={control} />
            </>
          ))}
      </ScrollView>

      <PrimaryButton
        containerStyle={{ marginBottom: 40, marginTop: 10 }}
        onPress={() => onHandleSubmit(handleSubmit())}
        text="Далее"
      />
    </>
  );
};

export default withForm(CreateForm);
