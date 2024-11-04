import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Home/Login';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
// import InforEmployers from './src/screen/Admin/InforEmployers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
import ApplyManager from './src/screen/Employer/ApplyManager';
import CvDetail from './src/screen/Employer/CvDetail';
=======
import JobList from './src/screen/User/JobList';
import JobDetail from './src/screen/User/JobDetail';
>>>>>>> b2c5f0359f498ea3f1e20e2224daa20db0bde9bb
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import JobPost from './src/screen/Employer/JobPost';
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobList" screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="InforEmployer" component={InforEmployer} /> */}
                {/* <Stack.Screen name="JobPost" component={JobPost} /> */}
                {/* <Stack.Screen name="Home" component={HomeEmployer} /> */}
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="JobDetail" component={JobDetail} />
<<<<<<< HEAD
=======
                {/* <Stack.Screen name="EditCv" component={EditCv} /> */}
>>>>>>> b2c5f0359f498ea3f1e20e2224daa20db0bde9bb


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;