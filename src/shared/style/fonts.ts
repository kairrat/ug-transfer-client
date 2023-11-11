import { StyleSheet } from "react-native";
import { fontScale } from "../../helpers/scale";

export const fonts = StyleSheet.create({
  title: {
    fontSize: fontScale(22),
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
  name: {
    fontSize: fontScale(20),
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
  },
  label: {
    fontSize: fontScale(15),
    fontWeight: "500",
    fontFamily: "Montserrat-Medium",
  },
  timer: {
    fontSize: fontScale(16),
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
  description: {
    fontSize: fontScale(12),
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
  info: {
    fontSize: fontScale(12),
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
  text: {
    fontSize: fontScale(12),
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
  },
  text_semiBold: {
    fontSize: fontScale(16),
    fontWeight: "500",
    fontFamily: "Montserrat-Medium",
  },
  text_Bold: {
    fontSize: fontScale(16),
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
  },
});
