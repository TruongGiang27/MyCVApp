import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkSignInStatus } from './src/utils/auth';
import AppNavigator from './src/navigator/AppNavigator';
import AuthNavigator from './src/navigator/AuthNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const userInfo = await checkSignInStatus();
            setUser(userInfo);
            setIsLoading(false);
        };
        checkUser();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default App;