import React from "react";
import {View,Text} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import {useTheme} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Tooltip} from "react-native-elements";
import styles from "../../Stylesheet/Style";

const PD = ({icon1,icon2,text1,text2,text3,text4,iconcategory,icon3}) => {
    const {colors}=useTheme()
    return(
        <View style={styles.piconatiner} >

            <View style={styles.pi1container}>
                {icon1 &&<Ionicons name={icon1} size={21} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>}
                <View style={styles.pdview}>
                    <Text style={styles.pdtext}>{text1}</Text>
                    {text2.length>14?
                        <Tooltip
                            backgroundColor="grey"
                            highlightColor="grey"
                            pointerColor="orange"
                            width={300}
                            withOverlay={false}
                            withPointer={true}
                            popover={<Text style={{color:"white",textAlign:'center'}}>{text2}</Text>}
                        >
                            <Text>{text2.slice(0, 14)+"..."}</Text>
                        </Tooltip>
                        :
                        <Text style={styles.pdvalue}>{text2}</Text>
                    }

                </View>
            </View>

            <View style={{flex:1, flexDirection:"row",alignItems:"center"}}>
                {icon2 && <Entypo name={icon2} size={20} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>}
                {icon3 &&<Ionicons name={icon3} size={21} color="white" style={[styles.pi1icon,{backgroundColor:colors.greencolor}]}/>}

                <View style={styles.pdview}>
                    <Text style={styles.pdtext}>{text3}</Text>
                    {text4.length>14?
                        <Tooltip
                            backgroundColor="grey"
                            highlightColor="grey"
                            pointerColor="orange"
                            width={300}
                            withOverlay={false}
                            withPointer={true}
                            popover={<Text style={{color:"white",textAlign:'center'}}>{text4}</Text>}
                        >
                            <Text>{text4.slice(0, 14)+"..."}</Text>
                        </Tooltip>
                        :
                        <Text style={styles.pdvalue}>{text4}</Text>
                    }
                </View>
            </View>
        </View>
    )

}
export default PD
