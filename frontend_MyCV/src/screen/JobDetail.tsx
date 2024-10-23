import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// JobDetail Component
const JobDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="arrow-back-outline" size={28} color="#011F82" />
          <Text style={styles.headerText}>Unity Game Developer</Text>
          <Icon name="share-social-outline" size={28} color="#011F82" />
        </View>

        {/* Company and Location */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>Senspark</Text>
          <Text style={styles.location}>Thành phố Hồ Chí Minh</Text>
        </View>

        {/* Job Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết công việc</Text>
          <View style={styles.detailRow}>
            <Icon name="pricetag-outline" size={20} color="#10B981" />
            <Text style={styles.detailText}>30.000.000 đ / tháng</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="briefcase-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Toàn thời gian</Text>
          </View>
        </View>

        {/* Job Brief Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả công việc (Tóm tắt)</Text>
          <Text style={styles.description}>
            Phát triển trò chơi sử dụng Unity, làm việc cùng nhóm để tối ưu hóa sản phẩm và đảm bảo chất lượng dự án.
          </Text>
        </View>

        {/* Detailed Job Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả công việc (Chi tiết)</Text>
          <Text style={styles.description}>
            - Phát triển các trò chơi sử dụng nền tảng Unity.
            {'\n'}- Làm việc cùng nhóm để tối ưu hóa sản phẩm.
            {'\n'}- Đảm bảo tiến độ và chất lượng dự án.
            {'\n'}- Tạo và triển khai các giải pháp sáng tạo để cải thiện trải nghiệm người chơi.
            {'\n'}- Phân tích và giải quyết các vấn đề kỹ thuật trong quá trình phát triển.
            {'\n'}- Tham gia vào quy trình thiết kế và phát triển các tính năng mới.
            {'\n'}- Thực hiện kiểm tra và gỡ lỗi để đảm bảo chất lượng sản phẩm.
            {'\n'}- Cập nhật kiến thức và kỹ năng công nghệ mới liên quan đến phát triển trò chơi.
          </Text>
        </View>

        {/* Candidate Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yêu cầu ứng viên</Text>
          <Text style={styles.description}>
            - Có kinh nghiệm làm việc với Unity.
            {'\n'}- Kỹ năng làm việc nhóm tốt.
            {'\n'}- Tư duy logic và giải quyết vấn đề tốt.
          </Text>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quyền lợi được hưởng</Text>
          <Text style={styles.description}>
            - Lương cạnh tranh.
            {'\n'}- Thưởng theo hiệu quả công việc.
            {'\n'}- Cơ hội làm việc trong môi trường sáng tạo.
          </Text>
        </View>

        {/* Updated Details from Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
          <View style={styles.detailRow}>
            <Icon name="location-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>TPHCM</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="cash-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>30.000.000 VND / tháng</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Hạn nộp: 31/10/2024</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="briefcase-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Không yêu cầu kinh nghiệm</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="school-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Bằng cấp: Cao đẳng</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="people-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Số lượng cần tuyển: 1</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="male-female-outline" size={20} color="#011F82" />
            <Text style={styles.detailText}>Giới tính: Không yêu cầu</Text>
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
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
    marginBottom: 4,
    color: '#011F82',
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
    marginBottom: 8,
    color: '#011F82',
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

