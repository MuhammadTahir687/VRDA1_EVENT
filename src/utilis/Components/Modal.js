import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../../Stylesheet/Style'
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import {useTheme} from "@react-navigation/native";

const ModalView= ({ text1,text2,onPress,iconname }) => {
    const {colors}=useTheme();
    return (
        <Modal isVisible={text2}>
            <View style={[styles.shopmodal,{backgroundColor:colors.modalbg}]}>
                <TouchableOpacity onPress={onPress} style={styles.modalcrossicon}>
                    <Ionicons name={iconname} color="white" size={20} style={styles.crossicon} />
                </TouchableOpacity>
                <View style={styles.modalcontentcontainer}>
                    <Text style={[styles.modaltexth,{color:colors.modaltext}]}>{text1}</Text>
                </View>
            </View>
        </Modal>
    )
}
export default ModalView
