import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Login = () => {
  return(
     <SafeAreaView style={{flex:1,backgroundColor:"#39c239"}}>
         {/*<View style={{flex:1,justifyContent:"center"}}>*/}
         <View style={{flex:1,justifyContent:"center"}}>
             <Text>bsdjbvsdjb</Text>
         </View>
         <View style={{flex:1,marginHorizontal:10}}>
             <Text style={{fontWeight:"bold",color:"white",fontSize:18}}>Welcome</Text>
             <Text style={{color:"white",fontSize:16}}>Life is an Event</Text>
             <Text style={{fontWeight:"bold",color:"white",fontSize:17}}>Make it Memorable</Text>
         </View>
         <View style={{flex:1,marginHorizontal:10}}>
             <TouchableOpacity style={{backgroundColor:"white",paddingHorizontal:10,paddingVertical:5,borderRadius:5,marginBottom:10}}>
                 <Text style={{fontSize:18,fontWeight:"bold",color:"green"}}>Login as a User</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth:1,borderColor:"white",paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                 <Text style={{fontSize:18,color:"white",fontWeight:'bold'}}>Login as a Admin</Text>
             </TouchableOpacity>
             <Text style={{color:"white",textAlign:"center",marginVertical:10}}>Already have an account?Login</Text>
         </View>
         {/*<View style={{marginHorizontal:10}}>*/}
         {/* <Text style={{fontWeight:"bold",color:"white",fontSize:25}}>or Get started with</Text>*/}
         {/*    <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center',marginTop:10}}>*/}
         {/*        <View style={{borderWidth:1,borderColor:"white",borderTopLeftRadius:10,borderBottomLeftRadius:10,padding:10.2,backgroundColor:'white'}}>*/}
         {/*            <FontAwesome name="facebook" color="orange" size={20} />*/}
         {/*        </View>*/}
         {/*        <View style={{borderWidth:1,borderColor:"white",borderTopRightRadius:10,borderBottomRightRadius:10,paddingHorizontal:15,paddingVertical:6.95}}>*/}
         {/*            <Text style={{fontSize:20,color:"white"}}>Sign in with Facebook</Text>*/}
         {/*        </View>*/}
         {/*    </TouchableOpacity>*/}
         {/*    <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center',marginTop:10}}>*/}
         {/*        <View style={{borderWidth:1,borderColor:"white",borderTopLeftRadius:10,borderBottomLeftRadius:10,paddingVertical:10.2,paddingHorizontal:4.5,backgroundColor:'white'}}>*/}
         {/*            <Ionicons name="logo-google" color="orange" size={20} />*/}
         {/*        </View>*/}
         {/*        <View style={{borderWidth:1,borderColor:"white",borderTopRightRadius:10,borderBottomRightRadius:10,paddingHorizontal:25,paddingVertical:6.95}}>*/}
         {/*            <Text style={{fontSize:20,color:"white"}}>Sign in with Google</Text>*/}
         {/*        </View>*/}
         {/*    </TouchableOpacity>*/}
         {/*</View>*/}
         {/*</View>*/}


     </SafeAreaView>
  )
}
export default Login
