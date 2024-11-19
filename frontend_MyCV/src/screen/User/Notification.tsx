import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleJobSearchPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>MyCVApp</Text>
      </View>

      {/* Icon and Text */}
      <View style={styles.content}>
        <Image
            source={require('../../../assets/images/Mail-amico.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Không có gì ngay bây giờ. Hãy quay lại sau!</Text>
        <Text style={styles.description}>
          Đây là nơi chúng tôi sẽ thông báo cho bạn về các hồ sơ xin việc của bạn và các thông tin
          hữu ích khác để giúp bạn tìm kiếm việc làm.
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleJobSearchPress}>
        <Text style={styles.buttonText}>Tìm việc</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#011F82',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#011F82',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6D92D0',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#011F82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default NotificationScreen;
