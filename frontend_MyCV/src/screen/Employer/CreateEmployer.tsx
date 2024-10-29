//Giang 
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Text } from 'react-native-paper';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CreateEmployer: undefined;
  InforEmployer: undefined;
  HomeEmployer: undefined;
};

// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateEmployer'
>;

type Props = {
  navigation: CreateEmployerScreenNavigationProp;
};

const CreateEmployer: React.FC<Props> = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [fullName, setFullName] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [describe, setDescribe] = useState('');
  const [error, setError] = useState('');


  const handlePickerFocus = () => {
    Keyboard.dismiss();
  };

  const validatePhoneNumber = (text: string) => {
    const phoneRegex = /^0\d{0,9}$/;
    if (text === '' || phoneRegex.test(text)) {
      setError('');
      setPhoneNumber(text);
    } else {
      setError('Số điện thoại phải bắt đầu bằng 0. Ví dụ: 0987654321');
    }
  };

  const handleSubmit = async () => {
    if (selectedCompany && companyName && numberOfEmployees && fullName && howDidYouHear && phoneNumber && describe) {
      try {
        const employerData = {
          selectedCompany,
          companyName,
          numberOfEmployees,
          fullName,
          howDidYouHear,
          phoneNumber,
          describe,
        };
        console.log('Submitting employer data:', employerData);
        const response = await axios.post('http://192.168.1.5:3000/employers', employerData);
        Alert.alert('Thành công', 'Bạn đã đăng ký thành công');
        navigation.navigate("HomeEmployer");
      } catch (error) {
        console.error('Error creating employer:', error);
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra');
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
    }
  };


  return (
    <KeyboardAvoidingView
      behavior="padding">

      <ScrollView>
        <View style={styles.container}>
          <Title style={styles.title}>Tạo Tài Khoản Nhà Tuyển Dụng </Title>
          <Image style={styles.imgBg}
            source={require('../../../assets/images/bgImg.png')}
          />
          <Text style={styles.subtitle}>Bạn chưa đăng việc làm nào trước đây, vì vậy bạn cần tạo một tài khoản nhà tuyển dụng.*</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.subtitle}>Tên của công ty</Title>
              <TextInput
                label="Tên công ty"
                value={companyName}
                onChangeText={setCompanyName}
                style={styles.input}
                textColor='#6D92D0'
                mode="outlined"
                theme={{
                  colors: {
                    primary: '#011F82', // Màu viền khi focus
                    outline: '#B9D6F3', // Màu viền bình thường
                  },
                }}
              />
              <Title style={styles.subtitle}>Số lượng nhân viên</Title>
              <Picker
                selectedValue={numberOfEmployees}
                onValueChange={(itemValue: string, itemIndex: number) => setNumberOfEmployees(itemValue)}
                onFocus={handlePickerFocus}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Chọn một tùy chọn" value="choose" />
                <Picker.Item label="1-10" value="1-10" />
                <Picker.Item label="11-50" value="11-50" />
                <Picker.Item label="51-100" value="51-100" />
                <Picker.Item label="101-500" value="101-500" />
                <Picker.Item label="501-1000" value="501-1000" />
              </Picker>
              <Title style={styles.subtitle}>Họ và tên của bạn</Title>

              <TextInput
                label="Hãy nhập họ và tên của bạn"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                textColor='#6D92D0'
                mode="outlined"
                theme={{ colors: { primary: '#011F82', outline: '#6D92D0' } }} // Changed text color
              />
              <Title style={styles.subtitle}>Bạn biết đến tôi từ đâu</Title>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={howDidYouHear}
                  onValueChange={(itemValue: string, itemIndex: number) => setHowDidYouHear(itemValue)}
                  onFocus={handlePickerFocus}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Chọn một tùy chọn" value="choose" />
                  <Picker.Item label="Facebook" value="facebook" />
                  <Picker.Item label="Google" value="google" />
                  <Picker.Item label="LinkedIn" value="linkedIn" />
                  <Picker.Item label="Twitter" value="twitter" />
                  <Picker.Item label="Từ bạn bè" value="friends" />
                  <Picker.Item label="Từ gia đình" value="family" />
                  <Picker.Item label="Từ đối tác" value="partner" />
                  <Picker.Item label="Từ khách hàng" value="customer" />
                  <Picker.Item label="Từ nhân viên" value="employee" />
                  <Picker.Item label="Từ nhà cung cấp" value="supplier" />
                  <Picker.Item label="Từ người khác" value="other" />
                </Picker>
              </View>

              <Title style={styles.subtitle}>Thêm số điện thoại của bạn</Title>
              <Text style={styles.text}>Dành cho giao tiếp quản lý tài khoản. Không hiển thị cho người tìm việc.*</Text>
              <TextInput
                label="Nhập số điện thoại của bạn"
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
                keyboardType="decimal-pad"
                textColor='#6D92D0'
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: '#011F82', outline: '#6D92D0' } }}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button mode="contained" onPress={handleSubmit} style={styles.button}>Submit</Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imgBg: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 10,
    lineHeight: 50,
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#011F82',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D92D0',
    textAlign: 'left',
  },
  text:{
    fontSize: 14,
    marginBottom: 5,
    paddingBottom: 5,
    color: '#6D92D0',
    fontStyle: 'italic',
  },
  describe: {
    fontSize: 14,
    marginBottom: 5,
    color: '#6D92D0',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#B9D6F3',
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    color: '#6D92D0',
  },
  pickerItem: {
    fontSize: 16,
    color: '#6D92D0',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    color: 'red',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6D92D0',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },

});

export default CreateEmployer;