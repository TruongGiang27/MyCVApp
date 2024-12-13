import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../../components/Navbar';
import ScreenName from '../../constants/ScreenName';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const { width, height } = Dimensions.get('window');

const FavoriteJob = ({ navigation, route }: Props)=> {
  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    const loadBookmarkedJobs = async () => {
      try {
        const bookmarkedJobsString = await AsyncStorage.getItem('bookmarkedJobs');
        const bookmarkedJobs = bookmarkedJobsString ? JSON.parse(bookmarkedJobsString) : [];
        const validBookmarkedJobs = bookmarkedJobs.filter((job: any) => job && job._id); // Filter out invalid jobs
        setJobs(validBookmarkedJobs);
      } catch (error) {
        console.error("Failed to load bookmarked jobs:", error);
      }
    };
    loadBookmarkedJobs();
  }, []);

  const renderJobItem = ({ item }: { item: { _id: string; title: string; companyName: string; location: string; salary: string; status: string } }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.salary}>{item.salary}</Text>
      <Text style={[styles.status, item.status === 'Mở' ? styles.open : styles.closed]}>
        Trạng thái: {item.status}
      </Text>
      <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('JobDetail', { jobId: item._id })}>
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#011F82" />
        </TouchableOpacity>
        <Text style={styles.header}>Công việc yêu thích</Text>
      </View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id.toString()} // Ensure the key is a string
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContainer}
      />
      <Navbar navigation={navigation} route={route} />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#B9D6F3',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011F82',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 8,
  },
  salary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#011F82',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  open: {
    color: '#28A745',
  },
  closed: {
    color: '#DC3545',
  },
  detailButton: {
    backgroundColor: '#011F82',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Điều chỉnh khoảng cách giữa các phần tử
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  backButton: {
    //   padding: 8, // Làm cho nút mũi tên dễ bấm hơn
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011F82',
    textAlign: 'center', // Đặt tiêu đề ở giữa
    flex: 1, // Chiếm phần không gian còn lại
  },
});

export default FavoriteJob;