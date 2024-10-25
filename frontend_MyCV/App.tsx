import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import JobDetail from './src/screen/JobDetail';
import JobList from './src/screen/JobList';
import JobPost from './src/screen/Employer/JobPost';
import InforEmployer from './src/screen/Admin/InforEmployers';
import HomeEmployer from './src/screen/Employer/HomeEmployer';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CreateEmployer" screenOptions={{headerShown: false}}>
                {/* <Stack.Screen name="Login" component={Login} /> */}
                {/* <Stack.Screen name="Home" component={Home} /> */}
                <Stack.Screen name="JobPost" component={JobPost} />
                {/* <Stack.Screen name="JobList" component={JobList} /> */}
                {/* <Stack.Screen name="JobDetail" component={JobDetail} /> */}
                {/* <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="HomeEmployer" component={HomeEmployer} />
                <Stack.Screen name="InforEmployer" component={InforEmployer} /> */}
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
