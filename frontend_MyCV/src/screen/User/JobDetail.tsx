import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CVCreate: { startStep: number };
  JobList: undefined;
  JobDetail: { jobId: string };
};

const JobDetail = () => {
  const route = useRoute();
  const { jobId } = route.params ? route.params as { jobId: string } : { jobId: '' };
  const [jobDetail, setJobDetail] = useState<any>(null);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Add the new navigation prop
  const navigationCVCreate = useNavigation<NavigationProp<RootStackParamList>>();


  useEffect(() => {
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

  const handleEditAndCreate = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cv_form`);
      const hasCV = response.data.length > 0;
      console.log('Has CV:', hasCV);

      if (hasCV) {
        navigationCVCreate.navigate('CVCreate', { startStep: 10, jobId } as never);
      } else {
        navigationCVCreate.navigate('CVCreate', { startStep: 1, jobId } as never);
      }
    } catch (error) {
      console.error('Error checking CV:', error);
    }
  };

  const handleApplyNow = () => {
    setIsModalVisible(true);
  };

  const confirmApplyNow = async () => {
    setIsModalVisible(false);
    try {
      const response = await axios.get(`${BASE_URL}/cv_form`);
      const cv = response.data[0]; // Assuming the first CV is the one to be used
      if (cv) {
        const cvId = cv._id;
        const CVfullNameUser = cv.fullName;
        const CVEmailUser = cv.email;
        const status = 'applied';
        const jobName = jobDetail.title;
        const userId = cv.userId;

        // Check if the application already exists with both cvId and jobId
        const existingApplicationResponse = await axios.get(`${BASE_URL}/applications?cvId=${cvId}&jobId=${jobId}&userId=${userId}`);
        console.log('Google ID Job Detail:', userId);
        if (existingApplicationResponse.data.some((application: any) => application.cvId === cvId && application.jobId === jobId && application.userId === userId )) {
          Alert.alert('Thông báo', 'Bạn đã ứng tuyển vào công việc này rồi!');
          console.log('data', existingApplicationResponse.data);
        } else {
          await axios.post(`${BASE_URL}/applications`, { cvId, jobId, jobName, CVfullNameUser, CVEmailUser, status, userId });
          console.log('Application submitted successfully');
          Alert.alert('Thành công', 'Bạn đã ứng tuyển thành công!');
        }
      } else {
        console.error('No CV found to apply with');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <Icon style={styles.arrow} name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.navigate("JobList" as never)} />
        <Text style={styles.headerText}>{jobDetail.title}</Text>
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
      <TouchableOpacity style={styles.applyButton} onPress={handleEditAndCreate}>
        <Text style={styles.applyButtonText}>Chỉnh sửa / Tạo CV</Text>
      </TouchableOpacity>

      {/* New Apply Now Button */}
      <TouchableOpacity style={styles.applyNowButton} onPress={handleApplyNow}>
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
              <TouchableOpacity style={styles.modalButton} onPress={confirmApplyNow}>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
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
});

export default JobDetail;