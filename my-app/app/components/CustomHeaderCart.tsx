import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const CustomHeaderCart: React.FC<{ title: string; navigation: any }> = ({ title, navigation }) => {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Icon style={styles.con} name="close" size={25} color="#000000"/>
        </View>
        <View>
            <Text style={styles.title}>Your Order</Text>
        </View>
      </View>
    );
  };

const styles  = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      title: {
        fontFamily: 'Poppin-Regular',
        fontSize: 25,
        marginLeft: 30
      },
      con: {
        marginLeft: 5
      }
    
})



export default CustomHeaderCart;