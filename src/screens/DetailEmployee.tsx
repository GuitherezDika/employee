import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  RootStackParam,
  changeIsoToOriginalDate,
  deleteEmployee,
} from '../utils';
import {ModalView} from '../components/ModalView';

type DetailEmployeeRouteProp = RouteProp<RootStackParam, 'Detail'>;

const DetailEmployee: React.FC = () => {
  const route = useRoute<DetailEmployeeRouteProp>();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const {params} = route;
  const onSuccessDelete = () => {
    navigation.navigate('Home', {type: 'update'});
  };

  const onDeleteData = async (id: string) => {
    await deleteEmployee(id, onSuccessDelete);
  };

  const onHideModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Employee</Text>
      <Text style={styles.subtitle}>Name: {params?.fullName}</Text>
      <Text style={styles.subtitle}>Employee ID: {params?.id}</Text>
      <Text style={styles.subtitle}>NIK: {params?.NIK}</Text>
      <Text style={styles.subtitle}>Address: {params?.address}</Text>
      <Text style={styles.subtitle}>
        Birthdate: {changeIsoToOriginalDate(params?.birthdate)}
      </Text>
      <Text style={styles.subtitle}>Salary: {params?.salary}</Text>
      <Text style={styles.subtitle}>
        Entry Date: {changeIsoToOriginalDate(params?.entryDate)}
      </Text>
      <Text style={styles.subtitle}>
        Update Date: {changeIsoToOriginalDate(params?.updatedDate)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => setShowModal(true)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={() => onDeleteData(params?.id)} />
      </View>
      <ModalView showModal={showModal} hideModal={onHideModal} data={params} />
    </View>
  );
};

export default DetailEmployee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonContainer: {
    marginVertical: 24,
  },
});
