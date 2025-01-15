import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Page</Text>
            <Button title="Get Started" onPress={() => alert('Button Pressed!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Profile;