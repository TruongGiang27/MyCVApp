import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Dispatch } from 'redux';
import { login, logout } from '../redux/reducers/authReducer';
GoogleSignin.configure({
    webClientId: '29647774100-3d7b9j6m74v9bknvb9ic11lm5c7p2k04.apps.googleusercontent.com',
    offlineAccess: true,
});

export const signIn = async (dispatch: Dispatch) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch(login(userInfo));
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
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
            return JSON.parse(userInfo);
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};

export const signOut = async (dispatch: Dispatch) => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('searchHistory');
        dispatch(logout());
        console.log('User signed out');
    } catch (error) {
        console.log('Error signing out:', error);
    }
};
