import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../../utils/auth';

const Login = () => {
  const dispatch = useDispatch();
  return (

    <View style={styles.container}>
      <Image style={styles.login} source={require('../../../assets/images/loginlogo.png')} />
      <View style={styles.btnlogin}>
        <Image source={require('../../../assets/images/google-icon.png')}
          style={styles.logoGoogle}/>
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
    width:400,
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