import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navbar from '../../components/NavbarEmployer';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
interface cv_form {
    _id: string;
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    address: {
        country: string;
        city: string;
        address: string;
        zipCode: string;
    };
    education: {
        educationLevel: string;
        fieldOfStudy: string;
        schoolName: string;
        educationCountry: string;
        educationCity: string;
        educationStartDate: string;
        educationEndDate: string;
    };
    experience: {
        companyName: string;
        jobTitle: string;
        workCountry: string;
        workCity: string;
        workStartDate: string;
        workEndDate: string;
    };
    skills: string;
    certifications: string;
    birthDate: string;
    summary: string;
    jobPreferences: {
        desiredJobTitle: string;
        jobType: string;
        minimumSalary: string;
    };
}
const CVInfor = ({ navigation, route }: Props) => {
    const { cvId, userId } = route.params ? route.params as { cvId: string, userId: string } : { cvId: '', userId: '' };
    const [cv, setCV] = useState<cv_form>();
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            }
        };
        const fetchCV = async () => {
            try {
                const response = await fetch(`${BASE_URL}/cv_form/${cvId}`);
                const data = await response.json();
                setCV(data);
                console.log('CV:', cv);
            } catch (err) {
                console.error('Failed to fetch CV:', err);
            }
        };
        getInfo();
        fetchCV();
    }, [cvId]);

    const initials = cv?.fullName?.split(' ').map((n: string) => n[0]).join('');
    const formatDate = (date: string) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };
    const BackHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.context}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} />
                <Text style={styles.headerText}>Chi tiết CV</Text>
            </View>
            <ScrollView>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.initials}>{initials}</Text>
                    </View>
                    <Text style={styles.name}>{cv?.fullName}</Text>

                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Email:</Text>
                    <View style={styles.info}>
                        <Icon name="mail" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.email}</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Thông tin cá nhân:</Text>
                    <View style={styles.info}>
                        <Icon name="map-marker" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Vị trí: {cv?.address?.address}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.address?.city}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.address?.country}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="phone" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Số điện thoại: {cv?.phone}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="birthday-cake" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Sinh nhật: {cv?.birthDate ? formatDate(cv.birthDate) : 'N/A'}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="person-outline" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Tóm tắt về bản thân: {cv?.summary}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Học vấn:</Text>
                    <View style={styles.info}>
                        <Icon name="graduation-cap" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Trình độ: {cv?.education?.educationLevel}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="book" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngành học: {cv?.education?.fieldOfStudy}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="university" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Trường: {cv?.education?.schoolName}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.education?.educationCountry}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.education?.educationCity}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-alt" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày bắt đầu: {cv?.education?.educationStartDate ? formatDate(cv.education.educationStartDate) : 'N/A'}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày kết thúc: {cv?.education?.educationEndDate ? formatDate(cv.education.educationEndDate) : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Kinh nghiệm làm việc:</Text>
                    <View style={styles.info}>
                        <Icon name="building" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Công ty: {cv?.experience?.companyName}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="briefcase" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Chức vụ: {cv?.experience?.jobTitle}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.experience?.workCountry}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.experience?.workCity}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-alt" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày bắt đầu: {cv?.experience?.workStartDate ? formatDate(cv.experience.workStartDate) : 'N/A'}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày kết thúc: {cv?.experience?.workEndDate ? formatDate(cv.experience.workEndDate) : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Kỹ năng:</Text>
                    <View style={styles.info}>
                        <Icon name="cogs" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.skills}</Text>
                    </View>
                </View>


                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Chứng chỉ:</Text>
                    <View style={styles.info}>
                        <Icon name="certificate" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.certifications}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Mong muốn:</Text>
                    <View style={styles.info}>
                        <Icon name="briefcase" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Vị trí mong muốn: {cv?.jobPreferences?.desiredJobTitle}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Loại công việc: {cv?.jobPreferences?.jobType}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="money" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Mức lương mong muốn: {cv?.jobPreferences?.minimumSalary} $</Text>
                    </View>
                </View>
            </ScrollView>
            <Navbar navigation={navigation} route={route} />
        </View>
    )
};

export default CVInfor

const styles = StyleSheet.create({
    context: {
        flex: 1,
        backgroundColor: '#F4F9FF',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#011F82',
        marginLeft: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#011F82',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        fontSize: 24,
        color: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#011F82',
        marginTop: 8,
    },
    infoCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#011F82',
        marginBottom: 8,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#011F82',
    },
});
