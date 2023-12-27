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
import { IFile } from "../../../types/file";

interface CompProps {
  control: Control<FieldValues, any>;
  handleSubmit: any;
  onHandleSubmit: (value: any) => void;
  role: UserRole;
  avatar: IFile;
  passport: IFile[];
  carImages: IFile[];
  setAvatar: any;
  setPassport: any;
  setCarImages: any;
}

const CreateForm = ({
  control,
  role,
  onHandleSubmit,
  handleSubmit,
  avatar,
  setAvatar,
  passport,
  setPassport,
  carImages,
  setCarImages
}: CompProps) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingTop: "auto",
          paddingBottom: "auto",
          paddingHorizontal: "5%",
        }}
      >
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

        <AvatarChange image={avatar} setImage={setAvatar} />
        <UploadPassport passport={passport} setPassport={setPassport}/>
        <PersonalInfo control={control} />
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
          <UploadCarImages carImages={carImages} setCarImages={setCarImages} />
          <CarInfo control={control} />
        </>
      </ScrollView>
      <View style={{ paddingHorizontal: "5%" }}>
        <PrimaryButton
          containerStyle={{ marginBottom: 40, marginTop: 10 }}
          onPress={handleSubmit(onHandleSubmit)}  
          text="Далее"
        />
      </View>
    </>
  );
};

export default CreateForm;
