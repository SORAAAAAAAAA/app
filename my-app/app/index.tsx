import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from './LoadingScreen';
import { Image } from 'react-native';


const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true); // After 3 seconds, show the main content
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []); // This runs only once after the component mounts

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setEmail(''); // Reset email when toggling between sign up and login
    setPassword(''); // Reset password when toggling between sign up and login
  };

  const handleSubmit = () => {
    if (isSignUp) {
      console.log('Sign-Up:', { email, password });
    } else {
      console.log('Log-In:', { email, password });
    }
    alert(`${isSignUp ? 'Signed Up' : 'Logged In'} successfully!`);
  };

  // Always ensure that this hook is called before the conditional rendering
  if (!isAppReady) {
    return <LoadingScreen />; // Show LoadingScreen while the app is initializing
  }

  return (
    <LinearGradient
      colors={['#FF939B', '#F65864', '#EF2A39']} // Gradient background
      style={styles.gradientContainer}
    > <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
      <View style={styles.container}>
        
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.toggleText}>
            {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 40,
    letterSpacing: 2,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFC42E',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
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

  logo: {
    marginBottom: -150
  }
});

export default App;
