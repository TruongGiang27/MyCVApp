// src/screen/JobList.tsx
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type JobListScreenProps = NativeStackNavigationProp<any, 'JobList'>;

const JobList: React.FC = () => {
  const navigation = useNavigation<JobListScreenProps>();

  const jobs = [
    { id: '1', title: 'Kỹ sư phần mềm' },
    { id: '2', title: 'Nhân viên kinh doanh' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Button
              title="Xem chi tiết"
              onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 12 },
});

export default JobList;
