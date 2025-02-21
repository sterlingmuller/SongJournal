import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import StyledText from '@src/components/common/components/StyledText';
import useEditOrAddArtistStyles from '@src/styles/editOrAddArtist';
import {
  useAppSelector,
  useAppDispatch,
} from '@src/utils/hooks/typedReduxHooks';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import {
  deleteArtistRequest,
  updateArtistRequest,
} from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import { Artist } from '@src/components/common/types';
import EditIcon from '@src/icons/EditIcon';
import CheckIcon from '@src/icons/CheckIcon';
import TrashIcon from '@src/icons/TrashIcon';
import CloseIcon from '@src/icons/CloseIcon';
import { MAX_TITLE_LENGTH } from '@src/components/common/constants';

const EditOrDeleteArtist = () => {
  const styles = useEditOrAddArtistStyles();
  const artists = useAppSelector(selectArtists);
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const [editingArtistId, setEditingArtistId] = useState<number>(null);
  const [newArtistName, setNewArtistName] = useState('');

  const handleEditPress = ({ artistId, name }: Artist) => {
    setEditingArtistId(artistId);
    setNewArtistName(name);
  };

  const handleArtistEditClose = () => {
    setEditingArtistId(null);
  };

  const handleSaveEdit = (originalName: string) => {
    if (newArtistName && newArtistName !== originalName) {
      dispatch(
        updateArtistRequest({
          name: newArtistName,
          artistId: editingArtistId,
          db,
        }),
      );

      // add wait for loading so name state isn't seen changing. Do this with Actions on React 19
      setEditingArtistId(null);
      setNewArtistName('');
    }
  };

  const handleDelete = (artistId: number) => {
    dispatch(deleteArtistRequest({ db, artistId }));
  };

  const handleDeletePress = (artistId: number) => {
    Alert.alert(
      'Delete Artist',
      'Are you sure you want to delete this artist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDelete(artistId) },
      ],
    );
  };

  const handleArtistChange = (name: string) => {
    if (name.length <= MAX_TITLE_LENGTH) {
      setNewArtistName(name);
    }
  };

  const renderArtistList = () =>
    artists.map(({ artistId, name }: Artist) => {
      const isEditingArtist = editingArtistId === artistId;

      return (
        <>
          <View style={styles.artistRow} key={artistId}>
            <View style={styles.artistNameContainer}>
              {isEditingArtist ? (
                <View style={styles.editTextbox}>
                  {/* input change is flickering, think has to do with setting state in map, see if react compiler addresses issue */}
                  <TextInput
                    value={newArtistName}
                    onChangeText={handleArtistChange}
                    placeholder={name}
                    style={styles.input}
                    autoFocus
                    autoCapitalize="words"
                  />
                </View>
              ) : (
                <StyledText>{name}</StyledText>
              )}
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  isEditingArtist
                    ? handleSaveEdit(name)
                    : handleEditPress({ artistId, name })
                }
              >
                {isEditingArtist ? (
                  <CheckIcon size={20} />
                ) : (
                  <EditIcon size={20} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  isEditingArtist
                    ? handleArtistEditClose()
                    : handleDeletePress(artistId)
                }
              >
                {isEditingArtist ? (
                  <CloseIcon size={20} />
                ) : (
                  <TrashIcon size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
        </>
      );
    });

  return (
    <>
      {artists.length > 0 && (
        <View style={styles.container}>
          <ScrollView>{renderArtistList()}</ScrollView>
        </View>
      )}
    </>
  );
};

export default EditOrDeleteArtist;
