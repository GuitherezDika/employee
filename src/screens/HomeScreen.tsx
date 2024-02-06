import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Employee, createDummyData, getData} from '../utils';
import {useNavigation, useRoute} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params} = route;

  const [employeeData, setEmployeeData] = useState<Employee[] | null>();
  const getDataAsync = async () => {
    let udpatedEmployee = await getData('employee');
    setEmployeeData(udpatedEmployee);
  };
  const onSetData = async () => {
    let dataEmployee: Employee[] | null = await createDummyData();
    setEmployeeData(dataEmployee);
  };

  const onNavigate = (item: Employee) => {
    navigation.navigate('Detail', item);
  };

  const onCreateNavigation = () => {
    navigation.navigate('Create');
  };

  const renderItem = useCallback(
    ({item}: {item: Employee}) => {
      return (
        <TouchableOpacity onPress={() => onNavigate(item)} style={styles.card}>
          <Text>Name: {item.fullName}</Text>
          <Text>NIK: {item.NIK}</Text>
          <Text>Address: {item.address}</Text>
        </TouchableOpacity>
      );
    },
    [onNavigate],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (params === undefined) {
        onSetData();
      } else {
        getDataAsync();
      }
    };
    fetchData();
  }, [params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={employeeData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString() || ''}
        initialNumToRender={5}
      />
      <View style={styles.btn}>
        <Button title="Create New Page" onPress={onCreateNavigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    width: '100%',
    minHeight: 100,
    borderWidth: 0.7,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
  },
  btn: {
    justifyContent: 'flex-end',
  },
});
