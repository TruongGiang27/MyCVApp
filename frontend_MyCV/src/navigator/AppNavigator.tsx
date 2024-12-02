import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-get-random-values';
import ScreenName from '../constants/ScreenName';
import InforEmployers from '../screen/Admin/InforEmployers';
import ApplyManager from '../screen/Employer/ApplyManager';
import CreateEmployer from '../screen/Employer/CreateEmployer';
import EmployerDetail from '../screen/Employer/EmployerDetail';
import HomeEmployer from '../screen/Employer/HomeEmployer';
import InforManager from '../screen/Employer/InforManager';
import JobPost from '../screen/Employer/JobPost';
import Home from '../screen/home/Home';
import Profile from '../screen/profile/Profile';
import CVCreate from '../screen/User/CVCreate';
import CVManagerment from '../screen/User/CVManagerment';
import FavoriteJob from '../screen/User/FavoriteJob';
import JobDetail from '../screen/User/JobDetail';
import JobList from '../screen/User/JobList';
import ManageCVsApplied from '../screen/User/ManageCVsApplied';
import MessageScreen from '../screen/User/Message';
import { RootStackParamList } from './RootStackParamList';
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <Stack.Navigator initialRouteName="ManageCVsApplied" screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={ScreenName.CreateEmployer} component={CreateEmployer} />
            <Stack.Screen name={ScreenName.InforEmployers} component={InforEmployers} />
            <Stack.Screen name={ScreenName.InforManager} component={InforManager} />
            <Stack.Screen name={ScreenName.EmployerDetail} component={EmployerDetail} />
            <Stack.Screen name={ScreenName.JobPost} component={JobPost} />
            <Stack.Screen name={ScreenName.HomeEmployer} component={HomeEmployer} />
            <Stack.Screen name={ScreenName.ApplyManager} component={ApplyManager} />

            <Stack.Screen name={ScreenName.Home} component={Home} />
            <Stack.Screen name={ScreenName.JobList} component={JobList} />
            <Stack.Screen name={ScreenName.JobDetail} component={JobDetail} />
            <Stack.Screen name={ScreenName.Profile} component={Profile} />
            <Stack.Screen name={ScreenName.CVCreate} component={CVCreate} />
            <Stack.Screen name={ScreenName.MessageScreen} component={MessageScreen} />
            <Stack.Screen name={ScreenName.CVManagerment} component={CVManagerment} />
            <Stack.Screen name={ScreenName.ManageCVsApplied} component={ManageCVsApplied} />
            <Stack.Screen name={ScreenName.FavoriteJob} component={FavoriteJob} />
        </Stack.Navigator>
    );
};

export default App;