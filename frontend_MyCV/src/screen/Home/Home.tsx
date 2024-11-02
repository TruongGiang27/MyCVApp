import { Card, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Keyboard, TextInput, Image, useWindowDimensions, Dimensions } from 'react-native';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
//
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
// Sample job data
const data = [
    { id: '1', title: 'Client Management Assistant (100% Remote)', company: 'AwePlus Cx Transformation', salary: '9.000.000 ₫ - 12.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '2', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '3', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '4', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '5', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '6', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '7', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '8', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '9', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '10', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '11', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '12', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '13', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '14', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '15', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '16', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '17', title: 'Content & Community Curator aaaaaa aaaaaaaa aaa aaaa aaaa b aa a aa aaaaaaaa aaaaaaa aaaaa aaaa aaaa aa', company: 'Kobe Global Technologies', salary: '13.400.000 ₫ - 17.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: false },
    { id: '18', title: 'Software Engineer', company: 'Tech Solutions', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '2 ngày trước', isPremium: true },
    { id: '19', title: 'Project Manager', company: 'Innovatech', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '5 ngày trước', isPremium: false },
    { id: '20', title: 'Data Scientist', company: 'DataCorp', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: true },
    { id: '21', title: 'UX/UI Designer', company: 'Creative Minds', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: false },
    { id: '22', title: 'Marketing Specialist', company: 'MarketPro', salary: '15.000.000 ₫ - 20.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '4 ngày trước', isPremium: true },
    { id: '23', title: 'Sales Executive', company: 'SalesForce', salary: '12.000.000 ₫ - 18.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '2 ngày trước', isPremium: false },
    { id: '24', title: 'HR Manager', company: 'PeopleFirst', salary: '22.000.000 ₫ - 28.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '1 ngày trước', isPremium: true },
    { id: '25', title: 'Business Analyst', company: 'BizAnalytica', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '3 ngày trước', isPremium: false },
    { id: '26', title: 'Network Engineer', company: 'NetSecure', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '5 ngày trước', isPremium: true },
    { id: '27', title: 'DevOps Engineer', company: 'CloudOps', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '2 ngày trước', isPremium: false },
    { id: '28', title: 'Product Manager', company: 'ProdManage', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '1 ngày trước', isPremium: true },
    { id: '29', title: 'Graphic Designer', company: 'DesignHub', salary: '15.000.000 ₫ - 20.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '4 ngày trước', isPremium: false },
    { id: '30', title: 'Content Writer', company: 'WritePro', salary: '12.000.000 ₫ - 18.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '31', title: 'SEO Specialist', company: 'SearchMax', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '2 ngày trước', isPremium: false },
    { id: '32', title: 'Customer Support', company: 'SupportPlus', salary: '10.000.000 ₫ - 15.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: true },
    { id: '33', title: 'Mobile Developer', company: 'AppDev', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '5 ngày trước', isPremium: false },
    { id: '34', title: 'QA Engineer', company: 'QualityFirst', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '3 ngày trước', isPremium: true },
    { id: '35', title: 'System Administrator', company: 'SysAdminPro', salary: '22.000.000 ₫ - 28.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '2 ngày trước', isPremium: false },
    { id: '36', title: 'IT Support', company: 'TechHelp', salary: '12.000.000 ₫ - 18.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '1 ngày trước', isPremium: true },
    { id: '37', title: 'Database Administrator', company: 'DataManage', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '4 ngày trước', isPremium: false },
    { id: '38', title: 'Cybersecurity Analyst', company: 'SecureNet', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '3 ngày trước', isPremium: true },
    { id: '39', title: 'Cloud Architect', company: 'CloudTech', salary: '35.000.000 ₫ - 40.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '2 ngày trước', isPremium: false },
    { id: '40', title: 'AI Engineer', company: 'AIMinds', salary: '40.000.000 ₫ - 45.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '1 ngày trước', isPremium: true },
    { id: '41', title: 'Blockchain Developer', company: 'BlockChainTech', salary: '45.000.000 ₫ - 50.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '5 ngày trước', isPremium: false },
    { id: '42', title: 'Full Stack Developer', company: 'FullStackPro', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '43', title: 'Frontend Developer', company: 'FrontEndTech', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '2 ngày trước', isPremium: false },
    { id: '44', title: 'Backend Developer', company: 'BackEndSolutions', salary: '22.000.000 ₫ - 28.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: true },
    { id: '45', title: 'Machine Learning Engineer', company: 'MLTech', salary: '35.000.000 ₫ - 40.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '4 ngày trước', isPremium: false },
    { id: '46', title: 'Game Developer', company: 'GameStudio', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '3 ngày trước', isPremium: true },
    { id: '47', title: 'IT Consultant', company: 'ITConsult', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '2 ngày trước', isPremium: false },
    { id: '48', title: 'Technical Writer', company: 'TechWrite', salary: '15.000.000 ₫ - 20.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '1 ngày trước', isPremium: true },
    { id: '49', title: 'Operations Manager', company: 'OpsManage', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '5 ngày trước', isPremium: false },
    { id: '50', title: 'Digital Marketing Manager', company: 'DigitalMarket', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '3 ngày trước', isPremium: true },
    { id: '51', title: 'Social Media Manager', company: 'SocialBuzz', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '2 ngày trước', isPremium: false },
    { id: '52', title: 'E-commerce Manager', company: 'EcomManage', salary: '22.000.000 ₫ - 28.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '1 ngày trước', isPremium: true },
    { id: '53', title: 'Supply Chain Manager', company: 'SupplyChainPro', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '4 ngày trước', isPremium: false },
    { id: '54', title: 'Logistics Coordinator', company: 'LogiTech', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '55', title: 'Financial Analyst', company: 'FinancePro', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '2 ngày trước', isPremium: false },
    { id: '56', title: 'Investment Banker', company: 'InvestBank', salary: '40.000.000 ₫ - 45.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: true },
    { id: '57', title: 'Accountant', company: 'AccountPro', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '5 ngày trước', isPremium: false },
    { id: '58', title: 'Auditor', company: 'AuditTech', salary: '22.000.000 ₫ - 28.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '3 ngày trước', isPremium: true },
    { id: '59', title: 'Tax Consultant', company: 'TaxConsult', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '2 ngày trước', isPremium: false },
    { id: '60', title: 'Legal Advisor', company: 'LegalPro', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '1 ngày trước', isPremium: true },
    { id: '61', title: 'Paralegal', company: 'ParaLaw', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '4 ngày trước', isPremium: false },
    { id: '62', title: 'Corporate Lawyer', company: 'CorpLaw', salary: '35.000.000 ₫ - 40.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '3 ngày trước', isPremium: true },
    { id: '63', title: 'Research Scientist', company: 'ResearchLab', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '2 ngày trước', isPremium: false },
    { id: '64', title: 'Lab Technician', company: 'LabTech', salary: '15.000.000 ₫ - 20.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '1 ngày trước', isPremium: true },
    { id: '65', title: 'Pharmacist', company: 'PharmaCare', salary: '20.000.000 ₫ - 25.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '5 ngày trước', isPremium: false },
    { id: '66', title: 'Nurse', company: 'HealthFirst', salary: '18.000.000 ₫ - 22.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '3 ngày trước', isPremium: true },
    { id: '67', title: 'Doctor', company: 'MediCare', salary: '40.000.000 ₫ - 45.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '2 ngày trước', isPremium: false },
    { id: '68', title: 'Dentist', company: 'DentalCare', salary: '35.000.000 ₫ - 40.000.000 ₫ / tháng', location: 'Thành phố Hồ Chí Minh', timePosted: '1 ngày trước', isPremium: true },
    { id: '69', title: 'Physiotherapist', company: 'PhysioPro', salary: '25.000.000 ₫ - 30.000.000 ₫ / tháng', location: 'Hà Nội', timePosted: '4 ngày trước', isPremium: false },
    { id: '70', title: 'Veterinarian', company: 'VetCare', salary: '30.000.000 ₫ - 35.000.000 ₫ / tháng', location: 'Đà Nẵng', timePosted: '3 ngày trước', isPremium: true },



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
        <View style={{ marginVertical: width * 0.03 }}>
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


const Content = ({ onSearchFocus, onMapSearchFocus }) => (
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
        ListHeaderComponent={<Header onSearchFocus={onSearchFocus} onMapSearchFocus={onMapSearchFocus} />}
        ListFooterComponent={<Footer />}
        showsVerticalScrollIndicator={false}
    />
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
            <View style={styles.headContainer}>


                <View style={styles.logo}>
                    <Image source={require('../../../assets/images/logo.png')} style={{ width: 130, height: logoWidth * 0.25 }} />
                </View>
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
            <View style={styles.navbar}>
                <Navbar />
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
        padding: "4%",
        width: '100%',
    },
    flatListContent: {
        paddingBottom: -10, // Điều chỉnh khoảng cách dưới
        paddingTop: 10,  // Điều chỉnh khoảng cách dưới
    },
    logo: {
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
    navbar: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
});