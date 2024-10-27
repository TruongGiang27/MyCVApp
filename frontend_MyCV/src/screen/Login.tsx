import { GoogleSignin, SignInSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

const Login = () => {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);
  const [dataUser, setDataUser] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  useEffect(() => {
    axios.get('http://192.168.0.121:3000/users')
      .then(response => {
        setDataUser(response.data);``
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching data!', error);
      });
  }, []);

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
      navigation.navigate('Home');
    } catch (error: any) {
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
      navigation.navigate('Login');
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
      <ScrollView style={{ marginTop: 20 }}>
        {dataUser.length > 0 ? (
          dataUser.map((item, index) => (
            <Text key={index}>{JSON.stringify(item)}</Text>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>

    </View>
  );
};

export default Login;