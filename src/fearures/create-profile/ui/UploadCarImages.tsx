import React from "react";
import { Text, View } from "react-native";
import { UploadImages } from "../../../shared/components/uploadImages/UploadImages";
import { colors, fonts } from "../../../shared/style";

export const UploadCarImages = () => {
  const handleImagesAttached = (formData: FormData) => {
    formData.getParts();
  };

  return (
    <View style={{ alignItems: "center" }}>
      <UploadImages
        onImagesChange={handleImagesAttached}
        names={[
          "firstCarPhoto",
          "secondCarPhoto",
          "thirdCarPhoto",
          "fourthCarPhoto",
        ]}
        maxImages={4}
      />
      <Text
        style={[
          fonts.description,
          { color: colors.white, marginTop: 13, textAlign: "center" },
        ]}
      >
        {"Приложить 4 фото авто с разных сторон"}
      </Text>
    </View>
  );
};
