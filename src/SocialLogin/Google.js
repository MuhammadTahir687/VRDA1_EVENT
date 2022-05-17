import {GoogleSignin, GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';
import {LoginManager} from "react-native-fbsdk-next";
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

var a =Platform.OS=="android"? "984454279540-oh58il91glqj66jbb5hscsiu9ibfbs3i.apps.googleusercontent.com":"984454279540-mbk08adh2q1ivltrmndp6d0tdcsueedq.apps.googleusercontent.com";
GoogleSignin.configure({
    webClientId: a,
});

// ios:984454279540-mbk08adh2q1ivltrmndp6d0tdcsueedq.apps.googleusercontent.com
// android : 984454279540-oh58il91glqj66jbb5hscsiu9ibfbs3i.apps.googleusercontent.com
export default async function Google(){

    // GoogleSignin.signOut();
    // auth().signOut();
    // GoogleSignin.revokeAccess();
    // console.log("========================log out")
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential,type="gmail");
}
