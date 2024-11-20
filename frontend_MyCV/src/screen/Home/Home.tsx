import { Card, Icon } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Keyboard, TextInput, Image, useWindowDimensions, Dimensions } from 'react-native';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import ScreenName from '../../constant/ScreenName';
import { BASE_URL } from '../../utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const Header = ({ onSearchFocus, onMapSearchFocus }: { onSearchFocus: () => void, onMapSearchFocus: () => void }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <View style={styles.header}>
            <View style={styles.searchBar}>
                <Icon name="search" type="font-awesome" color="#373737" size={18} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm"
                    onChangeText={setSearchTerm}
                    onFocus={onSearchFocus}
                />
                <View style={styles.divider} />
                <Icon name="map-marker" type="font-awesome" color="#373737" size={18} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Vị trí"
                    onChangeText={setSearchTerm}
                    onFocus={onMapSearchFocus}
                />
            </View>
        </View>
    );
};

// Search
const Search = ({ onCancel }: { onCancel: () => void }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
            <TextInput
                style={styles.fullSearchInput}
                placeholder="Nhập từ khóa tìm kiếm"
                autoFocus={true}  // Automatically focus when Search opens
            />
            <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelButton}>Hủy</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.searchText}>Hiển thị kết quả tìm kiếm...</Text>
    </View>
);

// Search Map
const SearchMap = ({ onCancel }: { onCancel: () => void }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
            <TextInput
                style={styles.fullSearchInput}
                placeholder="Nhập vị trí"
                autoFocus={true}  // Automatically focus when Search Map opens
            />
            <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelButton}>Hủy</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.searchText}>Hiển thị kết quả tìm kiếm trên bản đồ...</Text>
    </View>
);

// Mid section (Content)
// Job item component
const JobItem = ({ title, company, salary, location }: { title: string, company: string, salary: string, location: string }) => {

    return (
        <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>
            <Card containerStyle={styles.cardContainer}>

                {/* {isPremium && (
                <View style={styles.premiumTag}>
                    <Text style={styles.premiumText}>Tuyển dụng nhiều ứng viên</Text>
                </View>
            )} */}
                <TouchableOpacity style={styles.icon}>
                    <Icon name="bookmark" type="font-awesome" color="#666" size={25} />
                </TouchableOpacity>

                <Text style={styles.title}>{title}</Text>
                <View style={{ marginVertical: width * 0.03 }}>
                    <Text style={styles.company}>{company}</Text>
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
    )
};


const Content = ({ onSearchFocus, onMapSearchFocus }: { onSearchFocus: () => void, onMapSearchFocus: () => void }) => {
    interface dataJobsIteam {
        _id: string;
        title: string;
        company: string;
        location: string;
        salary: string;
        jobType: string;
        jobDescription: string;
    }
    const [dataJobs, setDataJobs] = useState<dataJobsIteam[]>([]);
    const [loading, setLoading] = useState(true);  // Trạng thái loading

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                console.log("Fetching data from:", `${BASE_URL}/jobs`);
                const response = await fetch(`${BASE_URL}/jobs`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseJson = await response.json();
                setDataJobs(responseJson);
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
                    company={item.company}
                    salary={item.salary}
                    location={item.location}
                // timePosted={item.timePosted}
                // isPremium={item.isPremium}
                />
            )}
            ListHeaderComponent={<Header onSearchFocus={onSearchFocus} onMapSearchFocus={onMapSearchFocus} />}
            ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007AFF" /> : <Footer />}
            onEndReachedThreshold={0.5}  // Trigger load when 50% from bottom
        />
    );
};


// Home component

const Home = ({ navigation, route }: Props) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isMapSearching, setIsMapSearching] = useState(false);
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
                    console.log('User info:', userInfo);
                    await axios.post(`${BASE_URL}/user/create-or-update`, {
                        googleId: userInfo.data.user.id,
                        name: userInfo.data.user.name,
                        email: userInfo.data.user.email,
                        avatar: userInfo.data.user.photo,
                    });
                }
            } catch (error) {
                console.error("eaea",error);
            }
        };

        pushUserData();
    }, []);

    const handleSearchFocus = () => {
        setIsSearching(true);
        setIsMapSearching(false); // Close map search if it’s open
    };

    const handleMapSearchFocus = () => {
        setIsMapSearching(true);
        setIsSearching(false); // Close text search if it’s open
    };

    const handleCancelSearch = () => {
        setIsSearching(false);
        setIsMapSearching(false);
        Keyboard.dismiss();
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
                {isSearching ? (
                    <Search onCancel={handleCancelSearch} />
                ) : isMapSearching ? (
                    <SearchMap onCancel={handleCancelSearch} />
                ) : (
                    <>
                        <Content onSearchFocus={handleSearchFocus} onMapSearchFocus={handleMapSearchFocus} />
                    </>
                )}
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
        padding: "3%",
        position: 'relative',
        height: width * 0.15,
    },
    // Top section (Header)
    header: {
        paddingVertical: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CECECE',
        borderRadius: 9,
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#373737',
    },
    divider: {
        width: 1,
        height: '70%',
        backgroundColor: '#CECECE',
        marginHorizontal: 15,
    },
    // Search view styles
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
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    cancelButton: {
        color: '#007AFF',
        fontSize: 16,
    },
    searchText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    // Mid section (Content)
    cardContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
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