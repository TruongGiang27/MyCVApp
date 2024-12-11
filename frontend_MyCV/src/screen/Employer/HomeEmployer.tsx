import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions, Image,
  Keyboard,
  Modal, ScrollView,
  StatusBar,
  StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View
} from 'react-native';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';


const { width } = Dimensions.get('window');
// types.ts
type Props = NativeStackScreenProps<RootStackParamList, 'HomeEmployer'>;

interface Job {
  deadline: string;
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  jobDescription: string;
  status: "Chọn trạng thái" | "Mở" | "Tạm dừng" | "Đã đóng"; // Add status field here
}

const HomeEmployer = ({navigation, route} : Props) => {
  const {userId} = route.params as { userId: string };

  const [allJobs, setAllJobs] = useState<Job[]>([]); // Original data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [userInfo, setUserInfo] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(2); // Start by showing 5 jobs
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const getInfo = async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
            console.log("------------------");
            console.log("userInfo", userInfo);
        }
      };
      getInfo();
  }, []);
  
  // Hàm tải dữ liệu từ API
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/job-of-user/${userId}`);
      setAllJobs(response.data);
      setJobs(response.data);
      setVisibleCount(2); // Reset số lượng hiển thị mỗi lần tải lại
      console.log("userId------pagehomeemployer", userId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Tải lại dữ liệu khi màn hình `HomeEmployer` được focus
  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [])
  );

  const filteredData = jobs
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, visibleCount); // Show only `visibleCount` items

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 2); // Load 5 more jobs each time
  };

  const [selectedOrder, setSelectedOrder] = useState('');
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

  const handleSortChange = (itemValue: string) => {
    setSelectedOrder(itemValue);
    let filteredJobs = [...allJobs];
    if (itemValue === 'chooice status') {
      filteredJobs;
    }
    else if (itemValue === 'open') {
      filteredJobs = filteredJobs.filter(job => job.status === 'Mở');
    } else if (itemValue === 'pause') {
      filteredJobs = filteredJobs.filter(job => job.status === 'Tạm dừng');
    } else if (itemValue === 'close') {
      filteredJobs = filteredJobs.filter(job => job.status === 'Đã đóng');
    } else if (itemValue === 'chooice status') {
      filteredJobs = filteredJobs.filter(job => job.status === 'Chọn trạng thái');
    }
    setJobs(filteredJobs); // Update filtered jobs
    setVisibleCount(2); // Show all filtered jobs
  };
  const menuItems = [
    { title: 'Tạo mới', icon: 'add-circle-outline' },
    { title: 'Việc làm', icon: 'shopping-bag' },
    { title: 'Ứng viên', icon: 'people-outline' },
    { title: 'Phỏng vấn', icon: 'calendar-today' },
    { title: 'Phân tích', icon: 'bar-chart' },
    { title: 'Công cụ', icon: 'folder' },
  ];

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  console.log("data-----", filteredData)
  if(!jobs) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Không có việc làm nào!! Hãy tạo bài đăng việc làm mới!</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar />
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
                    closeMenu();
                    if (item.title === 'Tạo mới') {
                      navigation.navigate('JobPost'); // Navigate to JobPost
                    }
                    if (item.title === 'Việc làm') {
                      navigation.navigate('InforManager' as never); // Navigate to InforManager
                    }
                    if (item.title === 'Ứng viên') {
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
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home',{userId})}>
                  <Icon name="settings" size={25} color="#011F82" />
                  <Text style={styles.menuText}>Chuyển về trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={signOut}>
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
          <Text style={styles.orderText}>Trạng thái:</Text>
          <Picker
            selectedValue={selectedOrder}
            style={styles.picker}
            mode="dropdown"
            onFocus={() => Keyboard.dismiss()}
            onValueChange={handleSortChange}
            dropdownIconColor="#1976D2"
          >
            <Picker.Item label="Chọn trạng thái" value="chooice status" style={{ color: '#1976D2' }} />
            <Picker.Item label="Mở" value="open" style={{ color: '#1976D2' }} />
            <Picker.Item label="Tạm dừng" value="pause" style={{ color: '#1976D2' }} />
            <Picker.Item label="Đã đóng" value="close" style={{ color: '#1976D2' }} />
          </Picker>
        </View>
      </View>
      <ScrollView style={styles.cardContainer} contentContainerStyle={styles.scrollContent}>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('EmployerDetail', { jobId: item._id})}
          >
            <View style={styles.infoRow}>
              <Icon name="work-outline" size={20} color="#011F82" style={styles.icon} />
              <Text style={styles.jobTitle}>Chức vụ: {item.title}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="business" size={20} color="#011F82" style={styles.icon} />
              <Text style={styles.jobDetail}>Tên công ty: {item.company}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="location-on" size={20} color="#011F82" style={styles.icon} />
              <Text style={styles.jobDetail}>Địa điểm: {item.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="attach-money" size={20} color="#011F82" style={styles.icon} />
              <Text style={styles.jobDetail}>Mức lương: {item.salary}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="category" size={20} color="#011F82" style={styles.icon} />
              <Text style={styles.jobDetail}>Loại việc làm: {item.jobType}</Text>
            </View>
            {/* New view for job status */}
            <View style={styles.infoRow}>
              <Icon name="info" size={20} color="#011F82" style={styles.icon} />
              <Text style={[styles.jobDetail, styles.jobStatus, item.status === 'Mở' ? styles.statusOpen : item.status === 'Tạm dừng' ? styles.statusPaused : styles.statusClosed]}>
                Trạng thái: {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* "View More" button */}
        {visibleCount < jobs.length && (
          <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
            <Text style={styles.viewMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        )}
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
  scrollContent: {
    paddingBottom: 40, // Add padding to push the button up
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
    width: width * 0.65,
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
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusOpen: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusPaused: {
    color: 'orange',
    fontWeight: 'bold',
  },
  statusClosed: {
    color: 'red',
    fontWeight: 'bold',
  },
  jobStatus: {
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011F82',
  },
  jobDetail: {
    fontSize: 14,
    color: '#555',
  },
  viewMoreButton: {
    backgroundColor: '#011F82',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 18,
  },
});
