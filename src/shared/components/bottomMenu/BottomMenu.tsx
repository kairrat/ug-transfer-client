import React, { useState } from "react";
import { Text, View } from "react-native";
import { SubRole, UserRole } from "../../../types/role";
import { colors } from "../../style";
import { Controller } from "../icons/Controller";
import { DriverController } from "../icons/DriverController";
import { MenuItem } from "../menus/MenuItem";
import { BottomMenuItem } from "./BottomMenuItem";
import { Car } from "../icons/Car";

interface CompProps {
  onToggleActive: (role: SubRole) => void;
}

export const BottomMenu = ({ onToggleActive }: CompProps) => {
  const [activeMenu, setActiveMenu] = useState(0);

  const bottomMenus = [
    {
      title: "Диспетчер",
      role: SubRole.CONTROLLER,
      isActive: false,
      icon: Controller,
    },
    {
      title: "Водитель",
      role: SubRole.DRIVER,
      isActive: false,
      icon: Car,
    },
  ];
  return (
    <View
      style={{
        position: "absolute",
        bottom: -1,
        left: -1,
        paddingTop: 6,
        height: 98,
        width: "101%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.gray,
        borderWidth: 1,
        borderColor: colors.primary,
        zIndex: 1,
        alignItems: "center", // Center horizontally
      }}
    >
      <View
        style={{
          height: 6,
          width: 165,
          backgroundColor: colors.primary,
          position: "absolute",
          top: -6,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 80,
        }}
      >
        {bottomMenus.map((menuItem, index) => (
          <BottomMenuItem
            key={menuItem.title}
            {...menuItem}
            isActive={index === activeMenu}
            onPress={() => {
              onToggleActive(bottomMenus[index].role);
              setActiveMenu(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};
