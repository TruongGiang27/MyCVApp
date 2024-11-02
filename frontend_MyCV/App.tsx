import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
// import InforEmployers from './src/screen/Admin/InforEmployers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplyManager from './src/screen/Employer/ApplyManager';
import CvDetail from './src/screen/Employer/CvDetail';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import JobPost from './src/screen/Employer/JobPost';
import JobDetail from './src/screen/JobDetail';
import JobList from './src/screen/JobList';
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeEmployer" screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="InforEmployer" component={InforEmployer} /> */}
                <Stack.Screen name="JobPost" component={JobPost} />
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="HomeEmployer" component={HomeEmployer} />
                <Stack.Screen name="CvDetail" component={CvDetail} />
                <Stack.Screen name="ApplyManager" component={ApplyManager} />
                <Stack.Screen name="JobDetail" component={JobDetail} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;