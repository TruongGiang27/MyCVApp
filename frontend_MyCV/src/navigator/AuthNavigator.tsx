import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login/Login';
import Home from '../screen/Home/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import ScreenName from '../constants/ScreenName';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreenName.Login} component={Login} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;