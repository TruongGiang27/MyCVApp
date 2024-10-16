// HomeScreen.tsx
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Title } from 'react-native-paper';

const CreateEmployer = () => {
  const [companyName, setCompanyName] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [fullName, setFullName] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (companyName && numberOfEmployees && fullName && howDidYouHear && phoneNumber) {
      Alert.alert('Success', 'Employer created successfully');
    } else {
      Alert.alert('Error', 'Failed to create employer');
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
            label="How Did You Hear"
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
          <Button mode="contained" onPress={handleSubmit} style={styles.button} color="#6200ee">
            Create Employer
          </Button>
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
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default CreateEmployer;