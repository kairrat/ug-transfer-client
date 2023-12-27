import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, fonts } from "@styles";
import { FieldError } from "react-hook-form";

interface CopmProps {
  list: any[];
  currentValue: any;
  placeholder: string;
  dropdownDirection?: "TOP" | "BOTTOM" | "DEFAULT" | "AUTO";
  icon?: boolean;
  zIndex?: number;
  name?: string;
  openDropdown?: string;
  error?: FieldError;
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
  error=null,
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

  const getBorderColor = () =>{
    if (error) {
      return colors.error;
    }
    if (open) {
      return colors.line;
    }
    return colors.stroke;
  }

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
        borderColor: getBorderColor(),
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
