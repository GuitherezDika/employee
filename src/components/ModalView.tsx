import React, {FC, memo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Employee, changeIsoToOriginalDate, updateEmployee} from '../utils';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

interface ModalViewProps {
  showModal: boolean;
  hideModal: () => void;
  data: Employee;
}

export const ModalView: FC<ModalViewProps> = memo(
  ({showModal, hideModal, data}) => {
    const {control, handleSubmit, setValue} = useForm<Employee>();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(data.birthdate));

    const onChange = (event, selectedDate: any) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };
    const showDatePicker = () => showMode('date');

    const onSuccessUpdate = () => {
      hideModal();
      navigation.navigate('Home', {type: 'update'});
    };

    const onChangeField = ({name, text}: {name: any; text: string}) => {
      setValue(name, text);
    };

    const onSubmit = async (newData: Employee) => {
      const currentDate = new Date();
      newData.updatedDate = currentDate.toString();
      newData.birthdate = date.toString();

      let tempData = {...data, ...newData};
      await updateEmployee(tempData, onSuccessUpdate);
    };

    return (
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Name:</Text>
            <Controller
              control={control}
              render={({field}) => {
                return (
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={text =>
                      onChangeField({name: 'fullName', text})
                    }
                  />
                );
              }}
              name="fullName"
              defaultValue={data.fullName}
            />
            <Text style={styles.subtitle}>Birthdate:</Text>
            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
              <Text style={[styles.subtitle, {fontSize: 14}]}>
                {changeIsoToOriginalDate(date.toString())}
              </Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Address:</Text>
            <Controller
              control={control}
              render={({field}) => {
                return (
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={text =>
                      onChangeField({name: 'address', text})
                    }
                    multiline
                  />
                );
              }}
              name="address"
              defaultValue={data.address}
            />
            <Text style={styles.subtitle}>Salary:</Text>
            <Controller
              control={control}
              render={({field}) => {
                return (
                  <TextInput
                    style={styles.input}
                    value={field.value.toString()}
                    onChangeText={text => onChangeField({name: 'salary', text})}
                    keyboardType="numeric"
                  />
                );
              }}
              name="salary"
              defaultValue={data.salary}
            />
            <View style={styles.row}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btn}>SUBMIT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={hideModal}>
                <Text style={[styles.btn, {color: 'gray'}]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    shadowColor: '#0009',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  btn: {
    fontSize: 16,
    fontWeight: '700',
    color: '#05b2fc',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    minHeight: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: '100%',
    borderRadius: 4,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
