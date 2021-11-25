import React from "react";
import DatePicker from "react-native-datepicker";
import {View,TextInput,Text} from "react-native";
import styles from '../../Stylesheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTheme} from "@react-navigation/native";

const DI = ({icon1,icon2,text1,text2,value1,value2,keyboardtype1,editable1,onChangeText1,placeholder1,onBlur1,datechange,date}) => {
 const {colors}=useTheme();
  return(
      <View style={{flexDirection:"row"}} >
          <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
              <Ionicons name={icon1} size={21} color="white" style={{paddingVertical:6,paddingHorizontal:7,borderRadius:10,backgroundColor:colors.greencolor}}/>
              <View style={{flex:1,marginLeft:10}}>
                  <Text style={{flex:1,fontSize:15,fontWeight:"bold",color:colors.profilrtext}}>{text1}</Text>
                  <TextInput
                      style={[styles.avatarinput,{color:colors.profilrtext,borderColor:colors.profilrtext}]}
                      placeholder={placeholder1}
                      onChangeText={onChangeText1}
                      placeholderTextColor={colors.inputtext}
                      onBlur={onBlur1}
                      value={value1}
                      editable={editable1}
                      keyboardType={keyboardtype1}
                  />
              </View>
          </View>
          <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
              <Ionicons name={icon2} size={21} color="white" style={{paddingVertical:6,paddingHorizontal:7,borderRadius:10,backgroundColor:colors.greencolor}}/>
              <View style={{flex:1,marginLeft:10}}>
                  <Text style={{flex:1,fontSize:15,fontWeight:"bold",color:colors.profilrtext}}>Date</Text>
                  {/*<View style={{flex:1,borderBottomWidth:1}}>*/}
                      <DatePicker
                          style={{width:"100%"}}
                          date={date}
                          showIcon={false}
                          placeholder="D.O.B"
                          format="YYYY-MM-DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                              dateText: {  textAlign: "left", color:colors.profildatetext},
                              dateInput: {  alignItems: "flex-start",borderBottomWidth:1,borderColor:colors.profildatetext,borderWidth:0 }
                          }}
                          onDateChange={datechange}
                      />
                  {/*</View>*/}
              </View>
          </View>
      </View>
  )
}
export default DI
