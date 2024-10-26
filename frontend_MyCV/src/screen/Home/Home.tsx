import { Card, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Keyboard, TextInput, Image, useWindowDimensions, Dimensions } from 'react-native';

//
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
// Sample job data
const data = [
    { id: '1', title: 'Client Management Assistant (100% Remote)', company: 'AwePlus Cx Transformation', salary: '9.000.000 ₫ - 12.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '2', title: 'Content & Community Curator', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
];

// Top section (Header)
const Header = ({ onSearchFocus, onMapSearchFocus }: { onSearchFocus: () => void, onMapSearchFocus: () => void }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <View style={styles.header}>
            <View style={styles.searchBar}>
                <Icon name="search" type="font-awesome" color="#999" size={18} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm"
                    onChangeText={setSearchTerm}
                    onFocus={onSearchFocus}  // Trigger search view when focused
                />
                <View style={styles.divider} />
                <Icon name="map-marker" type="font-awesome" color="#999" size={18} />
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
        {/* Nếu là công việc premium, hiển thị nhãn đặc biệt */}
        {isPremium && (
            <View style={styles.premiumTag}>
                <Text style={styles.premiumText}>Tuyển dụng nhiều ứng viên</Text>
            </View>

        )}
        <View style={styles.jobHeader}>
            <Text style={styles.title}>{title}</Text>
            {/* Icon bookmark luôn hiển thị */}
            <Icon name="bookmark" type="font-awesome" color="#666" size={20} />
        </View>
        <Text style={styles.company}>{company}</Text>
        <Text style={styles.salary}>{salary}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.timePosted}>{timePosted}</Text>
        <Text style={styles.easyApply}>Nộp đơn dễ dàng</Text>
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
        contentContainerStyle={styles.contentContainer}
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
        setIsMapSearching(false);
    };

    const handleMapSearchFocus = () => {
        setIsMapSearching(true);
        setIsSearching(false);
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
            <Image source={require('../../../assets/images/logo.png')} style={[styles.logo, { width: 130, height: logoWidth * 0.25 }]} />

            {!isSearching && <Header onSearchFocus={handleSearchFocus} />}
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
        backgroundColor: '#f9f9f9',
    },
    // Top section (Header)
    header: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    logo: {
        resizeMode: 'contain',
        width: width * 0.5,  
        height: width * 0.125,  
        marginBottom: width * 0.05,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 9,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#333',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#ddd',
        marginHorizontal: 10,
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
        padding: width * 0.04,
        marginBottom: width * 0.03,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '95%',
        alignSelf: 'center',
    },
    premiumTag: {
        backgroundColor: '#fdecef',
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: width * 0.02, 
    },
    premiumText: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: width * 0.03,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: width * 0.02,
    },
    title: {
        fontSize: width * 0.045,  // Điều chỉnh kích thước chữ tiêu đề theo chiều rộng màn hình
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    company: {
        fontSize: width * 0.035,  // Kích thước chữ nhỏ hơn cho tên công ty
        color: '#555',
        marginBottom: 5,
    },
    salary: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: width * 0.04,  
    },
    location: {
        fontSize: width * 0.035,  
        color: '#666',
        marginTop: 5,
    },
    timePosted: {
        fontSize: width * 0.03,  
        color: '#999',
    },
    easyApply: {
        fontSize: width * 0.03, 
        color: '#007AFF',
        marginTop: 5,
    },
    contentContainer: {
        paddingBottom: height * 0.15, 
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