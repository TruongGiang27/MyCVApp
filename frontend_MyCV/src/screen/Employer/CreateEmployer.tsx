//Giang 
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Text } from 'react-native-paper';
import { RootStackParamList } from '../User/types';
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
        const response = await axios.post('http://10.106.22.119:3000/employers', employerData);
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
          <Title style={styles.title}>Tạo đơn tuyển dụng</Title>
          <Image style={styles.imgBg}
            source={require('../../../assets/images/bgImg.png')}
          />
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.subtitle}>Ngành của công ty</Title>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCompany}
                  onValueChange={(itemValue: string, itemIndex: number) => setSelectedCompany(itemValue)}
                  onFocus={handlePickerFocus}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dialog">
                  <Picker.Item label="Chọn một tùy chọn" value="choose" />
                  <Picker.Item label="Bán lẻ và buôn bán" value="sales" />
                  <Picker.Item label="Bảo hiểm" value="insurance" />
                  <Picker.Item label="Công nghệ" value="technology" />
                  <Picker.Item label="Dịch vụ" value="service" />
                  <Picker.Item label="Giáo dục" value="education" />
                  <Picker.Item label="IT" value="IT" />
                  <Picker.Item label="Y tế" value="healthcare" />
                  <Picker.Item label="Xây dựng" value="construction" />
                  <Picker.Item label="Bất động sản" value="realEstate" />
                </Picker>
              </View>

              <Title style={styles.subtitle}>Tên của công ty</Title>
              <TextInput
                label="Tên công ty"
                value={companyName}
                onChangeText={setCompanyName}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: '#6200ee', outline: '#E4E0E1' } }}
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
                mode="outlined"
                theme={{ colors: { primary: '#6200ee', outline: '#E4E0E1', text: '#FF5733' } }} // Changed text color
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

              <Title style={styles.subtitle}>Mô tả công ty</Title>
              <Text style={styles.describe}>Giới thiệu công ty của bạn
                với mọi người trong vài dòng ngắn gọn.</Text>

              <TextInput
                placeholder="Giới thiệu công ty của bạn bằng cách nói về hoạt động kinh doanh, vị trí thị trường của bạn, văn hóa công ty của bạn, v.v."
                value={describe}
                onChangeText={setDescribe}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="gray"
                style={styles.input}
                theme={{ colors: { primary: '#6D92D0', outline: '#6D92D0' } }}
              />
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
    color: '#011F82',
    textAlign: 'left',
  },
  describe: {
    fontSize: 14,
    marginBottom: 5,
    color: '#6D92D0',
  },
  pickerContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E0E1',
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
  },
  pickerItem: {
    fontSize: 16,
    color: 'blue',
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
  },
  error: {
    color: 'red',
    marginTop: 5,
  },

});

export default CreateEmployer;