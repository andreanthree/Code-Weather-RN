import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchCityScreen from '../screens/SearchCityScreen/SearchCityScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import ProfileScreen from '../screens/Account/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/Account/EditProfileScreen/EditProfileScreen';

const Stack = createNativeStackNavigator();

import {openDatabase} from 'react-native-sqlite-storage';
import ChangePasswordScreen from '../screens/Account/ChangePasswordScreen/ChangePasswordScreen';
var db = openDatabase({
  name: 'weather.db',
  location: 'default',
  createFromLocation: 2,
});
function Route() {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name_user VARCHAR(50), email VARCHAR(50), password VARCHAR(50), address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SearchCityScreen" component={SearchCityScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
