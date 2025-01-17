import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from './components/LoadingScreen';
import LogSign from './components/LogSign';
import MainPage from './components/MainPage';
import Search from './components/Search';
import Orders from './components/Orders';
import Profile from './components/Profile';
import CustomHeader from './components/CustomHeader';
import CustomHeaderCart from './components/CustomHeaderCart';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true); // After 3 seconds, show the main content
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []); // This runs only once after the component mounts

  if (!isAppReady) {
    return <LoadingScreen />; // Show LoadingScreen while the app is initializing
  }

  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
        iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Orders') {
        iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Profiles') {
        iconName = focused ? 'person' : 'person-outline';
        } 

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#E95322',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: 54,
      },
      })}
    >
      <Tab.Screen
      name="Home"
      component={MainPage}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        header: () => <CustomHeader title="Home" navigation={navigation} />,
      })}
      />
      <Tab.Screen
      name="Search"
      component={Search}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => <Icon name="search-outline" color={color} size={size} />,
        header: () => <CustomHeader title="Search" navigation={navigation} />,
      })}
      />
      <Tab.Screen
      name="Orders"
      component={Orders}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => <Icon name="document-text-outline" color={color} size={size} />,
        header: () => <CustomHeaderCart title="Orders" navigation={navigation} />,
      })}
      />
      <Tab.Screen
      name="Profiles"
      component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="person-outline" color={color} size={size} />,
        headerShown: false,
      }}
      />
     
    </Tab.Navigator>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="LogSign"
            options={{ headerShown: false }}
          >
            {props => <LogSign {...props} setIsLogged={setIsLogged} />}
          </Stack.Screen>
        )}
        <Stack.Screen
          name="Order"
          component={Orders}
          options={({ navigation }) => ({
            header: () => <CustomHeaderCart title="Home" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={({ navigation }) => ({
            header: () => <CustomHeader title="Home" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ navigation }) => ({
            header: () => <CustomHeader title="Search" navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;