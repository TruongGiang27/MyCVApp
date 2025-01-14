import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NavbarEmployer from '../../components/NavbarEmployer';
import ScreenName from '../../constants/ScreenName';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const InfoEmployer = ({ navigation, route }: Props) => {
    const { userId, updated } = route.params as { userId: string, updated: boolean };
    const [user, setUser] = useState<any>();
    const [companyName, setCompanyName] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState('');
    const [fullName, setFullName] = useState('');
    const [howDidYouHear, setHowDidYouHear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [describe, setDescribe] = useState('');
    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            }
        };
        const getEmployerInfo = async () => {
            const response = await fetch(`${BASE_URL}/employers/${userId}`);
            const data = await response.json();
            console.log("job of user id: ",data);
            setCompanyName(data.companyName);
            setSelectedCompany(data.selectedCompany);
            setNumberOfEmployees(data.numberOfEmployees);
            setFullName(data.fullName);
            setHowDidYouHear(data.howDidYouHear);
            setPhoneNumber(data.phoneNumber);
            setDescribe(data.describe);
        }
        getEmployerInfo();
        getInfo();

    }, [userId, updated]);

    const BackHandler = () => {
        navigation.goBack();
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} />
                    <Text style={styles.headerTitle}>THÔNG TIN CỦA CÔNG TY</Text>
                    <Icon name="edit" type="font-awesome" size={25} color="#011F82" onPress={() => navigation.navigate(ScreenName.EditInfoEmployer, { userId})} />
                </View>
                <Text style={styles.label}>Tên công ty</Text>
                <Text style={styles.textinfo}>{companyName}</Text>
                <Text style={styles.label}>Loại hình công ty</Text>
                <Text style={styles.textinfo}>{selectedCompany}</Text>
                <Text style={styles.label}>Số lượng nhân viên của công ty</Text>
                <Text style={styles.textinfo}>{numberOfEmployees}</Text>
                <Text style={styles.label}>Số điện thoại công ty</Text>
                <Text style={styles.textinfo}>{phoneNumber}</Text>
                <Text style={styles.label}>Mô tả công ty</Text>
                <Text style={styles.textinfo}>{describe}</Text>
                <Text style={styles.label}>Tên người liên hệ</Text>
                <Text style={styles.textinfo}>{fullName}</Text>
                <Text style={styles.label}>Quý công ty biết đến ứng dụng qua</Text>
                <Text style={styles.textinfo}>{howDidYouHear}</Text>

            </ScrollView>
            <NavbarEmployer navigation={navigation} route={route} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F9FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#011F82',
        textAlign: 'center',
        flex: 1,
        marginLeft: 5, // Để cân chỉnh với icon
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
        color: '#011F82',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    textinfo: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#EFF2F7', // Nền nhạt hơn
        borderRadius: 6, // Giảm độ bo góc
        borderLeftWidth: 4, // Thêm viền trái
        borderColor: '#011F82', // Màu viền trái nổi bật
        fontStyle: 'italic', // Font chữ nghiêng để khác biệt
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        height: 100,
    },
});
export default InfoEmployer;