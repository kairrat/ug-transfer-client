import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, fonts } from "@styles";

interface CopmProps {
  list: any[];
  currentValue: any;
  placeholder: string;
  dropdownDirection?: "TOP" | "BOTTOM" | "DEFAULT" | "AUTO";
  icon?: boolean;
  zIndex?: number;
  name?: string;
  openDropdown?: string;
  setOpenName?: (name: string) => void;
  setCurrentValue: (value: any) => void;
}

export const Dropdown = ({
  currentValue,
  placeholder,
  list,
  setCurrentValue,
  dropdownDirection="TOP",
  icon=false,
  openDropdown,
  setOpenName,
  name,
  zIndex=1000
}: CopmProps) => {
  const [open, setOpen] = useState(openDropdown && (openDropdown === name));
  const [items, setItems] = useState(list);

  const handleOpenChange = (openState) => {
    if (openState && setOpenName && name) {
      setOpenName(name);
    }
    setOpen(openState);
  }

  useEffect(() => {
    if (!openDropdown || !name || !open) {
      return;
    }
    if (openDropdown !== name) {
      setOpen(false);
    }
  }, [openDropdown, name]);

  return (
    <DropDownPicker
      dropDownContainerStyle={{
        backgroundColor: colors.field,
        borderWidth: 1,
        borderColor: colors.line,
        zIndex: open ? zIndex : 1,
      }}
      style={{
        borderRadius: 7,
        backgroundColor: colors.field,
        borderWidth: open ? 1 : 1,
        paddingStart: icon ? '15%' : 16,
        borderColor: open ? colors.line : colors.stroke,
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
      setOpen={handleOpenChange}
      setItems={setItems}
      dropDownDirection={dropdownDirection}
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
