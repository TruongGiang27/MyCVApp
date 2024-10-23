import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values';
import * as React from 'react';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import Login from './src/screen/Login';
import Home from './src/screen/Home';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="create_employer" component={CreateEmployer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
