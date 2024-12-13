import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { appColors } from '../constants/appColors';
import ScreenName from '../constants/ScreenName';
import { RootStackParamList } from '../navigator/RootStackParamList';
import { BASE_URL } from '../utils/url';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const Navbar = ({ route, navigation }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null); // Trạng thái lưu userId
  const [employer, setEmployer] = useState<any>(null);
  useEffect(() => {
    const getInfo = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
        setUserId(parsedUser.data.user.id);
        console.log("user------------", parsedUser.data.user.id);
      }
    };
    getInfo();
  }, []);

  const getIconColor = (screen: string) => {
    return route.name === screen ? '#011F82' : appColors.gray; // Màu xanh cho trang hiện tại, xám cho trang khác
  };

  const getTextColor = (screen: string) => {
    return route.name === screen ? '#011F82' : '#666'; // Tương tự như trên
  };

  const handleEmployer = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/employers/check-cv-employer/${userId}`);
      setEmployer(response.data);
      console.log("hasCV", response.data.hasCv);
      return response.data.hasCv; // Trả về giá trị true/false
    } catch (error) {
      console.error('Error checking CV:', error);
      return false; // Default trường hợp lỗi
    }
  };

  const navigateToEmployer = async () => {
    if (userId) {
      const hasCv = await handleEmployer(userId); // Kiểm tra trạng thái CV
      if (hasCv) {
        navigation.navigate('HomeEmployer', { userId }); // Điều hướng nếu có CV
      } else {
        navigation.navigate('CreateEmployer'); // Điều hướng nếu chưa có CV
      }
    } else {
      console.warn("User ID is not available");
    }
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.group}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home" as never)}>
          <Icon name="home" size={25} color="#011F82" />
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('FavoriteJob')}>
          <Icon name="bookmark" size={25} color="#011F82" />
          <Text style={styles.navText}>Việc làm của tôi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.group}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToEmployer}>
          <Icon name="chatbox-ellipses" size={25} color="#011F82" />
          <Text style={styles.navText}>Nhà tuyển dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('Profile', { userId: user?.data?.user?.id ,userEmail: user?.data?.user?.email })
          }
        >
          <Icon name="person" size={25} color={getIconColor('Profile')} />
          <Text style={[styles.navText, { color: getTextColor('Profile') }]}>
            Hồ sơ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 0.1,
    paddingHorizontal: 15,
  },
  group: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
  },
});
