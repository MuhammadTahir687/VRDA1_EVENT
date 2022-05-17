import React, {useEffect} from "react";
import {View, Text, Linking} from "react-native";
import Route from './src/Screens/Route'
import {Provider} from "react-redux";
import {store} from "./src/Store/Store";

// import {ToastProvider} from "react-native-styled-toast";
import Example from './src/utilis/Components/CountryPicker'
import {useTheme} from "@react-navigation/native";
import Carosel from "./src/utilis/Components/Carosal";


const App=()=>{

    return(
        <Provider store={store}>
            {/* <ToastProvider  maxToasts={1}  position="BOTTOM"> */}
        <Route/>
            {/* </ToastProvider> */}
        </Provider>
    )
}
export default App;
