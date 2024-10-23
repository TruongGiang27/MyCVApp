// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import Login from './src/screen/Login';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Đăng Nhập' }} 
        />
        <Stack.Screen 
          name="create_employer" 
          component={CreateEmployer} 
          options={{ title: 'Tạo Nhà Tuyển Dụng' }} 
        />
        <Stack.Screen 
          name="JobList" 
          component={JobList} 
          options={{ title: 'Danh sách công việc' }} 
        />
        <Stack.Screen 
          name="JobDetail" 
          component={JobDetail} 
          options={{ title: 'Chi tiết công việc' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
