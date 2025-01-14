import React, { useState, useEffect } from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import LoadingScreen from './LoadingScreen';


const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[phoneNum, setPhoneNum] = useState('');
  const[birthDate, setBirthDate] = useState('');
  const[confirmPasword, setConfirmPasword] = useState('');


  
  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.5.94:5000/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to register user');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.5.94:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to login user');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true); // After 3 seconds, show the main content
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []); // This runs only once after the component mounts

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
  };

  // Always ensure that this hook is called before the conditional rendering
  if (!isAppReady) {
    return <LoadingScreen />; // Show LoadingScreen while the app is initializing
  }

  return (
    <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setFirstName}
            keyboardType="default"
            autoCapitalize="none"
          />
        )}

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            value={lastName}
            onChangeText={setLastName}
            keyboardType="default"
            autoCapitalize="none"
          />
        )}

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            value={phoneNum}
            onChangeText={setPhoneNum}
            keyboardType="numeric"
          />
        )}
      
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Pasword"
            placeholderTextColor="#aaa"
            value={confirmPasword}
            onChangeText={setConfirmPasword}
            secureTextEntry
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isSignUp ? handleRegister : handleLogin}
        >
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggle}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
            </Text>
          </TouchableOpacity>
          

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 40,

  },
  title: {
    fontSize: 37,
    fontWeight: '700',
    color: '#EF2A39',
    marginBottom: 40,
    letterSpacing: 2,
    marginRight: 220
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#EF2A39',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#FFC42E',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },


});

export default App;
