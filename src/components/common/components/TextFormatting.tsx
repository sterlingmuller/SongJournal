import { View, Text } from 'react-native';

export const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', marginBottom: 4 }}>
    <Text style={{ marginRight: 8, marginTop: 3 }}>•</Text>
    <Text style={{ flex: 1 }}>{children}</Text>
  </View>
);

export const HyphenPoint = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      flexDirection: 'row',
      marginBottom: 2,
      marginLeft: 16,
      alignItems: 'flex-start',
    }}
  >
    <Text style={{ marginRight: 8 }}>-</Text>
    <Text style={{ flex: 1 }}>{children}</Text>
  </View>
);
