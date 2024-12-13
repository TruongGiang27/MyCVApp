import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Icon } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Navbar from '../../components/Navbar';
import ScreenName from '../../constants/ScreenName';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Home>;
const Header = ({ onSearchFocus, onMapSearchFocus }: { onSearchFocus: () => void, onMapSearchFocus: () => void }) => {

    return (
        <View style={styles.header}>
            <View style={styles.searchBar}>
                <Icon name="search" type="font-awesome" color="#373737" size={15} />
                <TouchableOpacity
                    style={styles.searchInput} // Dùng style cũ của TextInput
                    onPress={onSearchFocus} // Khi nhấn, điều hướng sang màn hình tìm kiếm
                >
                    <Text style={{ color: '#666', height:'70%', width:'100%'}}>Nhập công việc, từ khóa</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <Icon name="map-marker" type="font-awesome" color="#373737" size={15} />
                <TouchableOpacity
                    style={styles.searchInput} // Dùng style cũ của TextInput
                    onPress={onMapSearchFocus} // Khi nhấn, điều hướng sang tìm kiếm bản đồ
                >
                    <Text style={{ color: '#666' }}>Vị trí</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#333', marginTop: 30 }}>Việc làm cho bạn</Text>
        </View>
    );
};



// Mid section (Content)
// Job item component
interface dataJobsIteam {
    _id: string;
    title: string;
    companyName: string;
    location: string;
    salary: string;
    jobType: string;
    jobDescription: string;
}

const isJobBookmarked = async (jobId: string) => {
    try {
        const bookmarkedJobsString = await AsyncStorage.getItem('bookmarkedJobs');
        const bookmarkedJobs = bookmarkedJobsString ? JSON.parse(bookmarkedJobsString) : [];
        const validBookmarkedJobs = bookmarkedJobs.filter((job: any) => job && job._id); // Filter out invalid jobs
        return validBookmarkedJobs.some((job: dataJobsIteam) => job._id === jobId);
    } catch (error) {
        console.error("Failed to check if job is bookmarked:", error);
        return false;
    }
};

const toggleBookmarkJob = async (job: dataJobsIteam, setIsBookmarked: (value: boolean) => void) => {
    if (!job || !job._id) {
        console.error("Invalid job object:", job);
        return;
    }
    try {
        const bookmarkedJobsString = await AsyncStorage.getItem('bookmarkedJobs');
        let bookmarkedJobs = bookmarkedJobsString ? JSON.parse(bookmarkedJobsString) : [];
        const jobIndex = bookmarkedJobs.findIndex((bookmarkedJob: dataJobsIteam) => bookmarkedJob && bookmarkedJob._id === job._id);

        if (jobIndex !== -1) {
            bookmarkedJobs.splice(jobIndex, 1);
            setIsBookmarked(false);
        } else {
            bookmarkedJobs.push(job);
            setIsBookmarked(true);
        }

        await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    } catch (error) {
        console.error("Failed to toggle bookmark job:", error);
    }
};

const JobItem = ({ title, companyName, salary, location, onPress, job, navigation }: { title: string, companyName: string, salary: string, location: string, onPress: () => void, job: dataJobsIteam, navigation: any }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const checkIfBookmarked = async () => {
            const bookmarked = await isJobBookmarked(job._id);
            setIsBookmarked(bookmarked);
        };
        checkIfBookmarked();
    }, [job._id]);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <View style={{ paddingHorizontal: 15, paddingVertical: 0 }}>
                <Card containerStyle={styles.cardContainer}>
                    <TouchableOpacity style={styles.icon} onPress={() => toggleBookmarkJob(job, setIsBookmarked)}>
                        <Icon name="bookmark" type="font-awesome" color={isBookmarked ? "#011F82" : "#666"} size={25} />
                    </TouchableOpacity>

                    <Text style={styles.title}>{title}</Text>
                    <View style={{ marginVertical: width * 0.03 }}>
                        <Text style={styles.company}>{companyName}</Text>
                        <Text style={styles.location}>{location}</Text>
                    </View>

                    <Text style={styles.salary}>{salary}</Text>
                    <View style={styles.easyApplyContainer}>
                        <Icon name="send" type="material" color="#007AFF" size={14} style={styles.sendIcon} />
                        <Text style={styles.easyApply}>Nộp đơn dễ dàng</Text>
                    </View>
                    {/* <Text style={styles.timePosted}>{timePosted}</Text> */}
                </Card>
            </View>
        </TouchableOpacity >
    )
};


const Content = ({ onSearchFocus, onMapSearchFocus, navigation }: { onSearchFocus: () => void, onMapSearchFocus: () => void, navigation: any }) => {
    interface dataJobsIteam {
        _id: string;
        title: string;
        companyName: string;
        location: string;
        salary: string;
        jobType: string;
        jobDescription: string;
    }
    const [dataJobs, setDataJobs] = useState<dataJobsIteam[]>([]);
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [userId, setUserId]= useState('');
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                console.log("Fetching data from:", `${BASE_URL}/jobs`);
                const userInfoString = await AsyncStorage.getItem('userInfo');
                const userInfo = userInfoString ? JSON.parse(userInfoString) : {};
                setUserId(userInfo.data.user.id);
                console.log("-------------------");
                console.log("userInfo", userInfo.data.user.id);
                const response = await fetch(`${BASE_URL}/jobs`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseJson = await response.json();
                setDataJobs(responseJson);
                console.log("Data fetched successfully:", responseJson);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);



    if (loading) {
        return (
            <ActivityIndicator size="large" color="#007AFF" />
        );
    }

    return (
        <FlatList
            data={dataJobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <JobItem
                    title={item.title}
                    companyName={item.companyName}
                    salary={item.salary}
                    location={item.location}
                    onPress={() => navigation.navigate('JobDetail', { jobId: item._id, userId: userId })}
                    job={item}
                    navigation={navigation}
                // timePosted={item.timePosted}
                // isPremium={item.isPremium}
                />
            )}
            ListHeaderComponent={<Header onSearchFocus={onSearchFocus} onMapSearchFocus={onMapSearchFocus} />}
            onEndReachedThreshold={0.5}  // Trigger load when 50% from bottom
        />
    );
};


// Home component

const Home = ({ navigation, route }: Props) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isMapSearching, setIsMapSearching] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    interface user {
        _id: string;
        googleId: string;
        name: string;
        email: string;
        role: string;

    }
    useEffect(() => {
        const pushUserData = async () => {
            try {
                const userInfoString = await AsyncStorage.getItem('userInfo');
                if (userInfoString) {
                    const userInfo = await JSON.parse(userInfoString);
                    console.log("userInfo//////", userInfo);
                    await axios.post(`${BASE_URL}/user/create-or-update`, {
                        userId: userInfo.data.user.id,
                        name: userInfo.data.user.name,
                        email: userInfo.data.user.email,
                        avatar: userInfo.data.user.photo,
                    });
                }
            } catch (error) {
                console.error("eaea", error);
            }
        };

        pushUserData();
    }, []);

    const handleSearchFocus = () => {
        navigation.navigate('SearchScreen', { searchType: "text" }); // Điều hướng đến SearchScreen khi nhấn tìm kiếm
    };

    const handleMapSearchFocus = () => {
        navigation.navigate('SearchScreen', { searchType: 'map' }); // Điều hướng đến SearchScreen khi nhấn tìm kiếm bản đồ
    };
    // responsive window width
    const { width } = useWindowDimensions();
    const logoWidth = width * 0.5;
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../../assets/images/logo.png')} style={{ width: 130, height: logoWidth * 0.25 }} />
            </View>
            <View style={styles.headContainer}>
                <>
                    <Content onSearchFocus={handleSearchFocus} onMapSearchFocus={handleMapSearchFocus} navigation={navigation} />
                </>
            </View>
            <View>
                <Navbar navigation={navigation} route={route} />
            </View>
        </View>

    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        paddingHorizontal: 15,
        paddingTop: "3%",
        position: 'relative',
        height: width * 0.15,
    },
    // Top section (Header)
    header: {
        padding: 15,
    },
    searchBar: {
        height: height * 0.055,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#CECECE',
        borderRadius: 9,
        paddingHorizontal: 10,
        elevation: 4,
    },
    
    divider: {
        width: 1,
        height: '70%',
        backgroundColor: '#CECECE',
        marginHorizontal: 15,
    },
    // Search view styles
    searchInput: {
        flex: 1,
        padding: 10,
    },
    searchContainer: {
        flex: 1,
        padding: 20,
    },
    searchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fullSearchInput: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
    },
    cancelButton: {
        color: '#007AFF',
        fontSize: 16,
    },
    searchText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    // Mid section (Content)
    cardContainer: {
        borderWidth: 0,
        borderRadius: 8,
        borderColor: '#ddd',
        width: '100%',
        alignSelf: 'center',
        elevation: 2,
    },
    premiumTag: {
        backgroundColor: '#fdecef',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    premiumText: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: 12,
    },
    title: {
        fontSize: width * 0.05,
        width: '85%',
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    company: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    salary: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    timePosted: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
    },
    easyApplyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sendIcon: {
        marginRight: 5,
    },
    easyApply: {
        fontSize: 14,
        color: '#007AFF',
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
});