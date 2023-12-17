import React from "react";
import WebView from "react-native-webview";

export const WebMap: React.FC = () => {
    return(
        <WebView 
            source={require('./Map.html')}
            style={{ flex: 1}}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState/>
    );
};