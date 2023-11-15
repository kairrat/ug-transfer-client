import { Dimensions, PixelRatio } from "react-native";

const baseWidth = 300;
const { width, height } = Dimensions.get("window");

export const scale = (size) => (width / baseWidth) * size;
export const fontScale = (size) => {
  const ratio = size / baseWidth;
  const newSize = width * ratio;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
