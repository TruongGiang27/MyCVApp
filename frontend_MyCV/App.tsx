import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-get-random-values';
import ApplyManager from './src/screen/Employer/ApplyManager';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import EmployerDetail from './src/screen/Employer/EmployerDetail';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import InforManager from './src/screen/Employer/InforManager';
import JobPost from './src/screen/Employer/JobPost';
import Service from './src/screen/Employer/Service';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Home/Login';
import Profile from './src/screen/profile/Profile';
import CVCreate from './src/screen/User/CVCreate';
import CVManagerment from './src/screen/User/CVManagerment';
import JobDetail from './src/screen/User/JobDetail';
import JobList from './src/screen/User/JobList';
import Message from './src/screen/User/Message';
import Notification from './src/screen/User/Notification';
import { RootStackParamList } from './src/screen/User/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobList" screenOptions={{ headerShown: false }}>
                {/* Page Home */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />

                {/* Page User */}
                <Stack.Screen name="CVCreate" component={CVCreate} />
                <Stack.Screen name="CVManagerment" component={CVManagerment} />
                <Stack.Screen name="JobDetail" component={JobDetail} />
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Notification" component={Notification} />

                {/* Page Profile */}
                <Stack.Screen name="Profile" component={Profile} />

                {/* Page Employer */}
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="ApplyManager" component={ApplyManager} />
                <Stack.Screen name="EmployerDetail" component={EmployerDetail} />
                <Stack.Screen name="HomeEmployer" component={HomeEmployer} />
                <Stack.Screen name="InforManager" component={InforManager} />
                <Stack.Screen name="JobPost" component={JobPost} />
                <Stack.Screen name="Service" component={Service} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;