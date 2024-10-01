import { StyleSheet, Text, View,TouchableOpacity,Image } from "react-native";
import React from "react";
import {useNavigation} from '@react-navigation/native';
const IconGoBack = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.iconContainer}    >
    <Image source={require('../../../assets/img/icons/return.png')} style={styles.icon}/>
    </TouchableOpacity>
  );
};

export default IconGoBack;

const styles = StyleSheet.create({
    icon:{
        width: 40,
        height: 40,
        tintColor: '#FFFFFF',
    },
    iconContainer:{
        position: 'absolute',
      bottom: 50,
      right: 70,
    }
});
