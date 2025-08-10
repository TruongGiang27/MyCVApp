import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const AppRouter = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <NavigationContainer>
            {user && user.data ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppRouter

const styles = StyleSheet.create({})