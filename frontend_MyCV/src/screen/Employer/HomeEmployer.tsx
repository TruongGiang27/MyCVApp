import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Animated, Dimensions, Image, Modal, ScrollView,
  StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View, StatusBar, Keyboard
} from 'react-native';
import { Icon } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../utils/url';

const { width } = Dimensions.get('window');

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  jobDescription: string;
}

const HomeEmployer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = jobs.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
    || item.company.toLowerCase().includes(searchQuery.toLowerCase())
    || item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigation = useNavigation();

  const [selectedOrder, setSelectedOrder] = useState('Giảm dần');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim_l = useRef(new Animated.Value(-width)).current;
  const slideAnim_r = useRef(new Animated.Value(width)).current;

  const handlePickerFocus = () => {
    Keyboard.dismiss();
  };

  const openAccountMenu = () => {
    setShowAccountMenu(true);
    Animated.timing(slideAnim_r, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAccountMenu = () => {
    Animated.timing(slideAnim_r, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowAccountMenu(false));
  };

  const openMenu = () => {
    setShowMenu(true);
    Animated.timing(slideAnim_l, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim_l, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowMenu(false));
  };

  const menuItems = [
    { title: 'Tạo mới', icon: 'add-circle-outline' },
    { title: 'Việc làm', icon: 'shopping-bag' },
    { title: 'Ứng viên', icon: 'people-outline' },
    { title: 'Phỏng vấn', icon: 'calendar-today' },
    { title: 'Phân tích', icon: 'bar-chart' },
    { title: 'Công cụ', icon: 'folder' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Icon style={styles.menuIcon} name="menu" size={40} color="#fff" onPress={openMenu} />
        <TouchableOpacity onPress={() => navigation.navigate('HomeEmployer' as never)}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={[styles.logo, { width: 150, height: 70 }]}
          />
        </TouchableOpacity>
        <Icon style={styles.accountIcon} name="account-circle" size={40} color="#011F82" onPress={openAccountMenu} />
      </View>

      {/* Sliding menu */}
      {showMenu && (
        <TouchableNativeFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.menuContainer,
                { transform: [{ translateX: slideAnim_l }] },
              ]}
            >
              <View style={styles.menuItem}>
                <Image
                  source={require('../../../assets/images/logo.png')}
                  style={[styles.logo, { width: 150, height: 70 }]}
                />
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Icon style={styles.closeItem} name="close" size={30} color="#011F82" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.menu}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.menuItem} onPress={() => {
                    if (item.title === 'Tạo mới') {
                      navigation.navigate('ApplyManager' as never); // Navigate to ApplyManager
                    }
                  }}
                  >
                    <View style={styles.iconLabel}>
                      <Icon name={item.icon} size={25} color="#011F82" />
                      <Text style={styles.menuText}>{item.title}</Text>
                    </View>
                    <Icon name="chevron-right" size={30} color="#011F82" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </View>
        </TouchableNativeFeedback>
      )}

      <Modal visible={showAccountMenu} transparent animationType="fade">
        <TouchableNativeFeedback onPress={closeAccountMenu}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.menuAccountContainer, { transform: [{ translateX: slideAnim_r }] }]}>
              <ScrollView>
                <TouchableOpacity style={styles.menuItem}>
                  <Icon name="settings" size={25} color="#011F82" />
                  <Text style={styles.menuText}>Cài đặt tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Đăng xuất')}>
                  <Icon name="logout" size={25} color="#011F82" />
                  <Text style={styles.menuText}>Đăng xuất</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </View>
        </TouchableNativeFeedback>
      </Modal>

      <View style={styles.filterSort}>
        <View style={styles.filter}>
          <TextInput
            style={styles.filterText}
            placeholder="Tìm kiếm việc làm"
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={() => console.log("Tìm kiếm...")}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.orderContainer}>
          <Text style={styles.orderText}>Thứ tự:</Text>
          <Picker
            selectedValue={selectedOrder}
            style={styles.picker}
            mode="dropdown"
            onFocus={handlePickerFocus}
            onValueChange={(itemValue) => setSelectedOrder(itemValue)}
            dropdownIconColor="#1976D2"
          >
            <Picker.Item label="Giảm dần" value="Giảm dần" style={{ color: '#1976D2' }} />
            <Picker.Item label="Tăng dần" value="Tăng dần" style={{ color: '#1976D2' }} />
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.cardContainer}>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.jobTitle}>Chức vụ: {item.title}</Text>
            <Text style={styles.jobDetail}>Tên công ty: {item.company}</Text>
            <Text style={styles.jobDetail}>Địa điểm: {item.location}</Text>
            <Text style={styles.jobDetail}>Mức lương: {item.salary}</Text>
            <Text style={styles.jobDetail}>Loại việc làm: {item.jobType}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeEmployer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuIcon: {
    backgroundColor: '#011F82',
    padding: 15,
  },
  logo: {
    resizeMode: 'contain',
  },
  accountIcon: {
    padding: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.89,
    zIndex: 10,
    elevation: 10,
  },
  menuText: {
    color: '#011F82',
    fontSize: 25,
    marginLeft: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.9,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 11,
    elevation: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeItem: {
    padding: 10,
    borderRadius: 50,
  },
  headerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  menu: {
    marginTop: 10,
  },
  menuAccountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.9,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 11,
    elevation: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#B9D6F3',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterSort: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    flex: 1,
    fontSize: 16,
    color: '#1976D2',
  },
  searchIcon: {
    padding: width * 0.03,
    backgroundColor: '#1976D2',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: width * 0.5,
    borderColor: '#1976D2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: 'bold',
    marginRight: 5,
  },
  picker: {
    flex: 1,
    color: '#1976D2',
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobDetail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
});
