import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';

const CreateEmployer = () => {
  const [companyName, setCompanyName] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [fullName, setFullName] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    if (companyName && numberOfEmployees && fullName && howDidYouHear && phoneNumber) {
      try {
        const employerData = {
          companyName,
          numberOfEmployees,
          fullName,
          howDidYouHear,
          phoneNumber,
        };
        console.log('Submitting employer data:', employerData);
        const response = await axios.post('http://192.168.0.121:3000/employers', employerData);
        Alert.alert('Thành công', 'Bạn đã đăng ký thành công');
      } catch (error) {
        console.error('Error creating employer:', error);
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra');
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Create Employer</Title>
          <TextInput
            label="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <TextInput
            label="Number of Employees"
            value={numberOfEmployees}
            onChangeText={setNumberOfEmployees}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <TextInput
            label="How Did You Hear About Us?"
            value={howDidYouHear}
            onChangeText={setHowDidYouHear}
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <Button mode="contained" onPress={handleSubmit}>Submit</Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
});

export default CreateEmployer;