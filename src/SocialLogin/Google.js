import {GoogleSignin, GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';
import {LoginManager} from "react-native-fbsdk-next";
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: "984454279540-oh58il91glqj66jbb5hscsiu9ibfbs3i.apps.googleusercontent.com",
});
export default async function Google(){
    // GoogleSignin.signOut();
    // auth().signOut();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}
