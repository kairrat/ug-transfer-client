import React, { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

// @ts-ignore
import ProfileIcon from "@assets/img/profile.svg";
// @ts-ignore
import EditIcon from "@assets/img/edit.svg";

import { openPicker } from "@baronha/react-native-multiple-image-picker";
import { colors } from "@styles";

export const AvatarChange = () => {
  const [image, setImage] = useState("");

  const handleProfileClick = async () => {
    const response = (await openPicker({})) as any;

    const path =
      Platform.OS === "ios"
        ? response.path
        : response.path.replace("file://", "");
    setImage(path);
  };

  return (
    <View style={{ alignItems: "center", marginTop: 35 }}>
      {image !== "" ? (
        <Image
          source={{ uri: image }}
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
