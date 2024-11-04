//Giang
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, TextInput, Title, Text } from 'react-native-paper';
import { BASE_URL } from '../utils/url';

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: undefined;
    ApplyManager: undefined;
};
// Khai báo kiểu cho props 'navigation'
type ApplyManagerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ApplyManager'
>;

type Props = {
    navigation: ApplyManagerScreenNavigationProp;
};


const ApplyManager: React.FC<Props> = ({ navigation }) => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState('');
    const [fullName, setFullName] = useState('');
    const [howDidYouHear, setHowDidYouHear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [describe, setDescribe] = useState('');
    const [error, setError] = useState('');
    
    const [selectedLocation, setSelectedLocation] = useState('');

    
  

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
                const response = await axios.post(`${BASE_URL}/employers`, employerData);
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
                        source={require('../../../assets/images/applyManager.png')}
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

                            <Title style={styles.subtitle}>Chức danh</Title>
                            <TextInput
                                label="Vui lòng nhập chức danh muốn tuyển dụng"
                                value={companyName}
                                onChangeText={setCompanyName}
                                style={styles.input}
                                mode="outlined"
                                textColor='#6D92D0'
                                theme={{ colors: { primary: '#011F82', outline: '#B9D6F3' } }}
                            />
                            <Title style={styles.subtitle}>Số lượng người cần tuyển dụng cho việc làm này</Title>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={numberOfEmployees}
                                    onValueChange={(itemValue: string, itemIndex: number) => setNumberOfEmployees(itemValue)}
                                    onFocus={handlePickerFocus}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}

                                >
                                    <Picker.Item label="Chọn một tùy chọn" value="choose" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                    <Picker.Item label="7" value="7" />
                                    <Picker.Item label="8" value="8" />
                                    <Picker.Item label="9" value="9" />
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="10+" value="10-n" />
                                    <Picker.Item label="Tôi cần liên tục tuyển dụng cho vị trí này" value="continuous" />

                                </Picker>
                            </View>

                            <Title style={styles.subtitle}>Bạn muốn quảng cáo việc làm này ở đâu?</Title>

                            <TextInput
                                label="Nhập địa điểm của bạn"
                                value={fullName}
                                onChangeText={setFullName}
                                style={styles.input}
                                mode="outlined"
                                textColor='#6D92D0'
                                theme={{ colors: { primary: '#011F82', outline: '#B9D6F3' } }}
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
        height: 250,
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
        color: '#6D92D0',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#011F82',

    },
    error: {
        color: 'red',
        marginTop: 5,
    },

});

export default ApplyManager;
