import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../utils/url';

const EmployerDetail = () => {
  const route = useRoute();
  const { jobDetails } = route.params as { jobDetails: any };
  const navigation = useNavigation();
  // State to manage job status selection
  const [jobStatus, setJobStatus] = useState(jobDetails.status);
  const handleStatusChange = async (newStatus: string) => {
    setJobStatus(newStatus); // Cập nhật trạng thái trong giao diện

    try {
      // Gửi yêu cầu cập nhật trạng thái lên server
      const response = await axios.put(`${BASE_URL}/jobs/${jobDetails._id}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        Alert.alert("Thành công", "Trạng thái công việc đã được cập nhật.");
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật trạng thái.");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      Alert.alert("Lỗi", "Không thể kết nối với server.");
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{jobDetails.title}</Text>
        <Icon name="share-social-outline" size={28} color="#011F82" />
      </View>

      {/* Company and Location */}
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{jobDetails.company}</Text>
        <Text style={styles.location}>{jobDetails.location}</Text>
      </View>
      {/* Job Status */}
      <View style={styles.statusContainer}>
        <Icon name="information-circle-outline" size={20} color="#011F82" />
        <Text style={styles.statusLabel}>Trạng thái:</Text>
        <Picker
          selectedValue={jobStatus}
          style={styles.statusPicker}
          onValueChange={(itemValue) => handleStatusChange(itemValue)}
        >
          <Picker.Item label="Mở" value="Mở" />
          <Picker.Item label="Tạm dừng" value="Tạm dừng" />
          <Picker.Item label="Đã đóng" value="Đã đóng" />
        </Picker>
      </View>

      {/* Job Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chi tiết công việc</Text>
        <View style={styles.detailRow}>
          <Icon name="pricetag-outline" size={20} color="#10B981" />
          <Text style={styles.detailText}>{jobDetails.salary}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="briefcase-outline" size={20} color="#011F82" />
          <Text style={styles.detailText}>{jobDetails.jobType}</Text>
        </View>
      </View>

      {/* Job Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
        <Text style={styles.description}>{jobDetails.jobDescription}</Text>
      </View>

      {/* Requirements */}
      {jobDetails.requirements && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
          <Text style={styles.description}>{jobDetails.requirements}</Text>
        </View>
      )}

      {/* Benefits */}
      {jobDetails.benefits && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quyền lợi được hưởng</Text>
          <Text style={styles.description}>{jobDetails.benefits}</Text>
        </View>
      )}

      {/* Additional Information */}
      {jobDetails.additionalInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Hạn nộp: {jobDetails.additionalInfo.deadline}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="briefcase-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Kinh nghiệm: {jobDetails.additionalInfo.experience}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="school-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Trình độ học vấn: {jobDetails.additionalInfo.education}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="people-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Số lượng cần tuyển: {jobDetails.additionalInfo.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="male-female-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Giới tính: {jobDetails.additionalInfo.gender}</Text>
          </View>
        </View>
      )}

      {/* Apply Button */}
      <View style={styles.btn}>
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('JobPost' as never)}>
          <Text style={styles.applyButtonText}>Tạo đơn tuyển dụng mới</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewcv} onPress={() => navigation.navigate('ApplyManager' as never)}>
          <Text style={styles.applyButtonText}>Xem thông tin ứng viên</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default EmployerDetail;
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#011F82',
  },
  companyInfo: {
    marginBottom: 16,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#011F82',
    marginBottom: 4,
  },
  location: {
    fontSize: 20,
    color: '#6D92D0',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 18,
    marginLeft: 8,
    color: '#011F82',
  },
  statusPicker: {
    flex: 1,
    marginLeft: 8,
    color: '#011F82',
  },
  statusText: {
    fontSize: 18,
    marginLeft: 8,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
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
    fontSize: 18,
    color: '#011F82',
  },
  description: {
    fontSize: 18,
    color: '#4B5563',
    lineHeight: 22,
  },
  applyButton: {
    width: '48%',
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
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  viewcv: {
    width: '48%',
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
