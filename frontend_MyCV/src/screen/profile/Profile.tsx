import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../../components/Navbar';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import ScreenName from '../../constants/ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { appColors } from '../../constants/appColors';
import { signOut } from '../../utils/auth';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const { width, height } = Dimensions.get('window');


const Profile = ({ navigation, route }: Props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const handleLogout = async () => {
        try {

        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMenu}>
                    <Icon name="menu" size={25} color="#000" />
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
                            <Text style={styles.menuItemText}>Đánh giá của tôi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => signOut(dispatch)}>
                            <Text style={styles.menuItemText}>Đăng xuất</Text>
                            <Text style={styles.menuItemText}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.content}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Tải lên CV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CVCreate', { startStep: 1, source: 'Profile' } as never)}>
                    <Text style={styles.buttonText}>Xây dựng Indeed CV</Text>
                </TouchableOpacity>
                <Text style={styles.agreementText}>
                    Bằng cách tiếp tục, bạn đồng ý nhận các cơ hội việc làm từ Indeed.
                </Text>
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
