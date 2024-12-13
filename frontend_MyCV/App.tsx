import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/navigator/AppRouter';

const App = () => {

    return (

        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

export default App;