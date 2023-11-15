import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraIcon from "@assets/img/camera.svg";
import { colors, fonts } from "../../style";
import { openPicker } from "@baronha/react-native-multiple-image-picker";
import { Cross } from "../icons/Cross";

interface CompProps {
  maxImages: number;
  names: string[];
  onImagesChange: (formData: FormData) => void;
}

export const UploadImages = ({
  maxImages,
  names,
  onImagesChange,
}: CompProps) => {
  const [passportImages, setPassportImages] = useState([]);

  const handleUploadPassport = async () => {
    let response = await openPicker({ maxSelectedAssets: maxImages });

    if (Platform.OS === "ios") {
      response = response.map((image) => ({
        ...image,
        path: image.path.replace("file://", ""),
      }));
    }
    const data = new FormData();

    response.forEach(({ path }, index) => {
      data.append(names[index], {
        name: "image",
        type: "image/png",
        uri: path,
      });
    });

    onImagesChange(data);

    setPassportImages(response);
  };

  const handleRemoveIcon = (index: number) => {
    const images = [...passportImages];

    images.splice(index, 1);

    setPassportImages(images);
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

      {passportImages.map(({ path }, index) => (
        <View key={path}>
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
            source={{ uri: path }}
            height={95}
            width={95}
            borderRadius={13}
          />
        </View>
      ))}
    </ScrollView>
  );
};
