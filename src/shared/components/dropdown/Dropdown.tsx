import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, fonts } from "@styles";

interface CopmProps {
  list: any[];
  currentValue: any;
  placeholder: string;
  setCurrentValue: (value: any) => void;
}

export const Dropdown = ({
  currentValue,
  placeholder,
  list,
  setCurrentValue,
}: CopmProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(list);

  return (
    <DropDownPicker
      dropDownContainerStyle={{
        backgroundColor: colors.field,
        borderWidth: 0,
      }}
      style={{
        borderRadius: 7,
        backgroundColor: colors.field,
        borderWidth: open ? 0 : 1,
        paddingStart: 16,
        borderColor: open ? colors.field : colors.stroke,
      }}
      arrowIconStyle={{
        width: 24,
        height: 24,
        borderColor: colors.white,
      }}
      listItemLabelStyle={{ paddingStart: 5 }}
      tickIconStyle={{
        width: 0,
        height: 0,
      }}
      textStyle={[fonts.text, { color: colors.white }]}
      open={open}
      value={currentValue}
      items={items}
      setValue={() => {
        return;
      }}
      onSelectItem={({ value }) => {
        setCurrentValue(value);
      }}
      setOpen={setOpen}
      setItems={setItems}
      dropDownDirection="TOP"
      theme="DARK"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      listMode="SCROLLVIEW"
      selectedItemContainerStyle={{ backgroundColor: "#3C3C3C" }}
      hideSelectedItemIcon={true}
      placeholder={placeholder}
    />
  );
};
