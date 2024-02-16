import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailEmployee from './src/screens/DetailEmployee';
import CreateNewPage from './src/screens/CreateNewPage';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailEmployee}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Create" component={CreateNewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
