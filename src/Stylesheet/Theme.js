import React from "react";
import { DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import {NavigationContainer,DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme} from "@react-navigation/native";

const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        primary: "#1A1A1A",
        accent: "#FAFAFA",
        background:"blue",
        text:"#FAFAFA"
    },
};

const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        primary: "#FAFAFA",
        accent: "#1A1A1A",
        background: 'red',
        text:"black"
    },
};

export default {CustomDefaultTheme,CustomDarkTheme}
