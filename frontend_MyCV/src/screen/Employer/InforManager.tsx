import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../utils/url';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenName from '../../constant/ScreenName';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
// Cấu trúc dữ liệu của Employer dựa trên các trường từ JobPost
interface Employer {
    _id: string;
    title: string; // Chức vụ
    company: string; // Tên công ty
    location: string; // Địa điểm làm việc
    salary: string; // Mức lương
    jobType: string; // Loại công việc
    jobDescription: string; // Mô tả công việc
    requirements?: string; // Yêu cầu công việc
    benefits?: string; // Quyền lợi
    status: "Mở" | "Tạm dừng" | "Đã đóng"; // Trạng thái công việc
    additionalInfo?: {
        deadline?: string;
        experience?: string;
        education?: string;
        quantity?: string;
        gender?: string;
    };
}

const InforManager = () => {
    const navigation = useNavigation();
    const [employers, setEmployers] = useState<Employer[]>([]);
    const [viewingEmployer, setViewingEmployer] = useState<Employer | null>(null);
    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<Employer | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEmployers, setFilteredEmployers] = useState<Employer[]>([]); // Lưu danh sách đã lọc
    const [statusCounts, setStatusCounts] = useState({ open: 0, paused: 0, closed: 0 });
    const [status, setStatus] = useState<"Mở" | "Tạm dừng" | "Đã đóng" | null>(null); // Trạng thái lọc
    const [visibleCount, setVisibleCount] = useState(4); // Start by displaying 4 posts
    // Adjust the list of displayed employers to be limited by `visibleCount`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/jobs`); // Đường dẫn API từ JobPost
                setEmployers(response.data);
                countStatuses(response.data);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        fetchData();
    }, []);

    const BackHandler = () => {
        navigation.goBack();
    };

    const handleSearch = () => {
        const results = employers
            .filter(emp =>
                emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        setFilteredEmployers(results);
    };

    const handleViewDetails = (employer: Employer) => {
        setViewingEmployer(employer);
        setFormData(employer);
        setEditingMode(false);
    };

    const handleEdit = () => {
        setEditingMode(true);
    };

    const handleInputChange = (key: keyof Employer, value: string) => {
        setFormData(prev => prev ? { ...prev, [key]: value } : null);
    };

    const handleSave = async () => {
        if (formData) {
            try {
                const response = await axios.put(`${BASE_URL}/jobs/${formData._id}`, formData);
                setEmployers(employers.map(emp => emp._id === formData._id ? response.data : emp));
                setViewingEmployer(null);
                setEditingMode(false);
                Alert.alert('Update', `Updated job post: ${formData.title}`);
            } catch (error) {
                Alert.alert('Error', 'Error updating job post');
                console.error('Error updating job post:', error);
            }
        }
    };

    const handleCancel = () => {
        setEditingMode(false);
    };

    const handleBackToList = () => {
        setViewingEmployer(null);
    };

    const handleDeleteConfirmation = (_id: string) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa bài đăng này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => handleDelete(_id) }
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (_id: string) => {
        try {
            await axios.delete(`${BASE_URL}/jobs/${_id}`);
            setEmployers(employers.filter(emp => emp._id !== _id));
            Alert.alert('Delete', `Deleted job post: ${_id}`);
            setViewingEmployer(null);
        } catch (error) {
            Alert.alert('Error', 'Error deleting job post');
            console.error('Error deleting job post:', error);
        }
    };

    const handleStatusChange = async (status: "Mở" | "Tạm dừng" | "Đã đóng", employerId: string) => {
        try {
            const response = await axios.put(`${BASE_URL}/jobs/${employerId}`, { status });
            const updatedEmployers = employers.map(emp => emp._id === employerId ? { ...emp, status } : emp);
            setEmployers(updatedEmployers);
            countStatuses(updatedEmployers);
            // Đồng bộ viewingEmployer nếu nó thuộc employerId
            const updatedViewingEmployer = updatedEmployers.find(emp => emp._id === viewingEmployer?._id);
            if (updatedViewingEmployer) {
                setViewingEmployer(updatedViewingEmployer);
            }
            if (viewingEmployer && viewingEmployer._id === employerId) {
                setViewingEmployer({ ...viewingEmployer, status }); // Đồng bộ trạng thái
            }
            Alert.alert('Cập nhật trạng thái', `Trạng thái đã thay đổi thành: ${status}`);
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi khi cập nhật trạng thái');
            console.error('Error updating job status:', error);
        }
    };

    const countStatuses = (jobs: Employer[]) => {
        const counts = { open: 0, paused: 0, closed: 0 };
        jobs.forEach(jobs => {
            if (jobs.status === 'Mở') counts.open++;
            else if (jobs.status === 'Tạm dừng') counts.paused++;
            else if (jobs.status === 'Đã đóng') counts.closed++;
        });
        setStatusCounts(counts);
    };

    const displayEmployers = employers.filter(emp => {
        if (status === null) return true; // Hiển thị tất cả nếu status là null
        return emp.status === status; // Lọc theo status
    }).slice(0, visibleCount);

    const handleViewMore = () => {
        setVisibleCount(prev => prev + 4); // Increase the visible count by 4
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon style={styles.icon} name="arrow-back-outline" onPress={BackHandler} size={28} color="#011F82" />
                <Text style={styles.pageTitle}>Quản lý thông tin tuyển dụng</Text>
            </View>

            <View style={styles.searchSection}>
                <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Vui lòng nhập từ khóa tìm kiếm"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={'#666'}
                />
                <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            {/* Các nút lọc theo trạng thái */}
            <View style={styles.filterButtons}>
                <TouchableOpacity onPress={() => setStatus(null)} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('Mở')} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Mở ( {statusCounts.open} )</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('Tạm dừng')} style={[styles.filterButton, { backgroundColor: '#FFC107' }]}>
                    <Text style={styles.filterButtonText}>Tạm dừng ( {statusCounts.paused} )</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus('Đã đóng')} style={[styles.filterButton, { backgroundColor: '#FF5722' }]}>
                    <Text style={styles.filterButtonText}>Đã đóng ( {statusCounts.closed} )</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {viewingEmployer ? (
                    <View style={styles.formContainer}>
                        <View style={styles.employerHeader}>
                            <Text style={styles.formTitle}>Thông tin chi tiết</Text>
                            <View style={styles.actionIconsRight}>
                                <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                                    <Icon name="pencil" size={24} color="#007bff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteConfirmation(viewingEmployer._id)} style={styles.iconButton}>
                                    <Icon name="trash" size={24} color="#ff0000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {!editingMode ? (
                            <>
                                <View style={styles.statusContainer}>
                                    <Text style={styles.statusLabel}>Trạng thái:</Text>
                                    <View style={styles.statusButtons}>
                                        <TouchableOpacity onPress={() => viewingEmployer && handleStatusChange("Mở", viewingEmployer._id)} style={viewingEmployer?.status === "Mở" ? styles.activeStatusButton : styles.statusButton}>
                                            <Text style={styles.statusText}>Mở</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => viewingEmployer && handleStatusChange("Tạm dừng", viewingEmployer._id)} style={viewingEmployer?.status === "Tạm dừng" ? styles.activeStatusButton : styles.statusButton}>
                                            <Text style={styles.statusText}>Tạm dừng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => viewingEmployer && handleStatusChange("Đã đóng", viewingEmployer._id)} style={viewingEmployer?.status === "Đã đóng" ? styles.activeStatusButton : styles.statusButton}>
                                            <Text style={styles.statusText}>Đã đóng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Chức vụ:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.title}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Tên công ty:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.company}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Địa điểm:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.location}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Mức lương:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.salary}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Loại công việc:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.jobType}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Yêu cầu công việc:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.requirements}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Quyền lợi được hưởng:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.benefits}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.titleText}>Mô tả công việc:</Text>
                                    <Text style={styles.viewText}>{viewingEmployer.jobDescription}</Text>
                                </View>

                                <TouchableOpacity style={styles.buttonCancel} onPress={handleBackToList}>
                                    <Text style={styles.textbtn}>Quay lại</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Chức vụ</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.title}
                                        onChangeText={text => handleInputChange('title', text)}
                                        placeholder="Nhập chức vụ"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Tên công ty</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.company}
                                        onChangeText={text => handleInputChange('company', text)}
                                        placeholder="Nhập tên công ty"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Địa điểm</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.location}
                                        onChangeText={text => handleInputChange('location', text)}
                                        placeholder="Nhập địa điểm"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Mức lương</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.salary}
                                        onChangeText={text => handleInputChange('salary', text)}
                                        placeholder="Nhập mức lương"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Loại công việc</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.jobType}
                                        onChangeText={text => handleInputChange('jobType', text)}
                                        placeholder="Nhập loại công việc"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Yêu cầu công việc</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.requirements}
                                        onChangeText={text => handleInputChange('requirements', text)}
                                        placeholder="Nhập yêu cầu công việc"
                                        multiline={true}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Quyền lợi được hưởng</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData?.benefits}
                                        onChangeText={text => handleInputChange('benefits', text)}
                                        placeholder="Nhập quyền lợi được hưởng"
                                        multiline={true}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Mô tả công việc</Text>
                                    <TextInput
                                        style={[styles.input, styles.inputDescription]}
                                        value={formData?.jobDescription}
                                        onChangeText={text => handleInputChange('jobDescription', text)}
                                        placeholder="Nhập mô tả công việc"
                                        multiline={true}
                                    />
                                </View>
                                <TouchableOpacity style={styles.buttonEdit} onPress={handleSave}>
                                    <Text style={styles.textbtn}>Lưu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                                    <Text style={styles.textbtn}>Hủy chỉnh sửa</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                ) : (
                    displayEmployers.map((employer, index) => (
                        <View key={index} style={styles.employerContainer}>
                            <View style={styles.employerInfo}>
                                <Text style={styles.jobTitle}>Chức vụ: {employer.title}</Text>
                                <Text style={styles.jobLocation}>Công ty: {employer.company}</Text>
                                <Text style={styles.jobDetail}>Mức lương: {employer.salary}</Text>
                            </View>
                            <View style={styles.actionIconsRight}>
                                <TouchableOpacity onPress={() => handleViewDetails(employer)} style={styles.iconButton}>
                                    <Icon name="eye" size={24} color="#007bff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteConfirmation(employer._id)} style={styles.iconButton}>
                                    <Icon name="trash" size={24} color="#ff0000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))

                )}
                {!viewingEmployer && !editingMode && visibleCount < (status ? employers.filter(emp => emp.status === status).length : employers.length) && (
                    <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                        <Text style={styles.viewMoreText}>Xem thêm</Text>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#011F82',
    },
    pageTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#011F82',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchIcon: {
        paddingHorizontal: 10
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    buttonSearch: {
        backgroundColor: '#011F82',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 10
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16
    },

    statusSummary: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginVertical: 10,
    },
    statusSummaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    filterButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',  // Allows buttons to wrap if space is limited
        justifyContent: 'space-between', // Distributes buttons evenly
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    filterButton: {
        flex: 1, // Each button takes equal space
        paddingVertical: 10,
        marginHorizontal: 5, // Adds spacing between buttons
        backgroundColor: '#011F82',
        borderRadius: 5,
        alignItems: 'center', // Centers text within each button
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    statusLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011F82',
        marginRight: 10,
    },
    statusButtons: {
        flexDirection: 'row',
    },
    statusButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
    },
    activeStatusButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#011F82',
        marginHorizontal: 5,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    employerContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    employerInfo: {
        flex: 3
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    jobLocation: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5
    },
    jobDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    actionIconsRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginLeft: 15
    },
    iconButton: {
        marginLeft: 15
    },
    viewMoreButton: {
        backgroundColor: '#011F82',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    viewMoreText: {
        color: '#fff',
        fontSize: 16,
    },

    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    employerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    detailRow: {
        marginBottom: 15,
    },
    titleText: {
        fontSize: 18,
        color: '#011F82',
        fontWeight: 'bold',
    },
    viewText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    buttonCancel: {
        backgroundColor: '#011F82',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    textbtn: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonEdit: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        color: '#011F82',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
    },
    inputDescription: {
        height: 80,
        textAlignVertical: 'top'
    }
});

export default InforManager;
