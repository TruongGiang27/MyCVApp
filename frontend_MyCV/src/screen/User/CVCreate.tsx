import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  JobDetail: { jobId: string };
};

type JobDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JobDetail'>;
type JobDetailScreenRouteProp = RouteProp<RootStackParamList, 'JobDetail'>;

interface Props {
  navigation: JobDetailScreenNavigationProp;
  route: JobDetailScreenRouteProp;
}

// Define the type for the route parameters
type RouteParams = {
    startStep: number;
    jobId: string;
};

const CVCreate = () => {
  const { control, handleSubmit, setValue, trigger, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const navigation = useNavigation();
  const route = useRoute<JobDetailScreenRouteProp>();
  const { startStep } = route.params as RouteParams || {};
  const [currentStep, setCurrentStep] = useState(startStep || 1);
  const navigationJobDetail = useNavigation<JobDetailScreenNavigationProp>();

  type FormData = {
    [key: string]: any;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    zipCode: string;
    educationLevel: string;
    fieldOfStudy: string;
    schoolName: string;
    educationCountry: string;
    educationCity: string;
    educationStartDate: Date;
    educationEndDate: Date;
    jobTitle: string;
    companyName: string;
    workCountry: string;
    workCity: string;
    workStartDate: Date;
    workEndDate: Date;
    workExperience: string;
    certifications: string;
    birthDate: Date;
    educationDescription: string;
    highestEducationLevel: string;
    highestJobLevel: string;
    desiredJobTitle: string;
    jobType: string;
    minimumSalary: string;
    summary: string;
    skills: string[];
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    educationLevel: '',
    fieldOfStudy: '',
    schoolName: '',
    educationCountry: '',
    educationCity: '',
    educationStartDate: new Date(),
    educationEndDate: new Date(),
    jobTitle: '',
    companyName: '',
    workCountry: '',
    workCity: '',
    workStartDate: new Date(),
    workEndDate: new Date(),
    workExperience: '',
    certifications: '',
    birthDate: new Date(),
    educationDescription: '',
    highestEducationLevel: '',
    highestJobLevel: '',
    desiredJobTitle: '',
    jobType: '',
    minimumSalary: '',
    summary: '',
    skills: [],
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showWorkStartDatePicker, setShowWorkStartDatePicker] = useState(false);
  const [showWorkEndDatePicker, setShowWorkEndDatePicker] = useState(false);
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [editingFields, setEditingFields] = useState<{ [key: string]: boolean }>({}); // Track editing status for each field

  // Load form data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem('formData');
        console.log('formData.fullName:', formData.fullName)
        if (savedFormData) {
          const parsedFormData = JSON.parse(savedFormData);
          // Convert date strings back to Date objects
          parsedFormData.educationStartDate = new Date(parsedFormData.educationStartDate);
          parsedFormData.educationEndDate = new Date(parsedFormData.educationEndDate);
          parsedFormData.workStartDate = new Date(parsedFormData.workStartDate);
          parsedFormData.workEndDate = new Date(parsedFormData.workEndDate);
          parsedFormData.birthDate = new Date(parsedFormData.birthDate);
          setFormData(parsedFormData);
          setSelectedSkills(parsedFormData.skills || []);

          // Set initial values for form fields
          Object.keys(parsedFormData).forEach((key) => {
            setValue(key, parsedFormData[key]);
          });

          // Trigger validation for the first screen
          trigger(['fullName', 'email']);
        }
      } catch (error) {
        console.error('Failed to load form data:', error);
      }
    };

    loadFormData();
  }, [setValue, trigger]);

  // Save form data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveFormData = async () => {
      try {
        await AsyncStorage.setItem('formData', JSON.stringify({ ...formData, skills: selectedSkills }));
      } catch (error) {
        console.error('Failed to save form data:', error);
      }
    };

    saveFormData();
  }, [formData, selectedSkills]);

  const onSubmit = async (data: any) => {
    const formattedData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: {
        country: formData.country,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      education: {
        educationLevel: formData.educationLevel,
        fieldOfStudy: formData.fieldOfStudy,
        schoolName: formData.schoolName,
        educationCountry: formData.educationCountry,
        educationCity: formData.educationCity,
        educationStartDate: formData.educationStartDate,
        educationEndDate: formData.educationEndDate,
        educationDescription: formData.educationDescription,
        highestEducationLevel: formData.highestEducationLevel,
      },
      experience: {
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        workCountry: formData.workCountry,
        workCity: formData.workCity,
        workStartDate: formData.workStartDate,
        workEndDate: formData.workEndDate,
        workExperience: formData.workExperience,
        highestJobLevel: formData.highestJobLevel,
      },
      certifications: formData.certifications,
      birthDate: formData.birthDate,
      summary: formData.summary,
      jobPreferences: {
        desiredJobTitle: formData.desiredJobTitle,
        jobType: formData.jobType,
        minimumSalary: parseInt(formData.minimumSalary, 10),
      },
      skills: selectedSkills,
    };

    try {
      const response = await axios.post(`${BASE_URL}/cv_form`, formattedData);
      console.log('Data successfully posted to MongoDB:', response.data);
      console.log('Response data structure:', response.data); // Add this line to log the response data structure
      // Handle successful post, e.g., navigate to another screen or show a success message
      navigationJobDetail.navigate('JobDetail', { jobId: route.params?.jobId });

    } catch (error) {
      console.error('Error posting data to MongoDB:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error response status:', error.response.status);
          console.log('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
      } else {
        console.log('Unexpected error:', error);
      }
      console.log('Data that failed to post:', formattedData);
      // Handle error, e.g., show an error message
    }
  };

  const handleBackPress = () => {
    if (currentStep === 1) {
      navigation.goBack(); // Quay lại trang trước đó nếu đang ở bước đầu tiên
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = () => {
    console.log("Lưu tiến trình hiện tại và thoát");
    navigation.goBack();
  };

  // Cập nhật formData khi người dùng thay đổi dữ liệu nhập
  const updateFormData = (name: string, value: any) => {
    const keys = name.split('.');
    setFormData((prevData) => {
      let updatedData = { ...prevData };
      let tempData = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        tempData = tempData[keys[i]];
      }
      tempData[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  const toggleEditing = (key: any) => {
    setEditingFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeleteSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const validateString = (value: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value) || '*Vui lòng nhập đúng định dạng';
  };

  const validateNumber = (value: string) => {
    const regex = /^[0-9]+$/;
    return regex.test(value) || '*Vui lòng nhập đúng định dạng';
  };

  const renderEditableField = (label: string, key: string, value: string, isDate?: boolean) => {
    return (
      <View style={styles.editableFieldContainer}>
        <Text style={styles.content}>{label}: </Text>
        {editingFields[key] ? (
          isDate ? (
            <TouchableOpacity onPress={() => toggleEditing(key)}>
              <Text style={styles.content}>{value}</Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => updateFormData(key, text)}
              onBlur={() => toggleEditing(key)}
            />
          )
        ) : (
          <Text style={styles.content}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => toggleEditing(key)}>
          <Icon name={editingFields[key] ? 'checkmark-outline' : 'pencil-outline'} size={20} color="#011F82" />
        </TouchableOpacity>
      </View>
    );
  };

  const countryOptions = [
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Thailan', value: 'Thailan' },
    { label: 'Mexico', value: 'Mexico' },
    // Add more countries as needed
  ];

  const educationCountryOptions = [
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Thailan', value: 'Thailan' },
    { label: 'Mexico', value: 'Mexico' },
    // Add more countries as needed
  ];

  const workCountryOptions = [
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Thailan', value: 'Thailan' },
    { label: 'Mexico', value: 'Mexico' },
    // Add more countries as needed
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const skillsData = [
    'JavaScript', 'React', 'React Native', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Swift'
  ];

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const renderSkillCard = (skill: string) => (
    <View key={skill} style={styles.skillCard}>
      <Text style={styles.skillCardText}>{skill}</Text>
    </View>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Bạn tên là gì?</Text>
            <View style={styles.row}>
              <Text style={styles.content}>Họ và tên</Text>
              {errors.fullName && <Text style={styles.errorText}>{String(errors.fullName.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="fullName"
              defaultValue={formData.fullName}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("fullName", text);
                  }}
                  value={formData.fullName}
                />
              )}
            />
            <Text style={styles.content}>Email</Text>
            <Controller
              control={control}
              name="email"
              defaultValue={formData.email}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("email", text);
                  }}
                  value={formData.email}
                />
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Bạn có muốn thêm số điện thoại vào CV của mình không?</Text>
            <View style={styles.row}>
              <Text style={styles.content}>Số điện thoại</Text>
              {errors.phone && <Text style={styles.errorText}>{String(errors.phone.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="phone"
              defaultValue={formData.phone}
              rules={{ validate: validateNumber }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("phone", text);
                  }}
                  value={formData.phone}
                />
              )}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Bạn sống ở đâu?</Text>
            <Text style={styles.content}>Quốc gia</Text>
            <Controller
              control={control}
              name="country"
              defaultValue={formData.country}
              render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                  onValueChange={(value) => {
                    onChange(value);
                    updateFormData("country", value); // Save in real-time
                  }}
                  items={countryOptions}
                  value={formData.country}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Chọn quốc gia", value: null }}
                />
              )}
            />
            <Text style={styles.content}>Địa chỉ đường</Text>
            <Controller
              control={control}
              name="address"
              defaultValue={formData.address}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Địa chỉ đường"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("address", text); // Save in real-time
                  }}
                  value={formData.address}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Thành phố</Text>
              {errors.city && <Text style={styles.errorText}>{String(errors.city.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="city"
              defaultValue={formData.city}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Thành phố"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("city", text); // Save in real-time
                  }}
                  value={formData.city}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Mã bưu chính</Text>
              {errors.zipCode && <Text style={styles.errorText}>{String(errors.zipCode.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="zipCode"
              defaultValue={formData.zipCode}
              rules={{ validate: validateNumber }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mã bưu chính"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("zipCode", text); // Save in real-time
                  }}
                  value={formData.zipCode}
                />
              )}
            />
          </>
        );
      case 4: // Thêm trình độ học vấn
        return (
          <>
            <Text style={styles.title}>Thêm trình độ học vấn</Text>
            <View style={styles.row}>
              <Text style={styles.content}>Trình độ học vấn</Text>
              {errors.educationLevel && <Text style={styles.errorText}>{String(errors.educationLevel.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="educationLevel"
              defaultValue={formData.educationLevel}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Trình độ học vấn"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('educationLevel', text);
                  }}
                  value={formData.educationLevel}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Lĩnh vực học tập</Text>
              {errors.fieldOfStudy && <Text style={styles.errorText}>{String(errors.fieldOfStudy.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="fieldOfStudy"
              defaultValue={formData.fieldOfStudy}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Lĩnh vực học tập"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('fieldOfStudy', text);
                  }}
                  value={formData.fieldOfStudy}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Tên trường học</Text>
              {errors.schoolName && <Text style={styles.errorText}>{String(errors.schoolName.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="schoolName"
              defaultValue={formData.schoolName}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Tên trường học"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('schoolName', text);
                  }}
                  value={formData.schoolName}
                />
              )}
            />
            <Text style={styles.content}>Quốc gia</Text>
            <Controller
              control={control}
              name="educationCountry"
              render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                  onValueChange={(value) => {
                    onChange(value);
                    updateFormData("educationCountry", value);
                  }}
                  items={educationCountryOptions}
                  value={formData.educationCountry}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Chọn quốc gia", value: null }}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Thành phố</Text>
              {errors.educationCity && <Text style={styles.errorText}>{String(errors.educationCity.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="educationCity"
              defaultValue={formData.educationCity}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Thành phố"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('educationCity', text);
                  }}
                  value={formData.educationCity}
                />
              )}
            />
            <Text style={styles.content}>Giai đoạn</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={[styles.input, formData.educationStartDate ? styles.boldText : null]}
                placeholder="Từ ngày"
                value={formData.educationStartDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={formData.educationStartDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    updateFormData('educationStartDate', selectedDate);
                  }
                }}
              />
            )}
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={[styles.input, formData.educationEndDate ? styles.boldText : null]}
                placeholder="Đến ngày"
                value={formData.educationEndDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={formData.educationEndDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    updateFormData('educationEndDate', selectedDate);
                  }
                }}
              />
            )}
          </>
        );
      case 5: // Thêm kinh nghiệm làm việc
        return (
          <>
            <Text style={styles.title}>Thêm kinh nghiệm làm việc</Text>
            <View style={styles.row}>
              <Text style={styles.content}>Chức danh</Text>
              {errors.jobTitle && <Text style={styles.errorText}>{String(errors.jobTitle.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="jobTitle"
              defaultValue={formData.jobTitle}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Chức danh"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('jobTitle', text);
                  }}
                  value={formData.jobTitle}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Tên công ty</Text>
              {errors.companyName && <Text style={styles.errorText}>{String(errors.companyName.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="companyName"
              defaultValue={formData.companyName}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Tên công ty"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('companyName', text);
                  }}
                  value={formData.companyName}
                />
              )}
            />
            <Text style={styles.content}>Chọn quốc gia</Text>
            <Controller
              control={control}
              name="workCountry"
              render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                  onValueChange={(value) => {
                    onChange(value);
                    updateFormData("workCountry", value);
                  }}
                  items={workCountryOptions}
                  value={formData.workCountry}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Chọn quốc gia", value: null }}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Thành phố</Text>
              {errors.workCity && <Text style={styles.errorText}>{String(errors.workCity.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="workCity"
              defaultValue={formData.workCity}
              rules={{ validate: validateString }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Thành phố"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('workCity', text);
                  }}
                  value={formData.workCity}
                />
              )}
            />
            <Text style={styles.content}>Giai đoạn</Text>
            <TouchableOpacity onPress={() => setShowWorkStartDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Từ ngày"
                value={formData.workStartDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showWorkStartDatePicker && (
              <DateTimePicker
                value={formData.workStartDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowWorkStartDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    updateFormData('workStartDate', selectedDate);
                  }
                }}
              />
            )}
            <TouchableOpacity onPress={() => setShowWorkEndDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Đến ngày"
                value={formData.workEndDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showWorkEndDatePicker && (
              <DateTimePicker
                value={formData.workEndDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowWorkEndDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    updateFormData('workEndDate', selectedDate);
                  }
                }}
              />
            )}
            <Text style={styles.content}>Mô tả kinh nghiệm làm việc</Text>
            <Controller
              control={control}
              name="workExperience"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mô tả kinh nghiệm làm việc"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('workExperience', text);
                  }}
                  value={formData.workExperience}
                />
              )}
            />
          </>
        );
      case 6: // Nêu kỹ năng
        return (
          <>
            <Text style={styles.title}>Kỹ năng của bạn</Text>
            <Text style={styles.content}>Tìm kiếm kỹ năng </Text>
            <TextInput
              style={styles.input}
              placeholder="Tìm kiếm kỹ năng"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <SectionList
              sections={[{ title: 'Skills', data: skillsData.filter(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) }]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSkillSelect(item)}>
                  <Text style={styles.skillItem}>{item}</Text>
                </TouchableOpacity>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
            />
            <View style={styles.selectedSkillsContainer}>
              {selectedSkills.map(renderSkillCard)}
            </View>
          </>
        );
      case 7: // Chứng nhận hoặc giấy phép
        return (
          <>
            <Text style={styles.title}>Chứng nhận và giấy phép</Text>
            <Text style={styles.content}>Chứng nhận / giấy phép </Text>
            <Controller
              control={control}
              name="certifications"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Chứng nhận / Giấy phép"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('certifications', text);
                  }}
                  value={formData.certifications}
                />
              )}
            />
          </>
        );
      case 8:
        return (
          <>
            <Text style={styles.title}>Điền thông tin cá nhân</Text>
            <Text style={styles.content}>Ngày tháng năm sinh</Text>
            <TouchableOpacity onPress={() => setShowBirthDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Ngày tháng năm sinh"
                value={formData.birthDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showBirthDatePicker && (
              <DateTimePicker
                value={formData.birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowBirthDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    updateFormData('birthDate', selectedDate);
                  }
                }}
              />
            )}
            <Text style={styles.content}>Mô tả trình độ học vấn</Text>
            <Controller
              control={control}
              name="educationDescription"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mô tả trình độ học vấn"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('educationDescription', text);
                  }}
                  value={formData.educationDescription}
                />
              )}
            />
            <Text style={styles.content}>Trình độ học vấn cao nhất</Text>
            <Controller
              control={control}
              name="highestEducationLevel"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Trình độ học vấn cao nhất"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('highestEducationLevel', text);
                  }}
                  value={formData.highestEducationLevel}
                />
              )}
            />
            <Text style={styles.content}>Trình độ nghề nghiệp cao nhất</Text>
            <Controller
              control={control}
              name="highestJobLevel"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Trình độ nghề nghiệp cao nhất"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('highestJobLevel', text);
                  }}
                  value={formData.highestJobLevel}
                />
              )}
            />
          </>
        );
      case 9: // Preferences for the next job
        return (
          <>
            <Text style={styles.title}>Sở thích công việc tiếp theo</Text>
            <Text style={styles.content}>Chức danh mong muốn</Text>
            <Controller
              control={control}
              name="desiredJobTitle"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Chức danh mong muốn"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('desiredJobTitle', text);
                  }}
                  value={formData.desiredJobTitle}
                />
              )}
            />
            <Text style={styles.content}>Loại công việc</Text>
            <Controller
              control={control}
              name="jobType"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Loại công việc"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('jobType', text);
                  }}
                  value={formData.jobType}
                />
              )}
            />
            <View style={styles.row}>
              <Text style={styles.content}>Mức lương tối thiểu</Text>
              {errors.minimumSalary && <Text style={styles.errorText}>{String(errors.minimumSalary.message)}</Text>}
            </View>
            <Controller
              control={control}
              name="minimumSalary"
              defaultValue={formData.minimumSalary}
              rules={{ validate: validateNumber }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mức lương tối thiểu"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('minimumSalary', text);
                  }}
                  value={formData.minimumSalary}
                />
              )}
            />           
          </>
        );

      case 10:
        return (
          <View>
            <Text style={styles.title}>CV của bạn đã sẵn sàng chưa?</Text>
            <Text style={styles.titleDown}>Đánh giá và thực hiện các thay đổi bên dưới.</Text>

            {/* Display Personal Information */}
            <Text style={styles.subtitle}>Thông tin cá nhân</Text>
            {renderEditableField("Họ và tên", "fullName", formData.fullName)}
            {renderEditableField("Email", "email", formData.email)}
            {renderEditableField("Số điện thoại", "phone", formData.phone)}
            {renderEditableField("Quốc gia", "address.country", formData.country)}
            {renderEditableField("Địa chỉ", "address.address", formData.address)}
            {renderEditableField("Thành phố", "address.city", formData.city)}
            {renderEditableField("Mã bưu chính", "address.zipCode", formData.zipCode)}
            {renderEditableField("Ngày sinh", "birthDate", formData.birthDate ? formData.birthDate.toLocaleDateString() : '', true)}

            {/* Display Summary */}
            <Text style={styles.subtitle}>Tóm tắt</Text>
            {renderEditableField("Tóm tắt", "summary", formData.summary)}

            {/* Display Education Information */}
            <Text style={styles.subtitle}>Trình độ học vấn</Text>
            {renderEditableField("Trình độ học vấn", "educationLevel", formData.educationLevel)}
            {renderEditableField("Lĩnh vực học tập", "fieldOfStudy", formData.fieldOfStudy)}
            {renderEditableField("Tên trường học", "schoolName", formData.schoolName)}
            {renderEditableField("Quốc gia", "educationCountry", formData.educationCountry)}
            {renderEditableField("Thành phố", "educationCity", formData.educationCity)}
            {renderEditableField("Giai đoạn", "educationStartDate", formData.educationStartDate ? formData.educationStartDate.toLocaleDateString() + " - " + formData.educationEndDate.toLocaleDateString() : '', true)}
            {renderEditableField("Mô tả trình độ học vấn", "educationDescription", formData.educationDescription)}
            {renderEditableField("Trình độ học vấn cao nhất", "highestEducationLevel", formData.highestEducationLevel)}

            {/* Display Work Experience */}
            <Text style={styles.subtitle}>Kinh nghiệm làm việc</Text>
            {renderEditableField("Chức danh", "jobTitle", formData.jobTitle)}
            {renderEditableField("Tên công ty", "companyName", formData.companyName)}
            {renderEditableField("Quốc gia", "workCountry", formData.workCountry)}
            {renderEditableField("Thành phố", "workCity", formData.workCity)}
            {renderEditableField("Giai đoạn", "workStartDate", formData.workStartDate ? formData.workStartDate.toLocaleDateString() + " - " + formData.workEndDate.toLocaleDateString() : '', true)}
            {renderEditableField("Mô tả kinh nghiệm làm việc", "workExperience", formData.workExperience)}

            {/* Display Skills */}
            <Text style={styles.subtitle}>Kỹ năng</Text>
            <View style={styles.selectedSkillsContainer}>
              {selectedSkills.map((skill, index) => (
                <TouchableOpacity key={index} onPress={() => handleDeleteSkill(skill)}>
                  <View style={styles.skillCard}>
                    <Text style={styles.skillCardText}>{skill}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Display Certifications */}
            <Text style={styles.subtitle}>Chứng chỉ và Giấy phép</Text>
            {renderEditableField("Chứng chỉ và giấy phép", "certifications", formData.certifications)}

            {/* Display Job Preferences */}
            <Text style={styles.subtitle}>Sở thích công việc tiếp theo</Text>
            {renderEditableField("Chức danh mong muốn", "desiredJobTitle", formData.desiredJobTitle)}
            {renderEditableField("Loại công việc", "jobType", formData.jobType)}
            {renderEditableField("Mức lương tối thiểu", "minimumSalary", formData.minimumSalary)}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={[{ title: 'Form', data: [{ key: 'form' }] }]}
        renderItem={() => (
          <View>
            {/* Header with Back Button and Save & Exit Button */}
            <View style={styles.header}>
              <TouchableOpacity>
                <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.goBack()} />
              </TouchableOpacity>
              <Text style={styles.progressText}>{`Bước ${currentStep} / 10`}</Text>
              <TouchableOpacity onPress={handleSaveAndExit}>
                <Text style={styles.buttonSaveAndOut}>Lưu và thoát</Text>
              </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${(currentStep / 10) * 100}%` }]} />
            </View>
            {/* Form Steps */}
            <View style={styles.formContainer}>
              {renderStep()}
            </View>
          </View>
        )}
        keyExtractor={item => item.key}

      />

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep)}
          disabled={currentStep === 1}
          style={[styles.button, currentStep === 1 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (currentStep < 10) {
              if (
                (currentStep === 1 && !isValid) ||
                (currentStep === 2 && !isValid) ||
                (currentStep === 3 && !isValid) ||
                (currentStep === 4 && !isValid) ||
                (currentStep === 5 && !isValid) ||
                (currentStep === 9 && !isValid)
              ) {
                return; // Prevent moving to the next step if the fullName, phone, city, zipCode, educationLevel, fieldOfStudy, schoolName, educationCity, jobTitle, companyName, or workCity is invalid
              }
              setCurrentStep(currentStep + 1);
            } else {
              handleSubmit(onSubmit)();
            }
          }}
          style={[
            styles.button,
            (currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5 || currentStep === 9) && !isValid && styles.disabledButton,
          ]}
          disabled={(currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 5|| currentStep === 9) && !isValid}
        >
          <Text style={styles.buttonText}>{currentStep < 10 ? 'Tiếp theo' : 'Hoàn tất'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editableFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011F82', // Màu chữ chính
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#011F82',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#011F82', // Màu chữ chính
  },
  input: {
    height: 40,
    borderColor: '#B9D6F3', // Màu khung input
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    flex: 1,
    flexWrap: 'wrap', // Ensure text wraps within the input field
  },
  formContainer: {
    flex: 1,
    marginBottom: 80, // Add margin to avoid overlap with fixed buttons
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#011F82',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonSaveAndOut: {
    color: '#011F82',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#6D92D0', // Màu tiêu đề phụ
  },
  titleDown: {
    fontSize: 15,
    marginBottom: 10,
    color: 'gray',
  },
  skillItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillCard: {
    backgroundColor: '#011F82',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  skillCardText: {
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#6D92D0', // Màu tiêu đề phụ
  },
  content: {
    marginBottom: 2,
    flexWrap: 'wrap', // Ensure text wraps within the content
    // backgroundColor: 'red',
    width: '30%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    width: '50%',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'black',
    flexWrap: 'wrap', // Ensure text wraps within the picker select
  },
  inputAndroid: {
    height: 40,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'black',
    flexWrap: 'wrap', // Ensure text wraps within the picker select
  },

});

export default CVCreate;

