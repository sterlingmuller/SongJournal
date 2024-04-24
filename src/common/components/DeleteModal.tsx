import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import modalStyle from '@src/styles/modal';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

interface Props {
  isDeleteModalOpen: string;
  setIsDeleteModalOpen: (currentSong: string) => void;
}

const DeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen }: Props) => {
  const onExitPress = (): void => setIsDeleteModalOpen('');

  return (
    <Modal transparent visible={!!isDeleteModalOpen}>
      <TouchableOpacity
        style={modalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={modalStyle.container}>
          <Text style={modalStyle.title}>
            Delete from Google account and all devices
          </Text>
          <Text style={modalStyle.title}>
            Song will be permanently deleted. This action cannot be undone
          </Text>
          <SaveAndCancelButtons />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteModal;

// {
//   "name": "songjournal",
//   "version": "1.0.0",
//   "main": "node_modules/expo/AppEntry.js",
//   "scripts": {
//     "start": "expo start",
//     "android": "expo start --android",
//     "ios": "expo start --ios",
//     "web": "expo start --web"
//   },
//   "dependencies": {
//     "@expo/vector-icons": "^14.0.0",
//     "@react-navigation/native": "^6.1.17",
//     "@react-navigation/native-stack": "^6.9.26",
//     "@types/react": "~18.2.45",
//     "@typescript-eslint/parser": "^5.62.0",
//     "babel-plugin-module-resolver": "^5.0.0",
//     "eslint-config-airbnb-typescript-prettier": "^5.0.0",
//     "expo": "~50.0.14",
//     "expo-status-bar": "~1.11.1",
//     "prettier": "^3.2.5",
//     "prettier-eslint": "^16.3.0",
//     "react": "18.2.0",
//     "react-native": "0.73.6",
//     "react-native-safe-area-context": "4.8.2",
//     "react-native-screens": "~3.29.0",
//     "react-native-svg": "14.1.0",
//     "typescript": "^4.9.5"
//   },
//   "devDependencies": {
//     "@babel/core": "^7.20.0",
//     "@typescript-eslint/eslint-plugin": "^7.7.0",
//     "eslint": "^8.57.0",
//     "eslint-plugin-import": "^2.29.1",
//     "eslint-plugin-react": "^7.34.1",
//     "eslint-plugin-react-hooks": "^4.6.0"
//   },
//   "private": true
// }
