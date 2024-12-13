import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ActivityIndicator, FlatList } from 'react-native'
import { Icon, Card } from '@rneui/themed'
import React, { useState, useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigator/RootStackParamList'
import ScreenName from '../../constants/ScreenName'
import { BASE_URL } from '../../utils/url'
import { SearchHistoryItem } from '../../interfaces/SearchHistoryItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;
const Header = ({ location, navigation, query }: { location: string, navigation: any, query: string }) => {
  return (
    <View style={styles.header}>
      <View style={styles.searchBar}>
        <View style={styles.inputRow}>
          <View style={{ width: "10%", alignItems: 'flex-start' }}>
            <Icon name="search" type="font-awesome" color="#373737" size={20} />
          </View>

          <TouchableOpacity
            style={styles.input}
            onPress={() => navigation.navigate('SearchSceen', { searchType: 'text', location, query })}
          >
            { }
            {!query ? <Text style={styles.text}>Tìm kiếm</Text> : <Text style={styles.text}>{query}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.locationRow}>
          <View style={{ width: "10%", alignItems: 'flex-start' }}>
            <Icon name="map-marker" type="font-awesome" color="#373737" size={20} />
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => navigation.navigate('SearchSceen', { searchType: 'map', location, query })}
          >
            {!location ? <Text style={styles.text}>Vị trí</Text> : <Text style={styles.text}>{location}</Text>}
          </TouchableOpacity>
          <Icon name="car" type="font-awesome" color="#373737" size={20} />
        </View>

      </View>
    </View>
  );
};

const JobItem = ({ title, company, salary, location, onPress }: { title: string, company: string, salary: string, location: string, onPress: () => void }) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
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
    </TouchableOpacity >
  )
};

const Content = ({ navigation, location, query }: { navigation: any, location: string, query: string }) => {
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
        let queryString = '';
        if (query) {
          queryString += `?query=${encodeURIComponent(query)}`;
        }

        if (location) {
          queryString += `${query ? '&' : '?'}location=${encodeURIComponent(location)}`;
        }
        console.log("Query string:", queryString);
        console.log("URL:", `${BASE_URL}/jobs/search${queryString}`);
        const response = await fetch(`${BASE_URL}/jobs/search${queryString}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseJson = await response.json();
        setDataJobs(responseJson);
        console.log("Data fetched successfully:", responseJson);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [query, location]);



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
          onPress={() => navigation.navigate('JobDetail', { jobId: item._id })}
        // timePosted={item.timePosted}
        // isPremium={item.isPremium}
        />
      )}
      ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007AFF" /> : null}
      onEndReachedThreshold={0.5}  // Trigger load when 50% from bottom
    />
  );
};


const JobList1 = ({ navigation, route }: Props) => {
  const { location: initialLocation, query: initialQuery } = route.params as { location: string, query: string };
  const [location, setLocation] = useState(initialLocation);
  const [query, setQuery] = useState(initialQuery);
  const MAX_HISTORY = 20;
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [historyStack, setHistoryStack] = useState<{ location: string; query: string }[]>([]);
  console.log('location:', location);
  console.log('Query:', query);

  const saveSearchHistory = async () => {
    try {
      const newItem: SearchHistoryItem = {
        location, 
        query,    
      };

      // Lấy lịch sử cũ từ AsyncStorage
      const historyJson = await AsyncStorage.getItem('searchHistory');
      let updatedHistory: SearchHistoryItem[] = historyJson ? JSON.parse(historyJson) : [];

      updatedHistory = updatedHistory.filter(item => !(item.query === newItem.query && item.location === newItem.location));

      // Thêm mục mới vào đầu danh sách
      updatedHistory.unshift(newItem);

      // Giới hạn danh sách chỉ chứa tối đa MAX_HISTORY mục
      if (updatedHistory.length > MAX_HISTORY) {
        updatedHistory = updatedHistory.slice(0, MAX_HISTORY);
      }

      // Lưu danh sách vào AsyncStorage và cập nhật state
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);

      console.log('Search history saved:', updatedHistory);
    } catch (error) {
      console.error('Error saving location history:', error);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (query || location) {
      saveSearchHistory(); // Lưu lại lịch sử tìm kiếm
    }
  }, [query, location]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Header navigation={navigation} location={location} query={query} />
      <Content navigation={navigation} location={location} query={query} />
    </View>
  )
}

export default JobList1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    padding: 15,
  },
  header: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CECECE',
    borderRadius: 9,
    elevation: 6,
  },
  searchInput: {
    flexDirection: 'column',
  },
  inputRow: {
    padding: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    flex: 1,
  },
  locationRow: {
    padding: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  cardContainer: {
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    elevation: 2,
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
})