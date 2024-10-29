import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { useState } from 'react';
import { Alert, Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../../components/Navbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import { RootStackParamList } from '../User/types'

// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'JobPost'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};

const JobPost: React.FC<Props> = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [show, setShow] = useState<boolean>(false);
    const [showDataJob, setShowDataJob] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [locationCity, setlocationCity] = useState<string>('');
    const [salary, setSalary] = useState<string>('');
    const [jobType, setJobType] = useState('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handlePickerFocus = () => {
        setShowDataJob(true);
        Keyboard.dismiss();
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const handleSubmit = async () => {
        if (title && company && locationCity && salary && jobType && jobDescription.length > 30) {
            try {
                const JobsData = {
                    title,
                    company,
                    location: locationCity,
                    salary,
                    jobType,
                    jobDescription,
                };
                console.log('Submitting employer data:', JobsData);
                const response = await axios.post(`${BASE_URL}/jobs`, JobsData);
                Alert.alert('Thành công', 'Bạn đã đăng ký thành công');
                navigation.navigate("HomeEmployer");
            } catch (error) {
                console.error('Error creating employer:', error);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra');
            }
        } else if (jobDescription.length < 30) {
            Alert.alert('Lỗi', 'Mô tả công việc phải có ít nhất 30 ký tự');
        }
        else {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Tạo bài đăng tuyển dụng</Text>
                            <Image style={styles.imgPost}
                                source={require('../../../assets/images/jobpostImg.jpg')}
                            />
                        </View>
                        <View style={styles.inputinfor}>
                            {/* Job Title*/}
                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'user'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Chức vụ</Text>
                            </View>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Chức vụ'
                                onChangeText={setTitle}
                            />
                            {/* Company Name*/}
                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'building'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Tên công ty</Text>
                            </View>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Tên công ty'
                                onChangeText={setCompany}
                            />
                            {/* Job Type*/}
                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'business-time'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Loại việc làm</Text>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={jobType}
                                    onValueChange={(itemValue: string, itemIndex: number) => setJobType(itemValue)}
                                    onFocus={handlePickerFocus}
                                    style={styles.textinput}
                                    itemStyle={styles.pickerItem}
                                    mode='dialog'>
                                    <Picker.Item label="Chọn một tùy chọn" value="choose" />
                                    <Picker.Item label="Bán thời gian" value="Part-Time" />
                                    <Picker.Item label="Toàn thời gian" value="Full-Time" />
                                    <Picker.Item label="Cố Định" value="Permanent" />
                                    <Picker.Item label="Thời vụ" value="Seasonal" />
                                    <Picker.Item label="Thực tập" value="Internship" />
                                </Picker>
                            </View>

                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'dollar-sign'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Mức lương</Text>
                            </View>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Mức lương'
                                onChangeText={setSalary}
                            />
                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'map-marker-alt'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Địa chỉ</Text>
                            </View>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Vị trí làm việc'
                                onChangeText={setlocationCity}
                            />

                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'calendar-alt'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Ngày hết hạn</Text>
                            </View>
                            <Text onPress={showDatePicker} style={styles.textinput}>
                                {date ? date.toLocaleDateString() : "dd/mm/yyyy"}
                            </Text>
                            {show && (
                                <DateTimePicker
                                    value={date || new Date()}
                                    mode="date"
                                    display="calendar"
                                    onChange={onChange}
                                />
                            )}

                            <View style={styles.inputRow}>
                                <FontAwesome5 name={'briefcase'} size={25} color={'#011F82'} />
                                <Text style={styles.label}>Mô tả công việc</Text>
                            </View>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Mô tả công việc'
                                multiline={true}
                                textAlignVertical='top'
                                onChangeText={setJobDescription}
                            />
                        </View>

                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={styles.submitButton}>Đăng bài</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <Navbar />

            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 15,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#011F82',
    },
    imgPost: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 10,
    },
    inputinfor: {
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#011F82',
    },
    textinput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        color: '#000',
        
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    pickerItem: {
        fontSize: 16,
    },
    submitButton: {
        width: '60%',
        backgroundColor: '#011F82',
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        borderRadius: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

});

export default JobPost;
