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
import { useAppSelector, useAppDispatch } from '@src/hooks/typedReduxHooks';
import { selectArtists } from '@src/state/selectors/artistsSelector';
import { deleteArtistRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import { Artist } from '@src/components/common/types';
import EditIcon from '@src/icons/EditIcon';
import CheckIcon from '@src/icons/CheckIcon';
import TrashIcon from '@src/icons/TrashIcon';
import CloseIcon from '@src/icons/CloseIcon';
import { MAX_TITLE_LENGTH } from '@src/components/common/constants';
import { updateArtistRequest } from '@src/state/thunk/artistThunk';
import { updateArtistSuccess } from '@src/state/slice/artistsSlice';
import { calculateHitSlop } from '@src/utils/calculateHitSlope';

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

  const handleSaveEdit = async (originalName: string) => {
    if (newArtistName && newArtistName !== originalName) {
      try {
        const resultAction = await dispatch(
          updateArtistRequest({
            name: newArtistName,
            artistId: editingArtistId,
            db,
          }),
        );

        if (updateArtistRequest.fulfilled.match(resultAction)) {
          dispatch(
            updateArtistSuccess({
              artistId: editingArtistId,
              name: newArtistName,
            }),
          );
          setEditingArtistId(null);
          setNewArtistName('');
        }
      } catch (err) {
        console.error('Error updating artist:', err);
      }
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
    artists.map(({ artistId, name }: Artist, index: number) => {
      const isEditingArtist = editingArtistId === artistId;
      const isLastItem = index === artists.length - 1;

      return (
        <View key={artistId}>
          <View style={styles.artistRow}>
            <View style={styles.artistNameContainer}>
              {isEditingArtist ? (
                <View style={styles.editTextbox}>
                  <TextInput
                    value={newArtistName}
                    onChangeText={handleArtistChange}
                    placeholder={name}
                    style={styles.editArtistInput}
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
                    ? handleArtistEditClose()
                    : handleEditPress({ artistId, name })
                }
                hitSlop={calculateHitSlop({width: 32, height: 28})}
              >
                {isEditingArtist ? (
                  <CloseIcon size={22} />
                ) : (
                  <EditIcon size={24} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  isEditingArtist
                    ? handleSaveEdit(name)
                    : handleDeletePress(artistId)
                }
                hitSlop={calculateHitSlop({width: 32, height: 28})}
              >
                {isEditingArtist ? (
                  <CheckIcon size={24} isPrimaryText/>
                ) : (
                  <TrashIcon size={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    });

  return (
    <>
      {artists.length > 0 && (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderArtistList()}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default EditOrDeleteArtist;
