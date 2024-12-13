import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/navigator/AppRouter';

const App = () => {

    return (

            <Provider store={store}>
                <AppRouter />
            </Provider>

        // <NavigationContainer>
        //     {user ? <AppNavigator /> : <AuthNavigator setUser={setUser}/>}
        // </NavigationContainer>
    );
};

export default App;