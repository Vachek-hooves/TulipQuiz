import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import TabLayout from '../../components/ScreenLayout/TabLayout';
import LinearGradient from 'react-native-linear-gradient';
import { IconGoBack } from '../../components/ui/icons';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedImage = await AsyncStorage.getItem('userImage');
      if (storedName && storedImage) {
        setName(storedName);
        setImage(storedImage);
        setUserExists(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      if (image) {
        await AsyncStorage.setItem('userImage', image);
      }
      setUserExists(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const updateUserData = async () => {
    await saveUserData();
    setIsEditing(false);
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };
        setImage(source.uri);
      }
    });
  };

  const resetUserData = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userImage');
      setName('');
      setImage(null);
      setUserExists(false);
    } catch (error) {
      console.error('Error resetting user data:', error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <TabLayout blur={20}>
      <View style={styles.container}>
        {userExists && !isEditing ? (
          <View style={styles.userInfo}>
            <Image source={{ uri: image }} style={styles.userImage} />
            <Text style={styles.userName}>{name}</Text>
            <TouchableOpacity onPress={toggleEdit}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetUserData}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Reset Data</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={selectImage}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.imagePickerButton}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <Text style={styles.imagePickerText}>Select Profile Picture</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={isEditing ? updateUserData : saveUserData}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>{isEditing ? 'Update' : 'Save'}</Text>
              </LinearGradient>
            </TouchableOpacity>
            {isEditing && (
              <TouchableOpacity onPress={toggleEdit}>
                <LinearGradient
                  colors={['#FF6B6B', '#4ECDC4']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={resetUserData}>
              <LinearGradient
                colors={['#FF6B6B', '#4ECDC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Reset Data</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        <IconGoBack />
      </View>
    </TabLayout>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  userInfo: {
    alignItems: 'center',
  },
  userImage: {
    width: 250,
    height: 250,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#FF6B6B'
    
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imagePickerButton: {
    width: 250,
    height: 250,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imagePickerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});