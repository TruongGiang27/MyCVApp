import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-get-random-values';
// import InforEmployers from './src/screen/Admin/InforEmployers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
// import EmployerDetail from './src/screen/Employer/EmployerDetail';
import ApplyManager from './src/screen/Employer/ApplyManager';
import InforManager from './src/screen/Employer/InforManager';
import JobPost from './src/screen/Employer/JobPost';
// import EditCv from './src/screen/User/CVEdit';
const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeEmployer" screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEmployer" component={CreateEmployer} /> */}
                <Stack.Screen name="InforManager" component={InforManager} />
                <Stack.Screen name="HomeEmployer" component={HomeEmployer} />
                <Stack.Screen name="ApplyManager" component={ApplyManager} />
                {/* <Stack.Screen name="EmployerDetail" component={EmployerDetail} /> */}
                <Stack.Screen name="JobPost" component={JobPost} />
                {/* <Stack.Screen name="Home" component={HomeEmployer} /> */}
                {/* <Stack.Screen name="JobList" component={JobList} /> */}
                {/* <Stack.Screen name="JobDetail" component={JobDetail} /> */}
                {/* <Stack.Screen name="EditCv" component={EditCv} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;