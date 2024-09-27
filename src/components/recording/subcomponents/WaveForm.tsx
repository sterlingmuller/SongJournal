import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  waveForms: number[];
}

const WaveForms = ({ waveForms }: Props) => {
  return (
    <View style={[styles.container]}>
      {waveForms.map((waveHeight: number, index: number) => (
        <View style={{ flexDirection: 'column', gap: 1 }}>
          <View style={{ height: '60%', justifyContent: 'flex-end' }}>
            <View
              key={index}
              style={[styles.stick, { height: `${waveHeight}%` }]}
            />
          </View>
          <View
            style={{
              height: '40%',
              justifyContent: 'flex-start',
              opacity: 0.3,
            }}
          >
            <View
              key={index}
              style={[styles.stick, { height: `${waveHeight}%` }]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  stick: {
    backgroundColor: 'white',
    width: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
});

export default WaveForms;
