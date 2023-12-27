import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../style";
import { Cross } from "../icons/Cross";
import { Asset } from 'react-native-image-picker';
import { FileHelper } from "../../helper/FileHelper";
// @ts-ignore
import CameraIcon from "@assets/img/camera.svg";


interface CompProps {
  maxImages: number;
  names: string[];
  images: File[];
  setImages: any; // Type of setState
}

export const ImagePicker = ({
  maxImages,
  names,
  images,
  setImages
}: CompProps) => {

  const handleUploadPassport = async () => {
    try {
      const res: Asset[] | false = await FileHelper.pickFile({limit: maxImages});
      if (res && res.length) {
        setImages(res.map((asset: Asset, index: number) => ({ uri: asset.uri, name: asset.fileName || names[index], type: 'image/jpg'})));
      }
    } catch (err) {
      console.error('Error launching image library:', err);
    }
  };

  const handleRemoveIcon = (index: number) => {
      setImages((prev: File[]) => prev.filter((_, i: number) => index !== i));
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        gap: 25,
        padding: 20,
      }}
    >
      <TouchableOpacity
        style={{
          paddingVertical: 30,
          paddingHorizontal: 25,
          borderRadius: 13,
          borderWidth: 1.5,
          borderColor: colors.white,
          alignSelf: "flex-start",
        }}
        onPress={handleUploadPassport}
      >
        <CameraIcon />
      </TouchableOpacity>

      {images?.map(({ uri }, index) => (
        <View key={uri}>
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 1,
              top: -12,
              right: -8,
            }}
            onPress={() => handleRemoveIcon(index)}
          >
            <Cross />
          </TouchableOpacity>
          <Image
            source={{ uri }}
            height={95}
            width={95}
            borderRadius={13}
          />
        </View>
      ))}
    </ScrollView>
  );
};
