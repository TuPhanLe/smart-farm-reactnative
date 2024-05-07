/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import Ring from './screens/Ring';
import HomeScreen from './screens/HomeScreen';
import FeatureScreen from './screens/FeatureScreen';
import DataScreenArea1 from './screens/DataScreenArea1';
import DataScreenArea2 from './screens/DataScreenArea2';
import ControlScreen from './screens/ControlScreen';
import AlarmScreen from './screens/AlarmScreen';
import EditAlarmScreen from './screens/EditAlarmScreen';
const Stack = createStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SMART FARM"
          component={HomeScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="TÍNH NĂNG" component={FeatureScreen} />
        <Stack.Screen name="DỮ LIỆU KHU VỰC 1" component={DataScreenArea1} />
        <Stack.Screen name="DỮ LIỆU KHU VỰC 2" component={DataScreenArea2} />
        <Stack.Screen name="ĐIỀU KHIỂN" component={ControlScreen} />
        <Stack.Screen name="HẸN GIỜ" component={AlarmScreen} 
        options={params => ({
          ...headerStyles,
          headerRight: () => (
            <AddButton
              title={'+ '}
              onPress={() => params.navigation.navigate('ĐIỀU CHỈNH HẸN GIỜ')}
            />
          ),
        })}
        />
        <Stack.Screen name="ĐIỀU CHỈNH HẸN GIỜ" component={EditAlarmScreen} />
        <Stack.Screen
          name="Ring"
          component={Ring}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AddButton({title, onPress}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      underlayColor="#fff">
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export const headerStyles = {
  headerStyle: {
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
