import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const { width, height } = Dimensions.get('window');

const JobDetail = ({ navigation, route }: Props) => {
  const { jobId, disableButtons } = route.params ? route.params as { jobId: string, disableButtons: boolean } : { jobId: '', disableButtons: false };
  const [jobDetail, setJobDetail] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userId, userEmail } = route.params as { userId: string, userEmail: string };


  useEffect(() => {
    console.log('jobId', jobId);
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
        setJobDetail(response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const handleApplyNow = () => {
    setIsModalVisible(true);
  };

  const cancelApplyNow = () => {
    setIsModalVisible(false);
  };

  if (!jobDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không có thông tin công việc.</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Icon style={styles.arrow} name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.navigate('Home', { userId })} />
        <Text style={styles.headerText}>{jobDetail.title}</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        {/* Company and Location */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>Công ty {jobDetail.companyName}</Text>
          <Text style={styles.location}>Vị trí: {jobDetail.location}</Text>
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

        {/* New Apply Now Button */}
        <TouchableOpacity style={[styles.applyNowButton, disableButtons && styles.disabledButton]} onPress={handleApplyNow} disabled={disableButtons}>
          <Text style={styles.applyNowButtonText}>Ứng tuyển ngay</Text>
        </TouchableOpacity>

        {/* Apply Now Confirmation Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={cancelApplyNow}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Bạn có chắc chắn muốn ứng tuyển ngay?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Profile', { userId: userId, userEmail: userEmail, jobId: jobId, jobName: jobDetail.title, updated: false })}>
                  <Text style={styles.modalButtonText}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={cancelApplyNow}>
                  <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F4F9FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011F82',
  },
  arrow: {
    position: 'absolute',
    left: 0,
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
  applyNowButton: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10, // Add some margin to separate from the "Tạo CV" button
  },
  applyNowButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#011F82',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#011F82',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
});

export default JobDetail;