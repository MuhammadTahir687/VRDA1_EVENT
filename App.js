import React from "react";
import {View,Text} from "react-native";
import Route from './src/Screens/Route'
import {Provider} from "react-redux";
import {store} from "./src/Store/Store";


const App=()=>{
    return(
        <Provider store={store}>
        <Route/>
        </Provider>
    )
}
export default App
