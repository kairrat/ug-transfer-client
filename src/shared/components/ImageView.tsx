import { StyleProp, StyleSheet, View } from "react-native";
import FastImage, { ImageStyle, ResizeMode } from "react-native-fast-image";
import { sharedStyles } from "../style/styles";
import { Loader } from "./Loader";
import { useState } from "react";

interface CompProps {
  uri: string;
  auth?: string;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
}

export const ImageView: React.FC<CompProps> = function ImageView(props) {
  const [isLoad, setIsLoad] = useState(false);
  return (
    <>
      <FastImage
        style={[compStyle.image, props.imageStyle]}
        onLoadStart={() => setIsLoad(true)}
        onLoadEnd={() => {
          setIsLoad(false);
        }}
        source={{
          uri: props.uri,
          ...(props.auth ? { headers: { Authorization: props.auth } } : {}),
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode[props.resizeMode || "cover"]}
      />
      {isLoad && (
        <View style={[compStyle.loader, props.imageStyle, sharedStyles.center]}>
          <Loader />
        </View>
      )}
    </>
  );
};

const compStyle = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  loader: {
    position: "absolute",
  },
});
