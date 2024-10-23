// src/screen/JobDetail.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  JobDetail: { jobId: string };
};

type JobDetailProps = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

const JobDetail: React.FC<JobDetailProps> = ({ route, navigation }) => {
  const { jobId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết công việc</Text>
      <Text>Mã công việc: {jobId}</Text>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
});

export default JobDetail;
