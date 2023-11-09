import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../style/colors";
import { Paragraph } from "../Paragraph";

interface CompProps {
  value: string;
  widthTabProc: number;
  activeTab: string;
  onChangeTab: (value: string) => void;
}

export const TabMenuItem: React.FC<CompProps> = function TabMenuItem(props) {
  const isActive = props.activeTab === props.value;

  return (
    <TouchableOpacity
      style={[
        compStyles.container,
        { width: `${props.widthTabProc}%` },
        isActive && compStyles.activeTab,
      ]}
      onPress={() => props.onChangeTab(props.value)}
    >
      <Paragraph
        align={"center"}
        style={[compStyles.text, isActive && compStyles.activeText]}
      >
        {props.value}
      </Paragraph>
    </TouchableOpacity>
  );
};

const compStyles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparent,
  },
  activeTab: {
    borderBottomColor: colors.black,
  },
  text: {
    color: "gray",
  },
  activeText: {
    color: colors.black,
  },
});
