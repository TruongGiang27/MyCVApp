import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../../components/Navbar';

const JobPost = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined); // Để date ban đầu là undefined
    const [show, setShow] = useState<boolean>(false);
    const [showDataJob, setShowDataJob] = useState<boolean>(false);
    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handlePickerFocus = () => {
        setShowDataJob(true);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Tạo bài đăng tuyển dụng</Text>
                    <Image style={styles.imgPost}
                        source={require('../../../assets/images/jobpostImg.jpg')}
                    />
                </View>

                <View style={styles.inputinfor}>
                    <View style={styles.inputRow}>
                        <FontAwesome5 name={'user'} size={25} color={'#011F82'} />
                        <Text style={styles.label}>Chức vụ</Text>
                    </View>
                    <TextInput style={styles.textinput} placeholder='Nhập chức vụ' />

                    <View style={styles.inputRow}>
                        <FontAwesome5 name={'briefcase'} size={25} color={'#011F82'} />
                        <Text style={styles.label}>Thông tin công việc</Text>
                    </View>
                    <TextInput style={styles.textinput} placeholder='Thông tin công việc' />

                    <View style={styles.inputRow}>
                        <FontAwesome5 name={'dollar-sign'} size={25} color={'#011F82'} />
                        <Text style={styles.label}>Mức lương</Text>
                    </View>
                    <TextInput style={styles.textinput} placeholder='Mức lương' />

                    <View style={styles.inputRow}>
                        <FontAwesome5 name={'map-marker-alt'} size={25} color={'#011F82'} />
                        <Text style={styles.label}>Địa chỉ</Text>
                    </View>
                    <TextInput style={styles.textinput} placeholder='Địa chỉ' />

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
                        <FontAwesome5 name={'business-time'} size={25} color={'#011F82'} />
                        <Text style={styles.label}>Loại việc làm</Text>
                    </View>
                    {/* <TextInput style={styles.textinput} placeholder='Loại việc làm' /> */}
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue: string, itemIndex: number) => setSelectedValue(itemValue)}
                            onFocus={handlePickerFocus}
                            style={styles.textinput}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item label="Chọn một tùy chọn" value="choose" />
                            <Picker.Item label="Bán thời gian" value="Part-Time" />
                            <Picker.Item label="Toàn thời gian" value="Full-Time" />
                            <Picker.Item label="Cố Định" value="Permanent" />
                            <Picker.Item label="Thời vụ" value="Seasonal" />
                            <Picker.Item label="Thực tập" value="Internship" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={styles.submitButton}>Đăng bài</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
    );
}

export default JobPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header:{
        display: 'flex',

    },

    imgPost: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    title: {
        marginBottom: 10,
        lineHeight: 50,
        marginTop: 10,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#011F82',
        textAlign: 'center',
    },

    inputinfor: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    textinput: {
        width: '100%',
        height: 40,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        marginTop: 10,
        color: 'black',
        fontSize: 15,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#011F82',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#011F82',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        marginBottom: 16,
    },
    picker: {
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
    },
    pickerItem: {
        fontSize: 10,
        color: 'blue',
        textAlign: 'center',
    },
});
