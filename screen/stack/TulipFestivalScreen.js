import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from "react-native";
import { TulipFestivals } from "../../data/tulipFestivals";
import TabLayout from "../../components/ScreenLayout/TabLayout";
import { IconGoBack } from "../../components/ui/icons";

const TulipFestivalScreen = () => {
  return (
    <TabLayout blur={40}>

    <SafeAreaView></SafeAreaView>
    <ScrollView style={styles.container}>
      {TulipFestivals.map((festival, index) => (
        <View key={index} style={styles.festivalContainer}>
          <Text style={styles.name}>{festival.name}</Text>
          <Image source={festival.image} style={styles.image} />
          <Text style={styles.location}>Location: {festival.location}</Text>
          <Text style={styles.when}>When: {festival.when}</Text>
          <Text style={styles.description}>{festival.description}</Text>
          <Text style={styles.highlightsHeader}>Highlights:</Text>
          {festival.highlights.map((highlight, hIndex) => (
            <Text key={hIndex} style={styles.highlight}>• {highlight}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
    <View style={{height: 100}}></View>
    <IconGoBack/>
      </TabLayout>
  );
};

export default TulipFestivalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#F5F5F5',
  },
  festivalContainer: {
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
  name: {
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
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  when: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 10,
    // fontFamily: 'bold',
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    // color: '#666',
    marginBottom: 10,
  },
  highlightsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
    marginBottom: 5,
  },
  highlight: {
    fontSize: 18,
    lineHeight: 24,
    // color: '#666',
    marginLeft: 10,
  },
});
