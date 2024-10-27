import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

// Job Card Component
const JobCard = ({
  title,
  company,
  location,
  salary,
  jobType,
}: {
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
}) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{company}</Text>
    <Text style={styles.jobLocation}>{location}</Text>
    <Text style={styles.jobSalary}>{salary}</Text>
    <Text style={styles.jobType}>{jobType}</Text>
  </View>
);

const JobList = () => {
  interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    jobType: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]); // State để lưu dữ liệu từ backend
  const [loading, setLoading] = useState(true); // State để kiểm tra xem dữ liệu đã load xong chưa

  const [searchTitle, setSearchTitle] = useState(''); // State để lưu chức danh hoặc từ khóa
  const [searchLocation, setSearchLocation] = useState(''); // State để lưu thành phố hoặc mã vùng
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // State để lưu kết quả tìm kiếm
  const [searchHistory, setSearchHistory] = useState<{ title: string, location: string }[]>([]); // State lưu lịch sử tìm kiếm

  // Gọi API để lấy danh sách công việc từ backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://10.106.25.87:3000/jobs');
        setJobs(response.data); // Lưu dữ liệu vào state
        setFilteredJobs(response.data); // Đặt kết quả tìm kiếm ban đầu là tất cả công việc
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading sau khi gọi API xong
      }
    };

    fetchJobs(); // Gọi hàm khi component được render
  }, []);

  // Hàm tìm kiếm khi nhấn nút "Tìm việc"
  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
      return matchTitle && matchLocation;
    });

    // Lưu lịch sử tìm kiếm (giới hạn tối đa 2 mục)
    if (searchTitle || searchLocation) {
      setSearchHistory((prevHistory) => {
        const newHistory = [{ title: searchTitle, location: searchLocation }, ...prevHistory];
        return newHistory.slice(0, 2); // Giới hạn chỉ giữ 2 mục trong lịch sử
      });
    }

    setFilteredJobs(filtered); // Cập nhật danh sách công việc sau khi tìm kiếm
  };

  // Hàm tìm kiếm dựa trên lịch sử tìm kiếm
  const handleHistorySearch = (title: string, location: string) => {
    const filtered = jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(title.toLowerCase());
      const matchLocation = job.location.toLowerCase().includes(location.toLowerCase());
      return matchTitle && matchLocation;
    });
    setFilteredJobs(filtered); // Cập nhật danh sách công việc dựa trên lịch sử
    setSearchTitle(title);
    setSearchLocation(location);
  };

  // Hàm hiển thị lịch sử tìm kiếm
  const renderSearchHistory = () => (
    <FlatList
      data={searchHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleHistorySearch(item.title, item.location)}
        >
          <Text style={styles.historyItem}>
            {item.title} - {item.location}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="menu-outline" size={28} />
        <Text style={styles.headerText}>MyCVApp</Text>
        <Icon name="person-circle-outline" size={28} />
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Chức danh, từ khóa hoặc công ty"
          style={styles.input}
          value={searchTitle}
          onFocus={renderSearchHistory} // Hiển thị lịch sử khi nhấn vào input
          onChangeText={setSearchTitle} // Cập nhật giá trị tìm kiếm chức danh
        />
        <TextInput
          placeholder="Thành phố, tiểu bang, mã vùng..."
          style={styles.input}
          value={searchLocation}
          onFocus={renderSearchHistory} // Hiển thị lịch sử khi nhấn vào input
          onChangeText={setSearchLocation} // Cập nhật giá trị tìm kiếm địa điểm
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm việc</Text>
        </TouchableOpacity>
      </View>

      {/* Search History Section */}
      {searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Lịch sử tìm kiếm</Text>
          {renderSearchHistory()}
        </View>
      )}

      {/* Recent Jobs Section */}
      <Text style={styles.sectionTitle}>Việc làm cho bạn</Text>

      {/* ScrollView for Job List */}
      <ScrollView contentContainerStyle={styles.jobList} style={{ flex: 1 }}>
        {filteredJobs.map((job) => (
          <JobCard
            key={job._id} // Đảm bảo key là unique, dùng _id từ MongoDB
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            jobType={job.jobType}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#011F82',
  },
  searchSection: {
    padding: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B9D6F3',
  },
  searchButton: {
    backgroundColor: '#011F82',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 16,
    color: '#011F82',
  },
  jobList: {
    padding: 16,
    flexGrow: 1,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#011F82',
  },
  jobCompany: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 5,
  },
  jobLocation: {
    fontSize: 14,
    color: '#6D92D0',
    marginBottom: 5,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
  },
  jobType: {
    fontSize: 14,
    color: '#011F82',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  historyItem: {
    fontSize: 16,
    color: '#011F82',
    marginBottom: 10,
  },
});
