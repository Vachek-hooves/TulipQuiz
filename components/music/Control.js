import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import {toggleBackgroundMusic} from './setupPlayer';
import {SoundPlay} from '../ui/icons';

const Control = () => {
  const [offState, setOffState] = useState(false);
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  const handleToggleSound = async () => {
    await toggleBackgroundMusic();
    setOffState(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleSound}>
        {offState ? (
          <SoundPlay play={offState} />
        ) : (
          <SoundPlay play={offState} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Control;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 60,
    left: 60,
  },
});
