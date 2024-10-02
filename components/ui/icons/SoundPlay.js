import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const SoundPlay = ({play}) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: !play ? 'pink' : 'white',
        borderRadius: 22,
        // position: 'absolute',
        // top: 60,
        // left: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
      }}>
      <Image
        source={require('../../../assets/img/icons/molody.png')}
        style={{
          width: 40,
          height: 40,
          tintColor: !play ? 'green' : 'red',
          transform:[{scale:1.4}]
        }}
      />
    </View>
  );
};

export default SoundPlay;

const styles = StyleSheet.create({});
