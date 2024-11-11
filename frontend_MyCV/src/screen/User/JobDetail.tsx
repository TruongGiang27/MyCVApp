import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CVCreate: { startStep: number };

};

const JobDetail = () => {
  const route = useRoute();
  const { jobId } = route.params as { jobId: string };
  const [jobDetail, setJobDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
        setJobDetail(response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const handleApply = async () => {
    // const navigation = useNavigation<NavigationProp<any>>();
    try {
      const response = await axios.get(`${BASE_URL}/cv_form`);
      const hasCV = response.data.length > 0;
      console.log('Has CV:', hasCV);

      if (hasCV) {
        navigation.navigate('CVCreate', { startStep: 10 });
      } else {
        navigation.navigate('CVCreate', { startStep: 1 });
      }
    } catch (error) {
      console.error('Error checking CV:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#011F82" />
      </View>
    );
  }

  if (!jobDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có thông tin công việc.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.navigate("JobList" as never)}/>
        <Text style={styles.headerText}>{jobDetail.title}</Text>
        <Icon name="share-social-outline" size={28} color="#011F82" />
      </View>

      {/* Company and Location */}
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{jobDetail.company}</Text>
        <Text style={styles.location}>{jobDetail.location}</Text>
      </View>

      {/* Job Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chi tiết công việc</Text>
        <View style={styles.detailRow}>
          <Icon name="pricetag-outline" size={20} color="#10B981" />
          <Text style={styles.detailText}>{jobDetail.salary}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="briefcase-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>{jobDetail.jobType}</Text>
        </View>
      </View>

      {/* Job Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
        <Text style={styles.description}>{jobDetail.jobDescription}</Text>
      </View>

      {/* Requirements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
        <Text style={styles.description}>{jobDetail.requirements}</Text>
      </View>

      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quyền lợi được hưởng</Text>
        <Text style={styles.description}>{jobDetail.benefits}</Text>
      </View>

      {/* Additional Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>Hạn nộp: {jobDetail.additionalInfo?.deadline}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="briefcase-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>Kinh nghiệm: {jobDetail.additionalInfo?.experience}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="school-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>Trình độ học vấn: {jobDetail.additionalInfo?.education}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="people-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>Số lượng cần tuyển: {jobDetail.additionalInfo?.quantity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="male-female-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>Giới tính: {jobDetail.additionalInfo?.gender}</Text>
        </View>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011F82',
  },
  companyInfo: {
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#011F82',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6D92D0',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#011F82',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#011F82',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  applyButton: {
    backgroundColor: '#011F82',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default JobDetail;