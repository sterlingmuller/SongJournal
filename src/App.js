import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import Home from './screens/Home';
import global from './styles/global'

const App = () => {
  return (
    <View style={global.container}>
      <Home />
    </View>
  );
}

export default App;
