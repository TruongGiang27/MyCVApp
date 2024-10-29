import React, { useRef, useState } from 'react';
import {
  Alert, Animated, Button, Dimensions, Image, Modal, ScrollView,
  StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View, StatusBar
} from 'react-native';
import { Icon } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window'); // Lấy chiều rộng của màn hình

const HomeEmployer = () => {
  const [selectedOrder, setSelectedOrder] = useState('Giảm dần');
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current; // Khởi tạo giá trị animation

  const [hidden, setHidden] = useState(false);

  // Hàm mở menu với animation
  const openMenu = () => {
    setShowMenu(true); // Đảm bảo menu được hiển thị
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300, // Thời gian trượt
      useNativeDriver: true,
    }).start();
  };

  // Hàm đóng menu với animation
  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowMenu(false)); // Đóng menu sau khi animation kết thúc
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
    <StatusBar backgroundColor={'red'} />
      {/* Header */}
      <View style={styles.header}>
        <Icon style={styles.menuIcon} name="menu" size={40} color="#fff" onPress={(openMenu)} />
        <Image
          source={require('../../../assets/images/logo.png')}
          style={[styles.logo, { width: 150, height: 70 }]}
        />
        <Icon style={styles.accountIcon} name="account-circle" size={40} color="#011F82" />

      </View>

      {/* Menu trượt */}
      {showMenu && (
        <TouchableNativeFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View
              style={[styles.menuContainer,
              { transform: [{ translateX: slideAnim }] },
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
                  <TouchableOpacity key={index} style={styles.menuItem}>
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

      {/* Nội dung */}
      {/* Filter & Sort */}
      <View style={styles.filterSort}>
        <View style={styles.filter}>
          <Icon name="filter-list" size={20} />
          <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
            <Text>Lọc và tìm kiếm việc làm</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#011F82', fontWeight: 'bold' }}>Thứ tự: </Text>
          <Picker
            selectedValue={selectedOrder}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedOrder(itemValue)}
          >
            <Picker.Item label="Giảm dần" value="Giảm dần" />
            <Picker.Item label="Tăng dần" value="Tăng dần" />
          </Picker>
        </View>
      </View>

      {showFilter && (
        <View>
          <TextInput
            style={styles.filterText}
            placeholder="Lọc và tìm kiếm việc làm"
            onChangeText={(text) => console.log(text)}
          />
          <Button title="Tìm kiếm" onPress={() => console.log('Tìm kiếm')} />
        </View>
      )}

      {/* Job Draft Card */}
      <View style={styles.card}>
        <Text style={styles.jobTitle}>Kế toán</Text>
        <Text style={styles.jobLocation}>Ho Chi Minh City</Text>

        <View style={styles.warning}>
          <Icon name="error-outline" size={20} color="red" />
          <Text style={styles.warningText}>
            Bài đăng việc làm của bạn chưa hoàn tất.
          </Text>
        </View>
      </View>


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
    // padding: 10,
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
    backgroundColor: 'gray', // Thêm lớp mờ cho overlay
    opacity: 0.89,
    zIndex: 10, // Đảm bảo overlay nằm trên nội dung khác
    elevation: 10, // Cho Android
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.9,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 11, // Đảm bảo menu nằm trên overlay
    elevation: 11, // Cho Android
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
  menuText: {
    color: '#011F82',
    fontSize: 25,
    marginLeft: 10,
  },
  filterSort: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 5,
  },
  picker: {
    width: 150,
    color: '#011F82',
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
  jobLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningText: {
    marginLeft: 5,
    color: 'red',
  },
  completeButton: {
    backgroundColor: '#1976D2',
  },
});
