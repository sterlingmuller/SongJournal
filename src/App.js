import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import Home from './screens/Home';
import Settings from '@src/screens/Settings';
import global from './styles/global';

const App = () => {
  return (
    <View style={global.container}>
      <Home />
      {/* <Settings /> */}
    </View>
  );
}

export default App;
