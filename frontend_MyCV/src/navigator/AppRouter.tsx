import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { checkSignInStatus } from '../utils/auth';
import { login, logout } from '../redux/reducers/authReducer';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const AppRouter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const userInfo = await checkSignInStatus();
      if (userInfo) {
        dispatch(login(JSON.parse(userInfo))); // Đăng nhập nếu có thông tin người dùng
      } else {
        dispatch(logout()); // Đăng xuất nếu không tìm thấy thông tin
      }
      setIsLoading(false); // Kết thúc trạng thái loading
    };
    checkUser();

  }, [dispatch]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppRouter

const styles = StyleSheet.create({})