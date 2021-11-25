import React from "react";
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView, Dimensions, Modal } from "react-native";

import {useTheme} from "@react-navigation/native";


 const Loader=( {animating})=>{
    const {colors}=useTheme()

        return (
            <Modal visible = {animating} transparent = {true}>
                <ActivityIndicator style = {{flex:1}} size = "large" color ={colors.loadercolor} animating={animating} />
            </Modal>
        )

}
export default Loader
