import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Employee,
  RootStackParam,
  changeIsoToOriginalDate,
  deleteEmployee,
} from '../utils';
import {ModalView} from '../components/ModalView';

type DetailEmployeeRouteProp = RouteProp<RootStackParam, 'Detail'>;

const DetailEmployee: React.FC = () => {
  const route = useRoute<DetailEmployeeRouteProp>();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const {params} = route;
  const onSuccessDelete = () => {
    navigation.navigate('Home', {type: 'update'});
  };

  const onDeleteData = async (id: string | undefined) => {
    if (id) {
      await deleteEmployee(id, onSuccessDelete);
    }
  };

  const onHideModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const [paramData, setParamData] = useState<Employee>();

  useEffect(() => {
    setParamData(params);
  }, [params]);

  const onSetParam = (data: Employee) => {
    setParamData(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={onSuccessDelete}>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginRight: 16}}>
          {'<-'}
        </Text>
        <Text style={[styles.title, {fontWeight: 'bold', fontSize: 20}]}>
          Detail Employee
        </Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Name: {paramData?.fullName}</Text>
      <Text style={styles.subtitle}>Employee ID: {paramData?.id}</Text>
      <Text style={styles.subtitle}>NIK: {paramData?.NIK}</Text>
      <Text style={styles.subtitle}>Address: {paramData?.address}</Text>
      {paramData?.birthdate && (
        <Text style={styles.subtitle}>
          Birthdate: {changeIsoToOriginalDate(paramData?.birthdate)}
        </Text>
      )}
      <Text style={styles.subtitle}>Salary: {paramData?.salary}</Text>
      {paramData?.entryDate && (
        <Text style={styles.subtitle}>
          Entry Date: {changeIsoToOriginalDate(paramData?.entryDate)}
        </Text>
      )}
      {paramData?.updatedDate && (
        <Text style={styles.subtitle}>
          Update Date: {changeIsoToOriginalDate(paramData?.updatedDate)}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={openModal} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={() => onDeleteData(paramData?.id)} />
      </View>
      {showModal && paramData && (
        <ModalView
          showModal={showModal}
          hideModal={onHideModal}
          data={paramData}
          setParamData={onSetParam}
        />
      )}
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
