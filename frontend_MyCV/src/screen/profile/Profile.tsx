import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import { appColors } from '../../constants/appColors';
import ScreenName from '../../constants/ScreenName';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { signOut } from '../../utils/auth';
import { BASE_URL } from '../../utils/url';
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const { width, height } = Dimensions.get('window');
interface CV {
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
const Profile = ({ navigation, route }: Props) => {
    const { userEmail, userId } = route.params as { userEmail: string, userId: string };
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>(null);


    const [cvs, setCvs] = useState<CV[]>([]);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
                console.log("userid////////", userId);
                // console.log("user////////////", user?.data?.user?.id);
            }
        };

        getInfo();
        fetchCVs();
    }, []);

    const fetchCVs = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/cv_form/user/${userId}`);
            console.log("response.data", response.data);
            setCvs(response.data);
        } catch (error) {
            console.error('Error fetching CVs:', error);
        }
    };

    useEffect(() => {
        console.log("cvs", cvs);
    },[]);

    const submitCV = (cvId: string) => {
        // Chuyển đến màn hình nộp CV hoặc gọi API
        // navigation.navigate('SubmitCV', { cvId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={32} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>HỒ SƠ XIN VIỆC CỦA BẠN</Text>

                <TouchableOpacity onPress={toggleMenu}>
                <Icon name="cog" type="font-awesome" size={30} color="#A6AEBF" />
                </TouchableOpacity>
            </View>
            <Modal
                transparent={false}
                visible={menuVisible}
                animationType='slide'
                onRequestClose={toggleMenu}
            >
                <View style={styles.fullMenu}>

                    <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                        <Icon name="close" size={30} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.menuContent}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => signOut(dispatch)}>
                            <Text style={styles.menuItemText}>Đăng xuất</Text>
                            <Text style={{ fontSize: 16, fontWeight: '300', paddingHorizontal: 20, marginTop: 3 }}>{userEmail}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.content}>
            <FlatList
                    data={cvs}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cvItem}
                            onPress={() => submitCV(item._id)}
                        >
                            <Text style={styles.cvTitle}>{item.fullName}</Text>
                            <Text style={styles.cvTitle}>{item.email}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CVCreate')}>
                    <Text style={styles.buttonText}>Tạo hồ sơ</Text>
                </TouchableOpacity>
            </View>

            <Navbar navigation={navigation} route={route} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },

    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#011F82',
    },

    backButton: {
        marginRight: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        width: width * 0.9,
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    agreementText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    cvItem: {
        width: width * 0.9,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 10,
    },
    cvTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    copyright: {
        fontSize: 12,
        color: '#666',
    },
    footerLink: {
        fontSize: 12,
        color: '#007AFF',
    },
    fullMenu: {
        flex: 1,
        backgroundColor: '#fff',
    },

    closeButton: {
        alignSelf: 'flex-end',
        padding: 16,
    },
    menuContent: {
        flex: 1,
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: appColors.gray3,
        width: '100%',
    },
    menuItemText: {
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Profile;
