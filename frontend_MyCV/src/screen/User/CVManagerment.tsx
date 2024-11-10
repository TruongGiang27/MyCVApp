import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the type for the navigation parameters
type RootStackParamList = {
    CVCreate: { startStep: number };
};

interface ProfileData {
    fullName: string;
    email: string;
    phone: string;
    address: {
        country: string;
        address: string;
        city: string;
        zipCode: string;
    };
}

const CVManagerment = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/cv_form`);
                console.log('Response data:', response.data); // Log the entire response data
                const profile = response.data[0]; // Assuming the response is an array and we need the first item
                const { fullName, email, phone, address } = profile;
                console.log('Profile data:', { fullName, email, phone, address });
                if (fullName && email && phone && address) {
                    setProfileData({ fullName, email, phone, address });
                } else {
                    console.error('Some profile data fields are missing in the response');
                }
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleNavigateToMessages = () => {
        navigation.navigate('Message' as never);
    };

    if (!profileData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerText}>My CV</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleNavigateToMessages}>
                        <Icon name="chat-bubble-outline" size={24} color="#011F82" style={styles.icon} />
                    </TouchableOpacity>
                    <Icon name="notifications-none" size={24} color="#011F82" style={styles.icon} />
                    <Icon name="menu" size={24} color="#011F82" style={styles.icon} />
                </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileSection}>
                <View style={styles.userRow}>
                    <Text style={styles.profileName}>{profileData.fullName}</Text>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{profileData.fullName ? profileData.fullName.charAt(0) : ''}</Text>
                    </View>
                </View>

                {/* Info Group */}
                <View style={styles.infoGroup}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Icon name="email" size={20} color="#011F82" />
                            <Text style={styles.infoText}>{profileData.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="phone" size={20} color="#011F82" />
                            <Text style={styles.infoText}>{profileData.phone}</Text>
                        </View>
                        {profileData.address && (
                            <View style={styles.infoRow}>
                                <Icon name="location-on" size={20} color="#011F82" />
                                <Text style={styles.infoText}>{`${profileData.address.address}, ${profileData.address.city}, ${profileData.address.country}, ${profileData.address.zipCode}`}</Text>
                            </View>
                        )}
                    </View>
                    <Icon name="chevron-right" size={24} color="#011F82" style={styles.infoArrow} />
                </View>
            </View>

            {/* CV Section */}
            <TouchableOpacity style={styles.cvSection} onPress={() => navigation.navigate('CVCreate', { startStep: 10 })}>
                <Text style={styles.MyCVTitle}>CV của bạn</Text> 
                <View style={styles.cvCard}>
                    <Image
                        source={{ uri: 'https://e7.pngegg.com/pngimages/205/491/png-clipart-cv-library-employment-website-curriculum-vitae-recruitment-job-others-miscellaneous-blue.png' }}
                        style={styles.cvLogo}
                    />
                    <View style={styles.cvInfo}>
                        <Text style={styles.cvTitle}>My CV</Text>
                        <Text style={styles.cvSubtitle}>Cập nhật hôm nay</Text>
                        <Text style={styles.cvStatus}>Không thể tìm được</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#011F82" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#011F82',
        marginLeft: 8,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 8,
    },
    profileSection: {
        marginTop: 24,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,

    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#011F82',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
        color: '#011F82',
        textTransform: 'capitalize',
        marginRight: 'auto',
    },
    infoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: '#B9D6F3',
        borderRadius: 8,
        marginTop: 16,
    },
    infoContainer: {
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#011F82',
    },
    infoArrow: {
        alignSelf: 'flex-start',
        marginTop: 30,
    },
    cvSection: {
        marginTop: 32,
        paddingTop: 16,
    },
    cvCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B9D6F3',
    },
    cvLogo: {
        width: 60,
        height: 80,
        resizeMode: 'contain',
        marginRight: 16,
        borderRadius: 8,
    },
    cvInfo: {
        flex: 1,
    },
    cvTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#011F82',
    },
    cvSubtitle: {
        fontSize: 14,
        color: '#6D92D0',
    },
    cvStatus: {
        fontSize: 14,
        color: '#6D92D0',
    },
    MyCVTitle: {    
        fontSize: 20,
        fontWeight: 'bold',
        color: '#011F82',
        marginBottom: 16,
    }
});

export default CVManagerment;
