import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-get-random-values';
import ApplyManager from './src/screen/Employer/ApplyManager';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import EmployerDetail from './src/screen/Employer/EmployerDetail';
// import HomeEmployer from './src/screen/Employer/HomeEmployer';
import InforManager from './src/screen/Employer/InforManager';
// import JobPost from './src/screen/Employer/JobPost';
import Home from './src/screen/Home/Home';
import Login from './src/screen/Home/Login';
import JobDetail from './src/screen/User/JobDetail';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import JobPost from './src/screen/Employer/JobPost';
import CVCreate from './src/screen/User/CVCreate';

const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CVCreate" screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} />
                <Stack.Screen name="InforManager" component={InforManager} />
                <Stack.Screen name="HomeEmployer" component={HomeEmployer} />
                <Stack.Screen name="ApplyManager" component={ApplyManager} />
                <Stack.Screen name="EmployerDetail" component={EmployerDetail} />
                <Stack.Screen name="JobPost" component={JobPost} />
                <Stack.Screen name="JobList" component={JobList} />
                <Stack.Screen name="JobDetail" component={JobDetail} />
                {/* <Stack.Screen name="EditCv" component={EditCv} /> */}
                <Stack.Screen name="CVCreate" component={CVCreate} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;