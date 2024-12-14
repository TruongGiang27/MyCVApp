import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { checkSignInStatus } from '../../utils/auth';
import { signIn } from '../../utils/auth';
import { login, logout } from '../../redux/reducers/authReducer';
import { RootState } from '../../redux/store';
const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const checkUser = async () => {
      const userInfo = await checkSignInStatus();
      if (userInfo) {
        dispatch(login(JSON.parse(userInfo)));
        console.log('Đã dispatch login:', userInfo); // Đăng nhập nếu có thông tin người dùng
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

    <View style={styles.container}>
      <Image style={styles.login} source={require('../../../assets/images/loginlogo.png')} />
      <View style={styles.btnlogin}>
        <Image source={require('../../../assets/images/google-icon.png')}
          style={styles.logoGoogle} />
        <TouchableOpacity onPress={() => signIn(dispatch)}>
          <Text style={styles.text}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  logoGoogle: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  login: {
    width: 400,
    height: 400,
  },
  btnlogin: {
    display: 'flex',
    flexDirection: 'row',
    width: '65%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80B3FF',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});