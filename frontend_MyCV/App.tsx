import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-get-random-values';
import ApplyManager from './src/screen/Employer/ApplyManager';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import EmployerDetail from './src/screen/Employer/EmployerDetail';
import InforManager from './src/screen/Employer/InforManager';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Home/Login';
import JobDetail from './src/screen/User/JobDetail';
import JobList from './src/screen/User/JobList';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import JobPost from './src/screen/Employer/JobPost';
import CVCreate from './src/screen/User/CVCreate';
import CVManagerment from './src/screen/User/CVManagerment';
import Message from './src/screen/User/Message';
import Profile from './src/screen/profile/Profile';
import NotificationScreen from './src/screen/User/Notification';

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CreateEmployer: undefined;
    InforManager: undefined;
    HomeEmployer: undefined;
    ApplyManager: undefined;
    EmployerDetail: undefined;
    JobPost: undefined;
    JobDetail: { jobId: string };
    CVCreate: { startStep: number; jobId: string };
    Case10: undefined; // Add the new screen type
    JobList: undefined;
    CVManagerment: undefined;
    Message: undefined;
    Profile: undefined; // Add the new screen type
    NotificationScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobList" screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} /> */}
                {/* <Stack.Screen name="Home" component={Home} /> */}
                {/* <Stack.Screen name="CreateEmployer" component={CreateEmployer} /> */}
                {/* <Stack.Screen name="InforManager" component={InforManager} /> */}
                {/* <Stack.Screen name="HomeEmployer" component={HomeEmployer} /> */}
                {/* <Stack.Screen name="ApplyManager" component={ApplyManager} /> */}
                {/* <Stack.Screen name="EmployerDetail" component={EmployerDetail} /> */}
                {/* <Stack.Screen name="JobPost" component={JobPost} /> */}
                <Stack.Screen name="JobDetail" component={JobDetail} />
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="CVCreate" component={CVCreate} />
                <Stack.Screen name="CVManagerment" component={CVManagerment} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;