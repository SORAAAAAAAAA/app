import {Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import React, { useState, useEffect } from 'react';
import styLS from '../design/stylLS';


interface LogSignProps {
    setIsLogged: (isLogged: boolean) => void;
  }

  const LogSign: React.FC<LogSignProps> = ({ setIsLogged }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async () => {
      try {
        const response = await fetch('http://192.168.5.94:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, firstName, lastName, phoneNum, confirmPassword }),
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
          setIsLogged(true); // Set isLogged to true after successful login
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to login user');
      }
    };
  
    const handleToggle = () => {
      setIsSignUp(!isSignUp);
      setEmail('');
      setPassword('');
    };
  
    return (
      <KeyboardAvoidingView style={styLS.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styLS.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
  
        {isSignUp && (
          <>
            <TextInput
              style={styLS.input}
              placeholder="First Name"
              placeholderTextColor="#aaa"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TextInput
              style={styLS.input}
              placeholder="Last Name"
              placeholderTextColor="#aaa"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              autoCapitalize="none"
            />
            <TextInput
              style={styLS.input}
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
              value={phoneNum}
              onChangeText={setPhoneNum}
              keyboardType="numeric"
            />
          </>
        )}
  
        <TextInput
          style={styLS.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
  
        <TextInput
          style={styLS.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
  
        {isSignUp && (
          <TextInput
            style={styLS.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
  
        <TouchableOpacity
          style={styLS.button}
          onPress={isSignUp ? handleRegister : handleLogin}
        >
          <Text style={styLS.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styLS.toggleText}>
            {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default LogSign;