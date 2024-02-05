import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Employee, changeIsoToOriginalDate, createNewEmployee} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const CreateNewPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Employee>();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());

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

  const onSuccessCreate = () => {
    navigation.navigate('Home', {type: 'update'});
  };

  const onSubmit = (newData: Employee) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = (currentDate.getDate() + 10).toString().padStart(5, '0');

    const id = `${year}${month}${day}`;
    newData.updatedDate = currentDate.toString();
    newData.entryDate = currentDate.toString();
    newData.id = id;
    newData.birthdate = date.toString();

    createNewEmployee(newData, onSuccessCreate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NEW PAGE</Text>
      <Text style={styles.subtitle}>NIK :</Text>
      <Controller
        control={control}
        render={({field}) => {
          return (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={text => setValue('NIK', text)}
              keyboardType="numeric"
              maxLength={16}
            />
          );
        }}
        name="NIK"
        defaultValue={''}
        rules={{maxLength: 16, minLength: 16}}
      />
      {errors.NIK && (
        <Text style={{color: 'red', fontSize: 10, marginTop: -8}}>
          Length must be exactly 16 characters
        </Text>
      )}
      <Text style={styles.subtitle}>Name :</Text>
      <Controller
        control={control}
        render={({field}) => {
          return (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={text => setValue('fullName', text)}
            />
          );
        }}
        name="fullName"
        defaultValue={''}
      />
      <Text style={styles.subtitle}>Birthdate :</Text>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={styles.txt}>
          {changeIsoToOriginalDate(date.toString())}
        </Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Address :</Text>
      <Controller
        control={control}
        render={({field}) => {
          return (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={text => setValue('address', text)}
              multiline
            />
          );
        }}
        name="address"
        defaultValue={''}
      />
      <Text style={styles.subtitle}>Salary :</Text>
      <Controller
        control={control}
        render={({field}) => {
          return (
            <TextInput
              style={styles.input}
              value={field.value.toString()}
              onChangeText={text => setValue('salary', parseInt(text))}
              keyboardType="numeric"
            />
          );
        }}
        name="salary"
        defaultValue={0}
      />
      <View style={styles.btn}>
        <Button title="Create New Page" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default CreateNewPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  txt: {
    fontSize: 13,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginVertical: 5,
  },
  input: {
    minHeight: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 4,
  },
  btn: {
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
});
