import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../../components/NavbarEmployer';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

interface cv {
  _id: string;
  userId: string;
  jobId: string;
  jobName: string;
  cvId: string;
  CVfullNameUser: string;
  CVEmailUser: string;
  status: string;

}



const ManageCVsApplied = ({ navigation, route }: Props) => {
  const [appliedJobs, setAppliedJobs] = useState<cv[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { cvId, disableButtons, jobId, userId } = route.params ? route.params as { cvId: string, disableButtons: boolean, jobId: string, userId: string } : { cvId: '', disableButtons: false, jobId: '', userId: '' };
  const [user, setUser] = useState<any>({});
  console.log("userId", userId);
  useEffect(() => {
    const getInfo = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    };
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/applications/user/${userId}`);
        if (response.data) {
          setAppliedJobs(response.data); // Đặt dữ liệu trực tiếp thay vì stringify/parse
          console.log('Applied Jobs:', response.data);
        }
      } catch (err) {
        console.error('Failed to fetch applied jobs:', err);
        setError('Failed to fetch applied jobs.');
      }
    };

    getInfo();
    fetchAppliedJobs();
  }, [userId]); // Thêm `userId` để đảm bảo useEffect chạy đúng với props thay đổi.


  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#011F82" />
        </TouchableOpacity>
        <Text style={styles.header}>CVs đã nộp</Text>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={appliedJobs.filter((cv) => cv.userId === userId)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cvItem}
              onPress={() => navigation.navigate('CVInfor', { cvId: item.cvId })}
            >
              <Text style={styles.cvTitle}>Họ tên: {item.CVfullNameUser}</Text>
              <Text style={styles.cvtext}>Email: {item.CVEmailUser}</Text>
              <Text style={styles.cvtext}>Tình trạng CV: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Navbar navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9FF',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#011F82',
    marginLeft: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  cvItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cvTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011F82',
  },
  cvtext: {
    fontSize: 16,
    color: '#011F82',
  },
  allicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  icon: {
    backgroundColor: '#011F82',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  icondelete: {
    backgroundColor: '#011F82',
    padding: 8,
    borderRadius: 8,
  },

});

export default ManageCVsApplied;
