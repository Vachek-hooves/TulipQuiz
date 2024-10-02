import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from "react-native";
import { TulipTypes } from "../../data/tulipTypes";
import { IconGoBack } from "../../components/ui/icons";
import TabLayout from "../../components/ScreenLayout/TabLayout";
const TulipsTypesScreen = () => {
  console.log(TulipTypes)
  return (
    <TabLayout blur={40}>
      <SafeAreaView></SafeAreaView>

    <ScrollView style={styles.container}>
      {TulipTypes.map((tulip, index) => (
        <View key={index} style={styles.tulipContainer}>
          <Text style={styles.header}>{tulip.header}</Text>
          <Image source={tulip.image} style={styles.image} />
          <Text style={styles.subHeader}>History</Text>
          <Text style={styles.text}>{tulip.history}</Text>
          <Text style={styles.subHeader}>Care</Text>
          <Text style={styles.text}>{tulip.care}</Text>
          <Text style={styles.subHeader}>Interesting Facts</Text>
          <Text style={styles.text}>{tulip.facts}</Text>
        </View>
      ))}
    </ScrollView>
    <View style={{height: 100}}></View>
      <IconGoBack/>
    </TabLayout>
  );
};

export default TulipsTypesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#F5F5F5',
  },
  tulipContainer: {
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
    elevation: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    // color: '#666',
  },
});
