import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColors } from '../constants/appColors';
import ScreenName from '../constants/ScreenName';
import { RootStackParamList } from '../navigator/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const NavbarEmployer = ({ route, navigation }: Props) => {
    const [user, setUser] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null); // Trạng thái lưu userId
    const [employer, setEmployer] = useState<any>(null);
    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUser = JSON.parse(userInfo);
                setUser(parsedUser);
                setUserId(parsedUser.data.user.id);
            }
        };
        getInfo();
    }, []);

    const getIconColor = (screen: string) => {
        return route.name === screen ? appColors.gray : appColors.primary; // Màu xanh cho trang hiện tại, xám cho trang khác
    };

    const getTextColor = (screen: string) => {
        return route.name === screen ? appColors.gray : appColors.primary; // Tương tự như trên
    };

    return (
        <View style={styles.navbar}>
            <View style={styles.group}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HomeEmployer", { userId: userId || '' })}>
                    <Icon name="home" size={25} color="#011F82" />
                    <Text style={styles.navText}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('JobPost')}>
                    <Icon name="bullhorn" type="font-awesome" size={25} color="#011F82" />
                    <Text style={styles.navText}>Đăng tin</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home', { userId: userId || '' })}>
                    <Icon name="briefcase" type="font-awesome" size={25} color="#011F82" />
                    <Text style={styles.navText}>Người tìm việc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>
                        navigation.navigate('InfoEmployer', {userId: userId || '', updated: false})
                    }
                >
                    <Icon name="person" size={25} color={getIconColor('InfoEmployer')} />
                    <Text style={[styles.navText, { color: getTextColor('InfoEmployer') }]}>
                        Hồ sơ
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavbarEmployer;

const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 0.1,
        paddingHorizontal: 15,
    },
    group: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    navText: {
        fontSize: 14,
        marginTop: 2,
        color: appColors.primary,
        fontWeight: 'bold',
    },
});
