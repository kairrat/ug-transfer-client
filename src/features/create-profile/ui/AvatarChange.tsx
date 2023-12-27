import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@styles";
import { FileHelper } from "../../../shared/helper/FileHelper";
// @ts-ignore
import ProfileIcon from "@assets/img/profile.svg";
// @ts-ignore
import EditIcon from "@assets/img/edit.svg";

interface IAvatarChange {
  image: any,
  setImage: any
}

export const AvatarChange: React.FC<IAvatarChange>  = ({ image="", setImage }) => {
  const handleProfileClick = async () => {
    const res = await FileHelper.pickFile({ limit: 1 });
    setImage({ uri: res[0].uri, type: 'image/jpg', name: 'avatar' });
  };

  return (
    <View style={{ alignItems: "center", marginTop: 35 }}>
      {image ? (
        <Image
          source={{ uri: image.uri }}
          height={100}
          width={100}
          borderRadius={50}
        />
      ) : (
        <ProfileIcon width={100} height={100} />
      )}

      <TouchableOpacity
        style={{
          width: 20,
          height: 20,
          backgroundColor: colors.secondary,
          bottom: 23,
          left: 23,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
        onPress={handleProfileClick}
      >
        {image !== "" ? (
          <EditIcon />
        ) : (
          <Text
            style={{
              color: "white",
              fontSize: 22,
              position: "relative",
              top: -4,
              fontWeight: "600",
            }}
          >
            +
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
