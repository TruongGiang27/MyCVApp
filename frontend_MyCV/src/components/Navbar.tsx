import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from './navigator/RootStackParamList ';
import ScreenName from '../constant/ScreenName';
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const Navbar = ({ navigation}:Props) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.group}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={25} color="#011F82" />
          <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bookmark" size={25} color="#011F82" />
          <Text style={styles.navText}>Việc làm của tôi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.group}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="chatbox-ellipses" size={25} color="#011F82" />
          <Text style={styles.navText}>Tin nhắn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={25} color="#011F82" />
          <Text style={styles.navText}>Hồ sơ</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
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
    paddingHorizontal: 10, // Adjust padding between items within each group
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});
