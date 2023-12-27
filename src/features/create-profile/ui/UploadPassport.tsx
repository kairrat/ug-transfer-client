import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "../../../shared/style";
import { ImagePicker } from "../../../shared/components/uploadImages/ImagePicker";

export const UploadPassport = ({passport, setPassport}) => {
  const handlePassportImagesAttach = (formData: FormData) => {};
  return (
    <View style={{ alignItems: "center", marginBottom: 28, flex: 1 }}>
      <ImagePicker
        names={["frontPassport", "backPassport"]}
        images={passport}
        setImages={setPassport}
        maxImages={2}
      />
      <Text
        style={[
          fonts.description,
          { color: colors.white, marginTop: 13, textAlign: "center" },
        ]}
      >
        {"Загрузите фото вашего пасспорта,\n 1я и 2я страницы"}
      </Text>
    </View>
  );
};
