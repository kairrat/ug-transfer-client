
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { EarthIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";

interface IGpsModalSheetProps {
    onDecline: () => void,
    onAccept: () => void
}

export const GpsModalSheet: React.FC<IGpsModalSheetProps> = ({ onAccept, onDecline }) => {
    
    return(
        
    );
};

const styles = StyleSheet.create({
    
});