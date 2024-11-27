import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { signIn } from '../../utils/auth';

const Login = () => {
  const dispatch = useDispatch();
  return (
    
    <View style={styles.container}>
      <View>
      <FastImage
        source={require('../../../assets/images/login.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      </View>
      <Button title="Login with Google" onPress={() => signIn(dispatch)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});