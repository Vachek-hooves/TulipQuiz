import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Modal, FlatList, Text, Image, SafeAreaView } from "react-native";
import Land from '../../components/ui/icons/Land';  
import IconGoBack from '../../components/ui/icons/IconGoBack';
import TotalScoreDisplay from '../../components/ui/interface/TotalScoreDisplay';
import { tulipFarmData } from '../../data/tulipFarmData';
import { useTulipContext } from '../../store/context';

const { width: screenWidth,height } = Dimensions.get('window');
const GRID_SIZE = 3;
const LAND_SIZE = screenWidth / GRID_SIZE;

const TulipFarmScreen = () => {
  const [selectedLand, setSelectedLand] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { getTotalScore, updateQuizScore, plantedTulips, updatePlantedTulips } = useTulipContext();

  const handleLandPress = (index) => {
    setSelectedLand(index);
    setModalVisible(true);
  };

  const handleTulipSelect = (tulip) => {
    const currentScore = getTotalScore();
    if (currentScore >= tulip.price) {
      updateQuizScore(1, currentScore - tulip.price);
      const newPlantedTulips = [...plantedTulips];
      newPlantedTulips[selectedLand] = { ...tulip, plantedAt: Date.now() };
      updatePlantedTulips(newPlantedTulips);
      setModalVisible(false);
    } else {
      alert("Not enough points to buy this tulip!");
    }
  };

  const handleHarvest = (index) => {
    const tulip = plantedTulips[index];
    if (tulip && Date.now() - tulip.plantedAt >= tulip.growthTime * 1000) {
      const harvestValue = Math.floor(tulip.price * 1.5);
      updateQuizScore(1, getTotalScore() + harvestValue);
      const newPlantedTulips = [...plantedTulips];
      newPlantedTulips[index] = null;
      updatePlantedTulips(newPlantedTulips);
    }
  };

  const renderTulipItem = ({ item }) => (
    <TouchableOpacity style={styles.tulipItem} onPress={() => handleTulipSelect(item)}>
      <Image source={item.image} style={styles.tulipImage} />
      <Text>{item.name}</Text>
      <Text>Price: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../../assets/img/tulipGrow/grass.jpg')} style={styles.background}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.header}>
        <TotalScoreDisplay />
      </View>
      <View style={styles.farmGrid}>
        {plantedTulips.map((tulip, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => tulip ? handleHarvest(index) : handleLandPress(index)}
            style={styles.landWrapper}
          >
            <Land style={styles.land}>
              {tulip && <Image source={tulip.image} style={styles.plantedTulip} />}
            </Land>
          </TouchableOpacity>
        ))}
      </View>
      <IconGoBack style={styles.backIcon} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Select a tulip to plant:</Text>
          <FlatList
            data={tulipFarmData}
            renderItem={renderTulipItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', // Add a slight overlay for better text visibility
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  farmGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: screenWidth,
    height: screenWidth,
  },
  land: {
    width: LAND_SIZE,
    height: LAND_SIZE,
    // transform: [{rotate: '45deg'}]
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Add these lines to make sure the modal is visible
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    height:height*0.8
  },
  tulipItem: {
    margin: 10,
    alignItems: 'center',
  },
  tulipImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  landWrapper: {
    width: LAND_SIZE,
    height: LAND_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantedTulip: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default TulipFarmScreen;