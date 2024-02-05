import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export interface Employee {
  id: string;
  fullName: string;
  birthdate: string;
  address: string;
  NIK: string;
  salary: number;
  entryDate: string;
  updatedDate: string;
}

export type RootStackParam = {
  Detail: Employee;
};

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

export let mainData: Employee[] = [
  {
    id: `${year}${month}00001`,
    fullName: 'Riska',
    birthdate: '2000-02-23T17:00:00.000Z',
    address: 'Jl. Kebon Sirih No. 15, Jakarta Pusat',
    NIK: '3602041211870001',
    salary: 7000000,
    entryDate: '2019-12-31T17:00:00.000Z',
    updatedDate: '2023-01-31T17:00:00.000Z',
  },
  {
    id: `${year}${month}00002`,
    fullName: 'Eka',
    birthdate: '2001-02-03T17:00:00.000Z',
    address: 'Blok C2 No. 8, Tanjung Duren, Jakarta Barat',
    NIK: '3602041211870002',
    salary: 7000000,
    entryDate: '2020-06-01T17:00:00.000Z',
    updatedDate: '2021-02-01T17:00:00.000Z',
  },
  {
    id: `${year}${month}00003`,
    fullName: 'Emil',
    birthdate: '2002-03-02T17:00:00.000Z',
    address: 'Jl. Gatot Subroto Kav. 42, Kuningan, Jakarta Selatan',
    NIK: '3602041211870003',
    salary: 7000000,
    entryDate: '2020-06-02T17:00:00.000Z',
    updatedDate: '2022-06-02T17:00:00.000Z',
  },
  {
    id: `${year}${month}00004`,
    fullName: 'Rahman',
    birthdate: '1999-03-02T17:00:00.000Z',
    address: 'Blok A5 No. 18, Pondok Pinang, Jakarta Selatan',
    NIK: '3602041211870004',
    salary: 7000000,
    entryDate: '2020-06-02T17:00:00.000Z',
    updatedDate: '2022-06-02T17:00:00.000Z',
  },
  {
    id: `${year}${month}00005`,
    fullName: 'Ricky',
    birthdate: '1998-04-03T17:00:00.000Z',
    address: 'Jl. Tebet Barat Dalam Raya No. 25, Tebet, Jakarta Selatan',
    NIK: '3602041211870005',
    salary: 7000000,
    entryDate: '2020-06-02T17:00:00.000Z',
    updatedDate: '2022-06-02T17:00:00.000Z',
  },
];

export const createDummyData = async () => {
  await saveData('employee', mainData);
  const retrievedData = await getData('employee');

  return retrievedData;
};

export const saveData = async (
  name: string,
  employee: Employee[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(employee));
  } catch (error) {
    console.error('Error saving data ', error);
  }
};

export const getData = async (name: string): Promise<Employee[] | null> => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      const parsedData: Employee[] = JSON.parse(value);
      return parsedData;
    } else {
      console.log('no data found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data ', error);
    return null;
  }
};

export const deleteEmployee = async (
  employeeIdToDelete: string,
  callback: (success: boolean) => void,
): Promise<void> => {
  try {
    const currentData = await getData('employee');
    if (currentData) {
      const updatedData = currentData.filter(
        employee => employee.id !== employeeIdToDelete,
      );
      await saveData('employee', updatedData);
      console.log(
        `Employee with ID ${employeeIdToDelete} deleted successfully`,
      );
      callback?.(true);
    } else {
      console.log('No data found to delete.');
    }
  } catch (error) {
    console.error('Error deleting employee');
  }
};

export const updateEmployee = async (
  newData: Employee,
  callback: (success: boolean) => void,
) => {
  const currentData = await getData('employee');
  let temporaryData: Employee[] = [];
  currentData?.map(async employee => {
    if (employee.id === newData.id) {
      temporaryData.push({...employee, ...newData});
      return {...employee, ...newData};
    } else {
      temporaryData.push(employee);
      return employee;
    }
  });
  await saveData('employee', temporaryData);

  callback?.(true);
};

export const createNewEmployee = async (
  newData: Employee,
  callback: (success: boolean) => void,
) => {
  const currentData = await getData('employee');
  currentData?.push(newData);
  if (currentData) {
    await saveData('employee', currentData);
  }
  callback?.(true);
};

export const changeIsoToOriginalDate = (iso: string): string => {
  return moment(iso).format('YYYY-MM-DD');
};
