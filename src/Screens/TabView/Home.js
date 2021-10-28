import React from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from "react-native";
import styles from '../../Stylesheet/Style'
import {useTheme} from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";

const Home=()=>{
    const {colors}=useTheme();
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={[styles.homeheader,{backgroundColor:colors.loginbackground}]}>
                <View style={{flex:1}}>
                <Text style={[styles.homeheaderh1,{color:colors.text}]}>Current Location</Text>
                <Text style={[styles.homeheaderh,{color:colors.text}]}>New York, USA</Text>
                <View style={styles.homeiconcontianer}>
                    <View>
                        <Ionicons name="menu" color="white" size={30}/>
                    </View>
                    <View style={styles.homerighticoncontainer}>
                        <FontAwesome name="bell" color="white" size={18} style={[styles.righticon,{backgroundColor:colors.signinHeader}]} />
                        <MaterialCommunityIcons name="qrcode-scan" color="white" size={20}/>
                    </View>
                </View>
                </View>

                <View style={styles.searchcontainer}>
                    <View style={styles.searchleftcontainer}>
                        <LinearGradient colors={["rgba(12,12,12,0.4)", "rgba(172,164,164,0.27)"]} style={{backgroundColor:"rgba(12,12,12,0.4)",flexDirection:"row",borderBottomLeftRadius:50,borderTopLeftRadius:50,flex:1}}>
                        <FontAwesome name="search" color={colors.loginbackground} size={18} style={[styles.homesearchicon,{backgroundColor:'rgba(12,12,12,0.4)',borderWidth:2,borderColor:colors.loginbackground}]}/>
                          <TextInput
                            style={[styles.homesearchinput]}
                            placeholder="Search"
                            placeholderTextColor={colors.loginbackground}
                        />
                        </LinearGradient>

                    </View>

                    <View style={[styles.filtercontainer,{backgroundColor:"rgba(12,12,12,0.58)"}]}>
                        <Ionicons name="filter" color="white" size={20}/>
                        <Text style={{color:"white",marginHorizontal:5}}>Filter</Text>
                    </View>
                </View>
            </View>
            <View style={styles.homemain1}>
                <Text style={[styles.homemainh1,{color:colors.loginbackground}]}>Upcomming Event</Text>
                <TouchableOpacity style={styles.seeallcontainer}>
                    <Text>See All</Text>
                    <AntDesign name="right"/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.homemainh2,{color:colors.loginbackground}]}>Special Event</Text>
            <View style={[styles.homecardcotainer,{backgroundColor:colors.loginbackground}]}>
                <View style={{flex:1}}>
                    <Text style={[styles.homemainh2,{color:colors.text}]}>Motivational Event</Text>
                    <Text style={[styles.cardtext,{color:colors.text}]}>On iOS you can use On iOS you can use the MaskedViewIOS to display text with a gradient. The trick here is to render the text twice; once for the mask, and once to let the gradient have the correct size</Text>
                    <TouchableOpacity style={[styles.cardbtn,{backgroundColor:colors.signinHeader}]}>
                        <Text style={{color:colors.text}}>View Now</Text>
                        <Ionicons name="eye" size={15} color="white" style={styles.cardbtnicon}/>
                    </TouchableOpacity>
                </View>
                    <Image source={require('../../Assets/Avator.png')} style={styles.cardimg}/>



            </View>



        </SafeAreaView>

    )
}
export default Home
