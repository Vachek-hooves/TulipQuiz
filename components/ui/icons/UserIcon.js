import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const GradientIcon = ({ source, gradientColors, style }) => {
  return (
    <View style={[styles.iconContainer, style]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, styles.icon]}
      />
      <LinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />
    </View>
  );
};

const UserIcon = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('UserScreen')} 
            style={{position:'absolute',top:60,right:60,zIndex:1}}
        >
            <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.button}
            >
                <GradientIcon
                    source={require('../../../assets/img/icons/user.png')}
                    gradientColors={['#FF6B6B', '#FF8E53']}
                    style={styles.image}
                />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default UserIcon;

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    iconContainer: {
        overflow: 'hidden',
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    gradient: {
        opacity: 0.7,
    },
});