import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const App = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID_HERE', // From Google Developer Console
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the sign-in process');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services are not available');
            } else {
                console.error(error);
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {userInfo ? (
                <>
                    <Text>Welcome, {userInfo.user.name}</Text>
                    <Button title="Logout" onPress={signOut} />
                </>
            ) : (
                <Button title="Login with Google" onPress={signIn} />
            )}
        </View>
    );
};

export default App;