import * as ExpoShake from 'expo-shake';
import { useEffect, useState } from 'react';
import {Button, Text, View } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState<string>(ExpoShake.getTheme());
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const subscription = ExpoShake.addThemeListener(({theme: newTheme}) => {
      setTheme(newTheme);
    })

    return () => subscription.remove();
  }, [setTheme]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <Text>Theme: {ExpoShake.getTheme()}</Text>
      <Button title="Change Theme" onPress={() => ExpoShake.setTheme(nextTheme)} />
    </View>
  );
}
