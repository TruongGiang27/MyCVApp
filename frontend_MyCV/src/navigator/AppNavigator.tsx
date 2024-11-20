import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenName from '../constants/ScreenName';
import { RootStackParamList } from './RootStackParamList';

import Home from '../screen/home/Home';
import CreateEmployer from '../screen/Employer/CreateEmployer';
import InforEmployers from '../screen/Admin/InforEmployers';
import ApplyManager from '../screen/Employer/ApplyManager';
import CVCreate from '../screen/User/CVCreate';
import HomeEmployer from '../screen/Employer/HomeEmployer';
import JobPost from '../screen/Employer/JobPost';
import JobList from '../screen/User/JobList';
import JobDetail from '../screen/User/JobDetail';
import Profile from '../screen/profile/Profile';
import MessageScreen from '../screen/User/Message';
import InforManager from '../screen/Employer/InforManager';
import EmployerDetail from '../screen/Employer/EmployerDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (

        <Stack.Navigator initialRouteName="JobList" screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={ScreenName.Home} component={Home} />
            <Stack.Screen name={ScreenName.CreateEmployer} component={CreateEmployer} />
            <Stack.Screen name={ScreenName.InforEmployers} component={InforEmployers} />
            <Stack.Screen name={ScreenName.InforManager} component={InforManager} />
            <Stack.Screen name={ScreenName.EmployerDetail} component={EmployerDetail} />

            <Stack.Screen name={ScreenName.JobPost} component={JobPost} />
            <Stack.Screen name={ScreenName.HomeEmployer} component={HomeEmployer} />
            <Stack.Screen name={ScreenName.JobList} component={JobList} />
            <Stack.Screen name={ScreenName.JobDetail} component={JobDetail} />
            <Stack.Screen name={ScreenName.Profile} component={Profile} />
            <Stack.Screen name={ScreenName.CVCreate} component={CVCreate} />
            <Stack.Screen name={ScreenName.ApplyManager} component={ApplyManager} />
            <Stack.Screen name={ScreenName.MessageScreen} component={MessageScreen} />

        </Stack.Navigator>
    );
};

export default App;