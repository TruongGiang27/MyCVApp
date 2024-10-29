import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.jobCard} onPress={() => navigation.navigate("JobDetail" as never)}>
      <Text style={styles.jobTitle}>{title}</Text>
      <Text style={styles.jobCompany}>{company}</Text>
      <Text style={styles.jobLocation}>{location}</Text>
      <Text style={styles.jobSalary}>{salary}</Text>
      <Text style={styles.jobType}>{jobType}</Text>
    </TouchableOpacity>
  );
};

const JobList = () => {
  interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    jobType: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<{ title: string, location: string }[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:3000/jobs');
        setJobs(response.data); // Lưu dữ liệu vào state
        setFilteredJobs(response.data); // Đặt kết quả tìm kiếm ban đầu là tất cả công việc
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    fetchJobs();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://10.106.22.239:3000/search-history');
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleInputChange = (text: string, type: 'title' | 'location') => {
    if (type === 'title') {
      setSearchTitle(text);
      const titleSuggestions = jobs
        .map((job) => job.title)
        .filter((title) => title.toLowerCase().includes(text.toLowerCase()));
      setSuggestions([...new Set(titleSuggestions)]);
    } else if (type === 'location') {
      setSearchLocation(text);
      const locSuggestions = jobs
        .map((job) => job.location)
        .filter((location) => location.toLowerCase().includes(text.toLowerCase()));
      setLocationSuggestions([...new Set(locSuggestions)]);
    }
  };

  const handleSuggestionSelect = (text: string, type: 'title' | 'location') => {
    if (type === 'title') {
      setSearchTitle(text);
      setSuggestions([]);
    } else {
      setSearchLocation(text);
      setLocationSuggestions([]);
    }
  };

  const handleSearch = async () => {
    const filtered = jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
      return matchTitle && matchLocation;
    });

    if (searchTitle || searchLocation) {
      setSearchHistory((prevHistory) => {
        const newHistory = [{ title: searchTitle, location: searchLocation }, ...prevHistory];
        return newHistory.slice(0, 2);
      });

      try {
        await axios.post('http://10.106.22.239:3000/search-history', { title: searchTitle, location: searchLocation });
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }

    setFilteredJobs(filtered);
  };

  const handleHistorySearch = (title: string, location: string) => {
    setSearchTitle(title);
    setSearchLocation(location);
    handleSearch();
  };

  const renderSearchHistory = () => (
    <FlatList
      data={searchHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.historyItemCard} onPress={() => handleHistorySearch(item.title, item.location)}>
          <Text style={styles.historyItemTitle}>{item.title}</Text>
          <Text style={styles.historyItemLocation}>{item.location}</Text>
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
      <View style={styles.header}>
        <Icon name="menu-outline" size={28} />
        <Text style={styles.headerText}>MyCVApp</Text>
        <Icon name="person-circle-outline" size={28} />
      </View>

      <View style={styles.searchSection}>
        <TextInput
          placeholder="Chức danh, từ khóa hoặc công ty"
          style={styles.input}
          value={searchTitle}
          onChangeText={(text) => handleInputChange(text, 'title')}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity key={index} onPress={() => handleSuggestionSelect(suggestion, 'title')}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TextInput
          placeholder="Thành phố, tiểu bang, mã vùng..."
          style={styles.input}
          value={searchLocation}
          onChangeText={(text) => handleInputChange(text, 'location')}
        />
        {locationSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {locationSuggestions.map((suggestion, index) => (
              <TouchableOpacity key={index} onPress={() => handleSuggestionSelect(suggestion, 'location')}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm việc</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            {searchHistory.length > 0 && (
              <View style={styles.historyContainer}>
                <Text style={styles.sectionTitle}>Lịch sử tìm kiếm</Text>
                {renderSearchHistory()}
              </View>
            )}
            <Text style={styles.sectionTitle}>Việc làm cho bạn</Text>
          </>
        }
        data={filteredJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <JobCard
            title={item.title}
            company={item.company}
            location={item.location}
            salary={item.salary}
            jobType={item.jobType}
          />
        )}
        ListEmptyComponent={<Text style={styles.noJobsText}>Không có công việc nào phù hợp</Text>}
        contentContainerStyle={styles.jobList}
      />
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
    marginBottom: 0,
    paddingBottom: 0,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#011F82',
  },
  jobCompany: {
    color: '#6D92D0',
  },
  jobLocation: {
    color: '#6D92D0',
  },
  jobSalary: {
    color: '#8C8C8C',
  },
  jobType: {
    color: '#8C8C8C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 4,
    padding: 8,
    elevation: 3,
  },
  suggestionText: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#011F82',
  },
  historyContainer: {
    padding: 1,
  },
  historyItem: {
    fontSize: 16,
    color: '#011F82',
    paddingVertical: 4,
  },
  noJobsText: {
    fontSize: 16,
    color: '#8C8C8C',
    textAlign: 'center',
    marginVertical: 20,
  },
  historyItemCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#B9D6F3',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  historyItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#011F82',
  },
  historyItemLocation: {
    color: '#6D92D0',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

