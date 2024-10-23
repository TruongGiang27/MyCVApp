import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
//Job Card Component
// Job Card Component
const JobCard = ({
  title,
  company,
  location,
  salary,
  jobType,
}: {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
}) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{company}</Text>
    <Text style={styles.jobLocation}>{location}</Text>
    <Text style={styles.jobSalary}>{salary}</Text>
    <Text style={styles.jobType}>{jobType}</Text>
  </View>
);

const JobList = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="menu-outline" size={28} />
        <Text style={styles.headerText}>MyCVApp</Text>
        <Icon name="person-circle-outline" size={28} />
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Chức danh, từ khóa hoặc công ty"
          style={styles.input}
        />
        <TextInput
          placeholder="Thành phố, tiểu bang, mã vùng..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Tìm việc</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Jobs Section */}
      <Text style={styles.sectionTitle}>Việc làm cho bạn</Text>

      <ScrollView contentContainerStyle={styles.jobList}>
        {/* Sample Job Cards */}
        <JobCard
          title="Unity Game Developer"
          company="Senspark"
          location="Thành phố Hồ Chí Minh"
          salary="30.000.000 đ / tháng"
          jobType="Toàn thời gian"
        />
        <JobCard
          title="Data Analyst Intern"
          company="YouNet"
          location="Thành phố Hồ Chí Minh"
          salary="Thực tập sinh"
          jobType="Thời gian linh hoạt"
        />
      </ScrollView>
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011F82',
  },
  searchSection: {
    padding: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B9D6F3',
  },
  searchButton: {
    backgroundColor: '#011F82',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 16,
    color: '#011F82',
  },
  jobList: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#011F82',
  },
  jobCompany: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 5,
  },
  jobLocation: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 5,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
  },
  jobType: {
    fontSize: 14,
    color: '#011F82',
  },
});
