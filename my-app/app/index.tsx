import React, { useState, useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';
import LoadingScreen from './components/LoadingScreen';
import LogSign from './components/LogSign';
import MainPage from './components/MainPage';
import Search from './components/Search';
import Orders from './components/Orders';
import Profile from './components/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import ProfilePage from './components/ProfilePage';
//import SettingsPage from './components/SettingsPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.headerContainer}>
    <View style={styles.loc}>
      <Icon name="location" size={25} color="#D42323" />
    </View>
    <View>
      <Text style={styles.headerTitle}>DELIVER TO</Text>
      <Text style={styles.headLoc}>Dasmarinas Cavite, City</Text>
    </View>
    <View style={styles.headIC}>
      <Icon name="chevron-down-outline" size={25} color="#000000" style={styles.headerIcons}/>
      <Icon name="notifications-outline" size={25} color="#E95322" style={styles.headerIcons}/>
      <Icon name="bag-outline" size={25} color="#E95322" style={styles.headerIcons}/>
    </View>
    
  </View>
);

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
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: 54
      }}}>
      <Tab.Screen 
      name="Home" 
      component={MainPage}
      options={{
        tabBarIcon: ({color, size }) => <Icon name="home" color={'#D42323'} size={size} />,
      }}  />
      <Tab.Screen 
      name="Search" 
      component={Search} 
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="search-outline" color={color} size={size} />,
      }}/>
      <Tab.Screen 
      name="Orders" 
      component={Orders} 
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="document-text-outline" color={color} size={size} />,
      }}/>
      <Tab.Screen 
      name="Profiles" 
      component={Profile} 
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="person-outline" color={color} size={size} />,
      }}/>
    </Tab.Navigator>
  );

  return (
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{
            header: () => <CustomHeader title="Main Page" />,
          }} />
        ) : (
          <Stack.Screen 
          name="Home" options={{headerShown: false}}>
            {props => <LogSign {...props} setIsLogged={setIsLogged} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#E95322',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  headLoc:{
    fontFamily: 'Poppins-Regular',
    },
  headIC:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loc:{
    marginLeft: 10,
  },
  headerIcons: {
    padding: 10,
    marginRight: 10
  }
});

export default App;

