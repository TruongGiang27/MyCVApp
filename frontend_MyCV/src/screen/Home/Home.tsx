import { Card, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Keyboard, TextInput, Image, useWindowDimensions, Dimensions } from 'react-native';

//
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
// Sample job data
const data = [
    { id: '1', title: 'Client Management Assistant (100% Remote)', company: 'AwePlus Cx Transformation', salary: '9.000.000 ₫ - 12.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '2', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
];

// Top section (Header)
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
                    onFocus={onSearchFocus}  // Trigger search view when focused
                />
                <View style={styles.divider} />
                <Icon name="map-marker" type="font-awesome" color="#373737" size={18} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Vị trí"
                    onChangeText={setSearchTerm}
                    onFocus={onMapSearchFocus}  // Trigger map search view when focused
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
const JobItem = ({ title, company, salary, location, timePosted, isPremium }) => (
    <Card containerStyle={styles.cardContainer}>

        {isPremium && (
            <View style={styles.premiumTag}>
                <Text style={styles.premiumText}>Tuyển dụng nhiều ứng viên</Text>
            </View>
        )}
        <TouchableOpacity style={styles.icon}>
            <Icon name="bookmark" type="font-awesome" color="#666" size={25} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <View style={{marginVertical:width*0.03}}>
            <Text style={styles.company}>{company}</Text>
            <Text style={styles.location}>{location}</Text>
        </View>

        <Text style={styles.salary}>{salary}</Text>
        <View style={styles.easyApplyContainer}>
            <Icon name="send" type="material" color="#007AFF" size={14} style={styles.sendIcon} />
            <Text style={styles.easyApply}>Nộp đơn dễ dàng</Text>
        </View>
        <Text style={styles.timePosted}>{timePosted}</Text>
    </Card>
);


const Content = () => (
    <FlatList
        data={data}
        renderItem={({ item }) => (
            <JobItem
                title={item.title}
                company={item.company}
                salary={item.salary}
                location={item.location}
                timePosted={item.timePosted}
                isPremium={item.isPremium}
            />
        )}
        keyExtractor={(item) => item.id}
    />
);

// Bottom section (Navigation Bar)
const Navbar = () => (
    <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="home" type="font-awesome" color="#007AFF" />
            <Text style={styles.navText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="bookmark" type="font-awesome" color="#666" />
            <Text style={styles.navText}>Việc làm của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="envelope" type="font-awesome" color="#666" />
            <Text style={styles.navText}>Tin nhắn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="user" type="font-awesome" color="#666" />
            <Text style={styles.navText}>Hồ sơ</Text>
        </TouchableOpacity>
    </View>
);

// Main component
const Home = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isMapSearching, setIsMapSearching] = useState(false);

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
        Keyboard.dismiss(); // Dismiss keyboard when search is canceled
    };

    const { width } = useWindowDimensions();  // Get the current screen width
    const logoWidth = width * 0.5;

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../../assets/images/logo.png')} style={{ width: 130, height: logoWidth * 0.25 }} />
            </View>
            {!isSearching && !isMapSearching && <Header onSearchFocus={handleSearchFocus} onMapSearchFocus={handleMapSearchFocus} />}
            {isSearching ? (
                <Search onCancel={handleCancelSearch} />
            ) : isMapSearching ? (
                <SearchMap onCancel={handleCancelSearch} />
            ) : (
                <>
                    <Content />
                    <Navbar />
                </>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: "2%",
    },
    logo: {
        marginTop: "4%",
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
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        alignSelf: 'center',
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
    // Bottom section (Navbar)
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
    },
});