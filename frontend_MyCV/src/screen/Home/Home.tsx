import { Card, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

// Sample job data
const data = [
    { id: '1', title: 'Hệ Thống Bách Hóa Xanh - Nam Nữ Bán Hàng', company: 'Công Ty TNHH TM-DV PANPACIFIC', salary: '4.500.000 ₫ - 12.500.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '3 ngày trước' },
    { id: '2', title: 'Sale Executive', company: 'Roche', salary: 'Thỏa thuận', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước' },
];

// Top section (Header)
const Header = ({ onSearchFocus }: { onSearchFocus: () => void }) => {

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

                <Icon name="map-marker" type="font-awesome" color="#999" size={18} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Vị trí"
                    onChangeText={setSearchTerm}
                    onFocus={onSearchFocus}  // Trigger search view when focused
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
        {/* Content for search results can be added here */}
        <Text style={styles.searchText}>Hiển thị kết quả tìm kiếm...</Text>
    </View>
);

const SearchMap = ({ onCancel }: { onCancel: () => void }) => (
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
        {/* Content for search results can be added here */}
        <Text style={styles.searchText}>Hiển thị kết quả tìm kiếm...</Text>
    </View>
);
// Mid section (Content)
interface JobItemProps {
    title: string;
    company: string;
    salary: string;
    location: string;
    timePosted: string;
}

const JobItem: React.FC<JobItemProps> = ({ title, company, salary, location, timePosted }) => (
    <Card containerStyle={styles.cardContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.company}>{company}</Text>
        <Text style={styles.salary}>{salary}</Text>
        <Text style={styles.location}>{location}</Text>
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

    const handleSearchFocus = () => {
        setIsSearching(true);
    };

    const handleCancelSearch = () => {
        setIsSearching(false);
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
    contentContainer: {
        paddingBottom: 80, // Avoid overlap with navbar
    },
    cardContainer: {
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
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
    },
    location: {
        fontSize: 13,
        color: '#666',
        marginTop: 5,
    },
    timePosted: {
        fontSize: 12,
        color: '#999',
    },

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