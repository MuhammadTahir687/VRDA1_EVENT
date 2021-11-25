import React, {useEffect} from "react";
import {View, Text, Linking} from "react-native";
import Route from './src/Screens/Route'
import {Provider} from "react-redux";
import {store} from "./src/Store/Store";
import linking from "./src/Linking";
import {ToastProvider} from "react-native-styled-toast";


const App=()=>{
    // useEffect(()=>{getInitialURL()},[])
    //
    // const getInitialURL=async()=> {
    //     const url = await Linking.getInitialURL();
    //     if (url != null) {
    //         console.log("==========================",url)
    //         return url;
    //     }
    // }
    return(
        <Provider store={store}>
            <ToastProvider  maxToasts={1} offset={16} position="BOTTOM">
        <Route/>
            </ToastProvider>
        </Provider>
    )
}
export default App
