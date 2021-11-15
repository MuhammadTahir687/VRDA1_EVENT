import React, {useEffect} from "react";
import {View, Text, Linking} from "react-native";
import Route from './src/Screens/Route'
import {Provider} from "react-redux";
import {store} from "./src/Store/Store";
import linking from "./src/Linking";


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
        <Route/>
        </Provider>
    )
}
export default App
