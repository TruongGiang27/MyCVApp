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
import CvDetail from '../screen/Employer/CvDetail';
import HomeEmployer from '../screen/Employer/HomeEmployer';
import JobPost from '../screen/Employer/JobPost';
import JobList from '../screen/User/JobList';
import JobDetail from '../screen/User/JobDetail';
import Profile from '../screen/profile/Profile';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={ScreenName.Home} component={Home} />
            <Stack.Screen name={ScreenName.CreateEmployer} component={CreateEmployer} />
            <Stack.Screen name={ScreenName.InforEmployers} component={InforEmployers} />
            <Stack.Screen name={ScreenName.JobPost} component={JobPost} />
            <Stack.Screen name={ScreenName.HomeEmployer} component={HomeEmployer} />
            <Stack.Screen name={ScreenName.JobList} component={JobList} />
            <Stack.Screen name={ScreenName.JobDetail} component={JobDetail} />
            <Stack.Screen name={ScreenName.Profile} component={Profile} />
            <Stack.Screen name={ScreenName.CvDetail} component={CvDetail} />
            <Stack.Screen name={ScreenName.ApplyManager} component={ApplyManager} />
        </Stack.Navigator>
    );
};

export default App;