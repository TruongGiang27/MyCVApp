import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
    webClientId: '507193100422-jm7volrkn59vmg1aphh97noihkrna7ja.apps.googleusercontent.com',
});

export const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log('User signed in:', userInfo);
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the sign-in process');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services are not available');
        } else {
            console.log('Some other error:', error);
        }
    }
};

export const checkSignInStatus = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
            console.log('User is already signed in:', JSON.parse(userInfo));
            return JSON.parse(userInfo);
        } else {
            console.log('User is not signed in');
            return null;
        }
    } catch (error) {
        console.log('Error checking sign-in status:', error);
        return null;
    }
};

export const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('userInfo');
        console.log('User signed out');
    } catch (error) {
        console.log('Error signing out:', error);
    }
};
