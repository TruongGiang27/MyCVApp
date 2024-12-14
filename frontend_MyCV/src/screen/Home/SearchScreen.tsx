// SearchScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from '@rneui/themed';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { appColors } from '../../constants/appColors';
import { SearchHistoryItem } from '../../interfaces/SearchHistoryItem';
import { BASE_URL } from '../../utils/url';

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
const Search = ({ navigation, onJobSearchSubmit, onSearchHistory, locations }: { navigation: any, onJobSearchSubmit: (query: string) => void, onSearchHistory: (query: string, location: string) => void, locations: City[] }) => {
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');
    const [filteredLocations, setFilteredLocations] = useState<City[]>([]);

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
    }, []);

    // Hàm gọi API SerpAPI
    const fetchJobSuggestions = async (query: string) => {
        if (!query.trim()) return; // Nếu chuỗi rỗng thì không gọi API

        try {
            const response = await axios.get(`${BASE_URL}/jobs/suggest?q=${encodeURIComponent(query)}`);
            if (response.data) {
                setSuggestions(
                    response.data.map((job: any) => ({
                        id: job._id,
                        title: job.title,
                        companyName: job.companyName,
                        type: job.title?.toLowerCase().includes(query.toLowerCase())
                            ? 'job'
                            : 'companyName',

                    }))
                );
            } else {
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
    const handleSubmitEditing = (query: string) => {
        const foundCity = locations.find((city) =>
            city.name.toLowerCase() === query.toLowerCase()
        );

        if (foundCity) {
            navigation.navigate('JobList', { location: foundCity.name, query: '' });
        } else {
            onJobSearchSubmit(query);
        }
    };
    const handleSearchHistory = (item: any) => {
        const selectedQuery = item.query;
        const selectedLocation = item.location;
        if (selectedLocation) {

            onSearchHistory(selectedQuery || '', selectedLocation);
        } else if (selectedQuery) {

            onSearchHistory(selectedQuery, '');
        }
    }
    useEffect(() => {
        setFilteredLocations(locations); // Gán dữ liệu từ locations vào filteredLocations
    }, [locations]);
    const handleSelectSuggestion = (item: any) => {
        const selectedQuery = item.title || item.query;
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
                    onSubmitEditing={() => handleSubmitEditing(query)}
                />
            </View>
            <FlatList
                data={query.length >= 1 ? suggestions : history} // Gợi ý từ API hoặc lịch sử
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.historyItem}
                        onPress={() => {
                            if (query.length >= 1) {
                                handleSelectSuggestion(item);
                            } else {
                                handleSearchHistory(item);
                            }
                        }}
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
                                <View style={{ justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '500', color: '#333333', fontSize: 15, marginBottom: 2 }}>{item.query}</Text>
                                    <Text style={{ fontWeight: '500', color: appColors.gray, fontSize: 13 }}>vị trí {item.location}</Text>
                                </View>
                            ) : item.query ? (
                                <Text style={{ fontWeight: '500' }}>{item.query}</Text>
                            ) : item.location ? (
                                <Text style={{ fontWeight: '500', color: '#333333', fontSize: 15 }}> {item.location}</Text>
                            ) : null}
                            {(item.title || item.query) && (
                                <>
                                    {item.type === 'job' && item.title && <Text>Công việc: {item.title}</Text>}
                                    {item.type === 'companyName' && item.companyName && <Text>Công ty: {item.companyName}</Text>}
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


const SearchMap = ({ onMapSearchSubmit, locations }: { onMapSearchSubmit: (location: string) => void, locations: City[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState<City[]>(majorCities);


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
    useEffect(() => { console.log('aaaaaaaaaaaaaaaaaaaaa', filteredLocations) }, []);

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
    const [locations, setLocations] = useState<City[]>([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const updatedLocation = route.params?.location;
            const updatedQuery = route.params?.query;
            if (updatedLocation !== undefined) setLocation(updatedLocation);
            if (updatedQuery !== undefined) setQuery(updatedQuery);
        });
        return unsubscribe;
    }, [navigation, route.params]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Lấy danh sách tỉnh từ API
                const response = await axios.get('https://provinces.open-api.vn/api/p/');
                const fetchedLocations = response.data.map((province: any) => {
                    let name = province.name;

                    // Loại bỏ tiền tố "Thành phố" và "Tỉnh" nếu có
                    name = name.replace(/^Thành phố /, "").replace(/^Tỉnh /, "").trim();

                    return {
                        code: province.code,
                        name: name,
                        type: 'province',
                    };
                });
                setLocations(fetchedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (searchType === 'text') {
            setIsSearching(true);
            setIsMapSearching(false);
        } else if (searchType === 'map') {
            setIsMapSearching(true);
            setIsSearching(false);
        }
    }, [searchType]);
    const handleSearchHistory = (query: string, location: string) => {
        if (query && location) {
            navigation.navigate('JobList', { location, query });
        } else if (query) {
            navigation.navigate('JobList', { location: '', query });
        } else if (location) {
            navigation.navigate('JobList', { location, query: '' });
        }


    }
    const handleJobSearchSubmit = (selectedJob: string) => {
        navigation.navigate('JobList', { location, query: selectedJob });
    };

    const handleMapSearchSubmit = (selectedLocation: string) => {
        navigation.navigate('JobList', { location: selectedLocation, query });
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
                    <Search navigation={navigation} onJobSearchSubmit={handleJobSearchSubmit} onSearchHistory={handleSearchHistory} locations={locations} />
                ) : isMapSearching ? (
                    <SearchMap onMapSearchSubmit={handleMapSearchSubmit} locations={locations} />
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
