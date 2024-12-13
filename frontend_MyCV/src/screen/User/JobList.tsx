// SearchScreen.tsx
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { appColors } from '../../constants/appColors';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import ScreenName from '../../constants/ScreenName';
import { BASE_URL } from '../../utils/url';
import { SearchHistoryItem } from '../../interfaces/SearchHistoryItem';



type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

interface City {
    code: string;
    name: string;
    type: string;
}
const majorCities = [
    { code: '01', name: 'Hà Nội', type: 'city' },
    { code: '79', name: 'Thành phố Hồ Chí Minh', type: 'city' },
    { code: '48', name: 'Đà Nẵng', type: 'city' },
    { code: '31', name: 'Hải Phòng', type: 'city' },
    { code: '74', name: 'Bình Dương', type: 'city' },
];
const Search = ({ navigation, onJobSearchSubmit }: { navigation: any, onJobSearchSubmit: (query: string) => void }) => {
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);
    const [suggestions, setSuggestions] = useState<any[]>([]); // Gợi ý từ API
    const [query, setQuery] = useState<string>(''); // Từ khóa tìm kiếm

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const historyJson = await AsyncStorage.getItem('searchHistory');
                if (historyJson) {
                    setHistory(JSON.parse(historyJson));
                }
            } catch (error) {
                console.error('Error loading location history:', error);
            }
        };
        loadHistory();
        console.log('History:', history);
    }, []);

    // Hàm gọi API SerpAPI
    const fetchJobSuggestions = async (query: string) => {
        if (!query.trim()) return; // Nếu chuỗi rỗng thì không gọi API

        try {
            const response = await axios.get(`${BASE_URL}/jobs/suggest?q=${encodeURIComponent(query)}`);

            console.log('API response:', response.data);

            if (response.data) {
                setSuggestions(
                    response.data.map((job: any) => ({
                        id: job._id,
                        title: job.title,
                        company: job.company,
                        type: job.title?.toLowerCase().includes(query.toLowerCase())
                            ? 'job'
                            : 'company',

                    }))
                );
            } else {
                console.log('Không có gợi ý công việc');
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const handleInputChange = (text: string) => {
        setQuery(text);
        if (text.length >= 1) {
            fetchJobSuggestions(text);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (item: any) => {
        const selectedQuery = item.title || item.query;
        console.log('Selected query:', selectedQuery);
        setQuery(selectedQuery);
        onJobSearchSubmit(selectedQuery);
    };

    return (
        <View style={styles.searchContainer}>
            <Text style={{ marginBottom: 10, fontWeight: '500' }}>Bạn hãy nhập tên công việc hoặc công ty</Text>
            <View style={styles.searchHeader}>
                <Icon name="search" type="font-awesome" color="#373737" size={15} />
                <TextInput
                    style={styles.fullSearchInput}
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={query}
                    onChangeText={handleInputChange}
                    autoFocus={true}
                    onSubmitEditing={() => onJobSearchSubmit(query)}
                />
            </View>
            <FlatList
                data={query.length >= 1 ? suggestions : history} // Gợi ý từ API hoặc lịch sử
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.historyItem}
                        onPress={() => { handleSelectSuggestion(item) }}
                    >
                        <View
                            style={{
                                backgroundColor: appColors.gray5,
                                padding: 5,
                                borderRadius: 8,
                            }}
                        >
                            <Icon
                                name="search"
                                type="material"
                                color="#000"
                                size={24}
                            />
                        </View>
                        <Text style={styles.historyText}>
                            {item.query && item.location ? (
                                <View style={{justifyContent:'space-between'}}>
                                    <Text style={{ fontWeight: '500', color: '#333333' , fontSize:15, marginBottom:2}}>{item.query}</Text>
                                    <Text style={{ fontWeight: '500', color: appColors.gray , fontSize:13}}>vị trí {item.location}</Text>
                                </View>
                            ) : item.query ? (
                                <Text style={{ fontWeight: 'bold' }}>{item.query}</Text>
                            ) : item.location ? (
                                <Text style={{ fontWeight: '500', color: '#333333' , fontSize:15}}> {item.location}</Text>
                            ) : null}
                            {(item.title || item.query) && (
                                <>
                                    {item.type === 'job' && item.title && <Text>Công việc: {item.title}</Text>}
                                    {item.type === 'company' && item.company && <Text>Công ty: {item.company}</Text>}
                                </>
                            )} {/* Hiển thị công việc hoặc lịch sử */}
                        </Text>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <Text style={styles.searchText}>
                        {query.length >= 1 ? 'Gợi ý tìm kiếm' : 'Các tìm kiếm gần đây'}
                    </Text>
                )}
                ListEmptyComponent={
                    <Text style={styles.noResultText}>
                        {query.length >= 1 ? 'Không có gợi ý phù hợp.' : 'Không có lịch sử tìm kiếm.'}
                    </Text>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};


const SearchMap = ({ onMapSearchSubmit, navigation }: { onMapSearchSubmit: (location: string) => void, navigation: any }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState<City[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<City[]>(majorCities);
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);



    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Lấy danh sách tỉnh từ API
                const response = await axios.get('https://provinces.open-api.vn/api/p/');
                const fetchedLocations = response.data.map((province: any) => ({
                    code: province.code,
                    name: province.name,
                    type: 'province',
                }));
                setLocations(fetchedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query.trim() !== '') {
            const filtered = locations.filter((location) =>
                location.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLocations(filtered.slice(0, 10));
        } else {
            setFilteredLocations(majorCities);
        }
    };
    const handleClearInput = () => {
        setSearchQuery('');
        setFilteredLocations(majorCities); // Reset lại danh sách khi xóa
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.searchContainer}>
                <Text style={{ marginBottom: 10, fontWeight: '500' }}>Nhập tên thành phố hoặc tỉnh</Text>
                <View style={styles.searchHeader}>
                    <Icon name="search" type="font-awesome" color="#373737" size={20} />
                    <TextInput
                        style={styles.fullSearchInput}
                        placeholder="Nhập vị trí"
                        autoFocus={true}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        onSubmitEditing={() => onMapSearchSubmit(searchQuery)}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearInput} style={styles.clearButton}>
                            <Icon name="times" type="font-awesome" color="#373737" size={20} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{ fontWeight: 'bold', color: '#333', marginVertical: 20 }}>Đề xuất địa điểm</Text>
                <FlatList
                    data={filteredLocations}
                    keyExtractor={(item) => `${item.code}-${item.type}`}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultItem}
                            onPress={() => onMapSearchSubmit(item.name)}
                        >
                            <Icon
                                name="map-marker"
                                type="font-awesome"
                                color={appColors.primary}
                                size={20}
                                style={styles.resultIcon}
                            />
                            <Text style={styles.resultText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.noResultText}>Không tìm thấy kết quả.</Text>}
                />
            </View>
        </KeyboardAvoidingView>
    );
};



const SearchScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isMapSearching, setIsMapSearching] = useState(false);
    //Check if the search type is text or map
    const { searchType } = route.params;
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const updatedLocation = route.params?.location;
            const updatedQuery = route.params?.query;
            console.log('Updated locationaaaaaaaaaaaa:', updatedLocation);
            console.log('Updated queryaaaaaaaaaaaaa:', updatedQuery);
            if (updatedLocation !== undefined) setLocation(updatedLocation);
            if (updatedQuery !== undefined) setQuery(updatedQuery);
        });
        return unsubscribe;
    }, [navigation, route.params]);

    useEffect(() => {
        if (searchType === 'text') {
            setIsSearching(true);
            setIsMapSearching(false);
        } else if (searchType === 'map') {
            setIsMapSearching(true);
            setIsSearching(false);
        }
    }, [searchType]);
    const handleJobSearchSubmit = (selectedJob: string) => {
        navigation.navigate('JobList1', { location, query: selectedJob });
    };

    const handleMapSearchSubmit = (selectedLocation: string) => {
        navigation.navigate('JobList1', { location: selectedLocation, query });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.headContainer}>
                {isSearching ? (
                    <Search navigation={navigation} onJobSearchSubmit={handleJobSearchSubmit} />
                ) : isMapSearching ? (
                    <SearchMap navigation={navigation} onMapSearchSubmit={handleMapSearchSubmit} />
                ) : null}
            </View>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        marginRight: 20,
        padding: 10,
    },
    headContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    searchContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchHeader: {
        height: 50,
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderColor: appColors.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fullSearchInput: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    clearButton: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
    },
    resultItem: {
        flexDirection: 'row', // Đặt các phần tử con theo chiều ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        paddingVertical: 16,
    },
    resultText: {
        fontSize: 16,
        color: '#000',
    },
    resultIcon: {
        marginRight: 20,
    },
    noResultText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        marginTop: 20,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    historyText: {
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
    },

});
