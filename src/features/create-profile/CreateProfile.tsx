import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import { StackScreens } from "../../routes/types/StackScreens";
import { colors, fonts } from "../../shared/style";
import { HeaderWithSteps } from "@components/header/HeaderWithSteps";
import { SafeAreaView } from "react-native";
import CreateForm from "./ui/CreateForm";
import { addData, getProfile, uploadProfileImages } from "./models/profile-actions";
import { useNavigation } from "@react-navigation/native";
import { setProfileData } from "./models/Profile";
import { useEvent } from "effector-react";
import { Profile } from "../../types/profile";
import { useForm } from "react-hook-form";
import { RegComplete } from "../../screens/init/init-response";
import { fileService, FileService } from "../files/api/file-service";
import { UserRole } from "../../types/role";

type CompProps = NativeStackScreenProps<StackScreens, "CreateProfile">;

export const CreateProfileScreen: React.FC<CompProps> =
  function CreateProfileScreen({ route, navigation }) {
    const role: UserRole = route.params.type;

    const { control, handleSubmit: handleValidateForm } = useForm();
    const [ avatar, setAvatar ] = useState<File>(null);
    const [ passport, setPassport ] = useState<File[]>([]);
    const [ carImages, setCarImages ] = useState<File[]>([]);

    const handleUpdateProfile = useEvent(setProfileData);

    const handleUploadAvatar =  async (): Promise<string> => {
      try {
        const formData: FormData = new FormData();
        formData.append('avatar', avatar);
        const data = await fileService.uploadFiles(formData);
        return data['avatar'];
      } catch (err) {
        console.error('Failed to upload avatar', err);
        throw err;
      }
    }

    const handleUploadCarImages = async (): Promise<string[]> => {
      const carImageNames: string[] = ['firstCarImg','secondCarImg','thirdCarImg','fourthCarImg'];
      const carImageLinks: string[] = [];
      try {
        for(let i: number = 0; i < 4; i++) {
          const key: string = carImageNames[i];
          const formData: FormData = new FormData();
          formData.append(key, carImages[i]);
          const data = await fileService.uploadFiles(formData);
          carImageLinks.push(data[key]);
        }
        return carImageLinks;
      } catch (err) {
        console.error('Failed to upload car images', err);
        throw err;
      }
    }

    const handleUploadPassport = async (): Promise<string[]> => {
      try {
        const passportImageNames: string[] = ['frontPassport', 'backPassport'];
        const passportImageLinks: string[] = [];
        for(let i: number = 0; i < passport.length; i++) {
          const key: string = passportImageNames[i];
          const formData: FormData = new FormData();
          formData.append(key, passport[i]);
          const data = await fileService.uploadFiles(formData);
          passportImageLinks.push(data[key]);
        }
        return passportImageLinks;
      } catch (err) {
        console.error('Failed to upload passport images', err);
        throw err;
      }
    }

    const hanldeFormSubmit = async (form: Profile) => {
      try {
        if (!avatar || carImages.length < 4 || passport.length < 2) {
          return;
        }
        form.avatar = await handleUploadAvatar();
        form.carPhotoArray = await handleUploadCarImages();
        form.passportArray = await handleUploadPassport();

        const res = await addData(form);
        if (res.status === "success") {
          const profile: Profile = await getProfile();
          handleUpdateProfile(profile);
          navigation.navigate("CreateProfileComplete");
        }
      } catch (err) {
        console.error(err);
      }
    };    

    const handleBackPress = () => {
      navigation.goBack();
    };

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <HeaderWithSteps
          step={2}
          limit={2}
          title={"Данные"}
          containerStyle={{ marginVertical: 20 }}
          onPressBack={handleBackPress}
        />

        <CreateForm 
          role={role} 
          onHandleSubmit={hanldeFormSubmit} 
          control={control} 
          handleSubmit={handleValidateForm} 
          avatar={avatar}
          setAvatar={setAvatar}
          passport={passport}
          setPassport={setPassport}
          carImages={carImages}
          setCarImages={setCarImages}/>
      </SafeAreaView>
    );
  };
