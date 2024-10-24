import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Login';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import InforEmployer from './src/screen/Employer/InforEmployer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="InforEmployer" component={InforEmployer} />
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="JobDetail" component={JobDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
