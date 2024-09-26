import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  waveForms: number[];
  reversed?: boolean;
}

const WaveForms = ({ waveForms, reversed = false }: Props) => {
  return (
    <View style={[styles.container, reversed && styles.containerReversed]}>
      {waveForms.map((waveHeight: number, index: number) => (
        <View
          key={index}
          style={[styles.stick, { height: `${waveHeight}%` }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '60%',
  },
  containerReversed: {
    alignItems: 'flex-start',
    opacity: 0.3,
    height: '40%',
  },
  stick: {
    backgroundColor: 'white',
    width: 6,
    marginRight: 1,
  },
});

export default WaveForms;
