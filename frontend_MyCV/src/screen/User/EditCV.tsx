import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const EditCV = ({ navigation, route }: Props) => {
  const { cvId } = route.params as { cvId: string };
  const [user, setUser] = useState<any>();
  const [userId, setUserId] = useState('');
  const {userEmail, jobId, jobName} = route.params as {userEmail: string, jobId: string, jobName: string};
  const [formData, setFormData] = useState({
    _id: '',
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    address: {
      country: '',
      city: '',
      address: '',
      zipCode: '',
    },
    education: {
      educationLevel: '',
      fieldOfStudy: '',
      schoolName: '',
      educationCountry: '',
      educationCity: '',
      educationStartDate: '',
      educationEndDate: '',
    },
    experience: {
      companyName: '',
      jobTitle: '',
      workCountry: '',
      workCity: '',
      workStartDate: '',
      workEndDate: '',
    },
    skills: '',
    certifications: '',
    birthDate: '',
    summary: '',
    jobPreferences: {
      desiredJobTitle: '',
      jobType: '',
      minimumSalary: '',
    }});
  useEffect(() => {
    const getInfo = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parse = JSON.parse(userInfo);
        setUser(parse)
        setUserId(parse.data.id);
        console.log('userInfo',parse);
        console.log('userId', userId);
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    if (userId) {
      console.log('userId', userId);
    }
  }, [userId]);

  const [loading, setLoading] = useState(false);

  const fetchCVData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/cv_form/${cvId}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu CV:', error);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu CV. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVData();
  }, [cvId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  const handleJobPreferencesChange = (field: string, value: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      jobPreferences: {
        ...prevFormData.jobPreferences,
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${BASE_URL}/cv_form/${cvId}`, formData);
      Alert.alert('Thành công', 'Cập nhật CV thành công!');
      navigation.navigate('Profile', { userId: userId, userEmail: userEmail, jobId: jobId, jobName: jobName , updated: true });
    } catch (error) {
      console.error('Lỗi khi cập nhật CV:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật CV. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon style={styles.arrow} name="arrow-back-outline" size={28} color="#fffff" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Chỉnh sửa CV</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={styles.input}
          value={formatDate(formData.birthDate)}
          onChangeText={(text) => handleInputChange('birthDate', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quốc gia</Text>
        <TextInput
          style={styles.input}
          value={formData.address.country}
          onChangeText={(text) => handleInputChange('country', text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Thành phố</Text>
        <TextInput
          style={styles.input}
          value={formData.address.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          value={formData.address.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mã bưu điện</Text>
        <TextInput
          style={styles.input}
          value={formData.address.zipCode}
          onChangeText={(text) => handleInputChange('zipCode', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Trình độ học vấn</Text>
        <TextInput
          style={styles.input}
          value={formData.education.educationLevel}
          onChangeText={(text) => handleInputChange('educationLevel', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngành học</Text>
        <TextInput
          style={styles.input}
          value={formData.education.fieldOfStudy}
          onChangeText={(text) => handleInputChange('fieldOfStudy', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tên trường</Text>
        <TextInput
          style={styles.input}
          value={formData.education.schoolName}
          onChangeText={(text) => handleInputChange('schoolName', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quốc gia</Text>
        <TextInput
          style={styles.input}
          value={formData.education.educationCountry}
          onChangeText={(text) => handleInputChange('educationCountry', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Trường học thuộc thành phố </Text>
        <TextInput
          style={styles.input}
          value={formData.education.educationCity}
          onChangeText={(text) => handleInputChange('educationCity', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày bắt đầu học</Text>
        <TextInput
          style={styles.input}
          value={formatDate(formData.education.educationStartDate)}
          onChangeText={(text) => handleInputChange('educationStartDate', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày kết thúc học</Text>
        <TextInput
          style={styles.input}
          value={formatDate(formData.education.educationEndDate)}
          onChangeText={(text) => handleInputChange('educationEndDate', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tên công ty</Text>
        <TextInput
          style={styles.input}
          value={formData.experience.companyName}
          onChangeText={(text) => handleInputChange('companyName', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chức vụ</Text>
        <TextInput
          style={styles.input}
          value={formData.experience.jobTitle}
          onChangeText={(text) => handleInputChange('jobTitle', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quốc gia</Text>
        <TextInput
          style={styles.input}
          value={formData.experience.workCountry}
          onChangeText={(text) => handleInputChange('workCountry', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Thành phố</Text>
        <TextInput
          style={styles.input}
          value={formData.experience.workCity}
          onChangeText={(text) => handleInputChange('workCity', text)}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày bắt đầu làm việc</Text>
        <TextInput
          style={styles.input}
          value={formatDate(formData.experience.workStartDate)}
          onChangeText={(text) => handleInputChange('workStartDate', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày kết thúc làm việc</Text>
        <TextInput
          style={styles.input}
          value={formatDate(formData.experience.workEndDate)}
          onChangeText={(text) => handleInputChange('workEndDate', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Kỹ năng</Text>
        <TextInput
          style={styles.input}
          value={formData.skills}
          onChangeText={(text) => handleInputChange('skills', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chứng chỉ</Text>
        <TextInput
          style={styles.input}
          value={formData.certifications}
          onChangeText={(text) => handleInputChange('certifications', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mô tả về bản thân</Text>
        <TextInput
          style={styles.input}
          value={formData.summary}
          onChangeText={(text) => handleInputChange('summary', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vị trí mong muốn</Text>
        <TextInput
          style={styles.input}
          value={formData.jobPreferences.desiredJobTitle}
          onChangeText={(text) => handleInputChange('desiredJobTitle', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Loại công việc</Text>
        <TextInput
          style={styles.input}
          value={formData.jobPreferences.jobType}
          onChangeText={(text) => handleInputChange('jobType', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mức lương mong muốn</Text>
        <TextInput
          style={styles.input}
          value={formData.jobPreferences.minimumSalary}
          onChangeText={(text) => handleJobPreferencesChange('minimumSalary', text)}
        />
      </View>

      {/* Thêm các trường khác như địa chỉ, kỹ năng, học vấn, kinh nghiệm... */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#011F82',
    padding: 16,
    borderRadius: 10,
  },
  arrow: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  inputGroup: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },

  saveButton: {
    backgroundColor: '#011F82',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#3333',
  },

  scrollViewContent: {
    paddingVertical: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#011F82',
    marginBottom: 10,
  },

  inputMultiline: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: 60,
    textAlignVertical: 'top',
  },
});

export default EditCV;
