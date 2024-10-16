import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { GoogleSignin, SignInSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';

const App = () => {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '507193100422-jm7volrkn59vmg1aphh97noihkrna7ja.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo && userInfo.data?.user.email) {
        setUserInfo(userInfo as SignInSuccessResponse);
      }
    } catch (error : any) {
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
          <Text>Welcome, {userInfo.data.user.email}</Text>
          <Button title="Logout" onPress={signOut} />
        </>
      ) : (
        <Button title="Login with Google" onPress={signIn} />
      )}
    </View>
  );
};

export default App;