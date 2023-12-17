import React from "react";
import YaMap from "react-native-yamap";
import { StyleSheet, View } from "react-native";

interface IMapProps {

}

YaMap.init('6c1761fe-f271-402e-b66e-6da71e8b7201');

export const Map: React.FC<IMapProps> = () => {
    return(
        <View style={styles.container}>
            <YaMap
                userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
                initialRegion={{
                    lat: 50,
                    lon: 50,
                    zoom: 10,
                    azimuth: 80,
                    tilt: 100
                }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});