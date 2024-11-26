import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signIn } from '../../utils/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import ScreenName from '../../constants/ScreenName';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
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