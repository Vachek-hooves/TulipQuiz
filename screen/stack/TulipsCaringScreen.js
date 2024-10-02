import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView   } from 'react-native';
import { TulipCaring } from '../../data/tulipCaring';
import TabLayout from "../../components/ScreenLayout/TabLayout";
import { IconGoBack } from "../../components/ui/icons";

const TulipsCaringScreen = () => {
  return (
    <TabLayout blur={40}>
      <SafeAreaView></SafeAreaView>

    <ScrollView style={styles.container}>
      {TulipCaring.map((care, index) => (
        <View key={index} style={styles.careContainer}>
          <Text style={styles.header}>{care.header}</Text>
          <Image source={care.require} style={styles.image} />
          <Text style={styles.text}>{care.text}</Text>
        </View>
      ))}
    </ScrollView>
    <View style={{height: 100}}></View>
    <IconGoBack/>
      </TabLayout>
  );
};

export default TulipsCaringScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#F5F5F5',
  },
  careContainer: {
    marginBottom: 30,
    // backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    // color: '#666',
  },
});
