import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../utils/url';

const ManageCVsApplied = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/applications`);
        const jobs = response.data;

        const jobDetailsPromises = jobs.map(async (job: any) => {
          const jobDetailResponse = await axios.get(`${BASE_URL}/jobs/${job.jobId}`);
          return { ...job, ...jobDetailResponse.data };
        });

        const jobsWithDetails = await Promise.all(jobDetailsPromises);
        setAppliedJobs(jobsWithDetails);
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
        setError('Failed to fetch applied jobs.');
      }
    };

    fetchAppliedJobs();
  }, []);

  const renderJobItem = ({ item }: { item: { id: string; title: string; company: string; location: string; salary: string; type: string; status: string; jobId: string; } }) => (
    <View style={styles.jobCard} key={item.id}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.companyName}>{item.company}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.salaryType}>
        {item.salary} - {item.type}
      </Text>
      <Text style={styles.status}>
        Trạng thái: <Text style={styles.statusText}>{item.status}</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobDetail', { jobId: item.jobId, disableButtons: true })}>
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

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
          data={appliedJobs}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())} // Ensure the key is a string and handle missing ids
          renderItem={renderJobItem}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    marginRight: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011F82',
    marginLeft: '25%',
  },
  listContent: {
    paddingBottom: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#B9D6F3',
    borderWidth: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011F82',
  },
  companyName: {
    fontSize: 14,
    color: '#6D92D0',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#6D92D0',
    marginTop: 4,
  },
  salaryType: {
    fontSize: 14,
    color: '#011F82',
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    color: '#6D92D0',
    marginTop: 4,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#011F82',
  },
  button: {
    backgroundColor: '#011F82',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ManageCVsApplied;
