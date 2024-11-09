import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CVCreate = () => {
  const { control, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();

  // State lưu trữ dữ liệu cho tất cả các bước
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: {
      country: '',
      address: '',
      city: '',
      zipCode: '',
    },

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

  // Load form data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem('formData');
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
        }
      } catch (error) {
        console.error('Failed to load form data:', error);
      }
    };

    loadFormData();
  }, []);

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
        country: formData.address.country,
        address: formData.address.address,
        city: formData.address.city,
        zipCode: formData.address.zipCode,
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
    } catch (error) {
      console.error('Error posting data to MongoDB:', error);
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <Text style={styles.content}>Họ và tên</Text>
            <Controller
              control={control}
              name="fullName"
              defaultValue={formData.fullName}
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
            <Text style={styles.content}>Số điện thoại</Text>
            <Controller
              control={control}
              name="phone"
              defaultValue={formData.phone}
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
              defaultValue={formData.address?.country}
              render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                  onValueChange={(value) => {
                    onChange(value);
                    updateFormData("address.country", value);
                  }}
                  items={countryOptions}
                  value={formData.address?.country}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Chọn quốc gia", value: null }}
                />
              )}
            />
            <Text style={styles.content}>Địa chỉ đường </Text>
            <Controller
              control={control}
              name="address"
              defaultValue={formData.address?.address}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Địa chỉ đường"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("address.address", text);
                  }}
                  value={formData.address?.address}
                />
              )}
            />
            <Text style={styles.content}>Thành phố </Text>
            <Controller
              control={control}
              name="city"
              defaultValue={formData.address?.city}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Thành phố"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("address.city", text);
                  }}
                  value={formData.address?.city}
                />
              )}
            />
            <Text style={styles.content}>Bưu chính</Text>
            <Controller
              control={control}
              name="zipCode"
              defaultValue={formData.address?.zipCode}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mã bưu chính"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData("address.zipCode", text);
                  }}
                  value={formData.address?.zipCode}
                />
              )}
            />
          </>
        );

      case 4: // Thêm trình độ học vấn
        return (
          <>
            <Text style={styles.title}>Thêm trình độ học vấn</Text>
            <Text style={styles.content}>Trình độ học vấn</Text>
            <Controller
              control={control}
              name="educationLevel"
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
            <Text style={styles.content}>Lĩnh vực học tập</Text>
            <Controller
              control={control}
              name="fieldOfStudy"
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
            <Text style={styles.content}>Tên trường học</Text>
            <Controller
              control={control}
              name="schoolName"
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
            <Text style={styles.content}>Thành phố</Text>
            <Controller
              control={control}
              name="educationCity"
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
            <Text style={styles.content}>Chức danh</Text>
            <Controller
              control={control}
              name="jobTitle"
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
            <Text style={styles.content}>Tên công ty</Text>
            <Controller
              control={control}
              name="companyName"
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
            <Text style={styles.content}>Thành phố</Text>
            <Controller
              control={control}
              name="workCity"
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
            <Text style={styles.content}>Mức lương tối thiểu</Text>
            <Controller
              control={control}
              name="minimumSalary"
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
      case 10: // Review CV with CRUD operations
        return (
          <>
            <Text style={styles.title}>CV của bạn đã sẵn sàng chưa?</Text>
            <Text style={styles.titleDown}>Đánh giá và thực hiện các thay đổi bên dưới.</Text>

            {/* Display all information from previous steps */}
            <Text style={styles.subtitle}>Thông tin cá nhân</Text>
            <Text style={styles.content}>Họ và tên: {`${formData.fullName}`}</Text>
            <Text style={styles.content}>Email: {formData.email}</Text>
            <Text style={styles.content}>Số điện thoại: {formData.phone}</Text>
            <Text style={styles.content}>Quốc gia: {formData.address.country}</Text>
            <Text style={styles.content}>Địa chỉ: {formData.address.address}</Text>
            <Text style={styles.content}>Thành phố: {formData.address.city}</Text>
            <Text style={styles.content}>Mã bưu chính: {formData.address.zipCode}</Text>
            <Text style={styles.content}>Ngày sinh: {formData.birthDate.toLocaleDateString()}</Text>

            <Text style={styles.subtitle}>Tóm tắt</Text>
            <Controller
              control={control}
              name="summary"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Tóm tắt"
                  onChangeText={(text) => {
                    onChange(text);
                    updateFormData('summary', text);
                  }}
                  value={formData.summary}
                />
              )}
            />

            <Text style={styles.subtitle}>Trình độ học vấn</Text>
            <Text style={styles.content}>Trình độ học vấn: {formData.educationLevel}</Text>
            <Text style={styles.content}>Lĩnh vực học tập: {formData.fieldOfStudy}</Text>
            <Text style={styles.content}>Tên trường học: {formData.schoolName}</Text>
            <Text style={styles.content}>Quốc gia: {formData.educationCountry}</Text>
            <Text style={styles.content}>Thành phố: {formData.educationCity}</Text>
            <Text style={styles.content}>Giai đoạn: {formData.educationStartDate.toLocaleDateString()} - {formData.educationEndDate.toLocaleDateString()}</Text>
            <Text style={styles.content}>Mô tả trình độ học vấn: {formData.educationDescription}</Text>
            <Text style={styles.content}>Trình độ học vấn cao nhất: {formData.highestEducationLevel}</Text>

            <Text style={styles.subtitle}>Kinh nghiệm làm việc</Text>
            <Text style={styles.content}>Chức danh: {formData.jobTitle}</Text>
            <Text style={styles.content}>Tên công ty: {formData.companyName}</Text>
            <Text style={styles.content}>Quốc gia: {formData.workCountry}</Text>
            <Text style={styles.content}>Thành phố: {formData.workCity}</Text>
            <Text style={styles.content}>Giai đoạn: {formData.workStartDate.toLocaleDateString()} - {formData.workEndDate.toLocaleDateString()}</Text>
            <Text style={styles.content}>Mô tả kinh nghiệm làm việc: {formData.workExperience}</Text>

            <Text style={styles.subtitle}>Kỹ năng</Text>
            <Text style={styles.content}>{selectedSkills.join(', ')}</Text>

            <Text style={styles.subtitle}>Chứng chỉ và Giấy phép</Text>
            <Text style={styles.content}>{formData.certifications}</Text>

            <Text style={styles.subtitle}>Sở thích công việc tiếp theo</Text>
            <Text style={styles.content}>Chức danh mong muốn: {formData.desiredJobTitle}</Text>
            <Text style={styles.content}>Loại công việc: {formData.jobType}</Text>
            <Text style={styles.content}>Mức lương tối thiểu: {formData.minimumSalary}</Text>


          </>
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
              setCurrentStep(currentStep + 1);
            } else {
              handleSubmit(onSubmit)();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{currentStep < 10 ? 'Tiếp theo' : 'Hoàn tất'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  boldText: {
    fontWeight: 'bold',
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
  },
  inputAndroid: {
    height: 40,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'black',
    // backgroundColor: 'white',
  },

});

export default CVCreate;