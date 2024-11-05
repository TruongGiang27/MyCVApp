import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Home/Login';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
// import InforEmployers from './src/screen/Admin/InforEmployers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobList from './src/screen/User/JobList';
import JobDetail from './src/screen/User/JobDetail';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import JobPost from './src/screen/Employer/JobPost';
import InforManager from './src/screen/Employer/InforManager';
// import EditCv from './src/screen/User/CVEdit';
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
                {/* <Stack.Screen name="EditCv" component={EditCv} /> */}
                <Stack.Screen name="InforManager" component={InforManager} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;