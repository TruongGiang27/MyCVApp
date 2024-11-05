//Uyên
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


// Navigation
export type RootStackParamList = {
  EmployerDetail: undefined;
  JobPost: undefined;
};

const EmployerDetail = () => {
  const route = useRoute();
  const { jobDetails } = route.params as { jobDetails: any };
  const navigation = useNavigation();

  if (!jobDetails) {
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
        <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{jobDetails.title}</Text>
        <Icon name="share-social-outline" size={28} color="#011F82" />
      </View>

      {/* Company and Location */}
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{jobDetails.company}</Text>
        <Text style={styles.location}>{jobDetails.location}</Text>
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
      <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('JobPost' as never)}>
        <Text style={styles.applyButtonText}>Tạo đơn tuyển dụng mới</Text>
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

export default EmployerDetail;
