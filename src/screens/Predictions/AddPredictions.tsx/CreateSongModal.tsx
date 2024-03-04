import React, { useEffect, useState } from 'react';
import { FAB } from '../../../components/Buttons/FAB';
import BasicModal from '../../../components/BasicModal';
import { iPrediction } from '../../../models';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import { SubmitButton } from '../../../components/Buttons';
import FormInput from '../../../components/Inputs/FormInput';
import { View } from 'react-native';

const CreateSongModal = ({
  visible,
  selectedMovieTmdbId,
  communityPredictions,
  onClose,
  onAddContender,
  addItemToPredictions,
}: {
  visible: boolean;
  selectedMovieTmdbId: number;
  communityPredictions: iPrediction[];
  onClose: () => void;
  onAddContender: (
    movieTmdbId: number,
    personTmdbId?: number,
    songTitle?: string,
    songArtist?: string,
  ) => void;
  addItemToPredictions: (prediction: iPrediction) => void;
}) => {
  const communityPredictionsWithMovie = communityPredictions.filter(
    (p) => p.movieTmdbId === selectedMovieTmdbId,
  );

  const [modalState, setModalState] = useState<'select' | 'create'>('select');

  // initial load...
  useEffect(() => {
    setModalState(communityPredictionsWithMovie.length > 0 ? 'select' : 'create');
  }, []);

  const onCloseModal = () => {
    onClose();
    setModalState('select');
  };

  const [selectedExistingPrediction, setSelectedExistingPrediction] = useState<
    iPrediction | undefined
  >(undefined);
  const [songTitle, setSongTitle] = useState<string>('TBD');

  return (
    <BasicModal
      visible={visible}
      onClose={onCloseModal}
      width={'100%'}
      height={'80%'}
      header={{
        title: modalState === 'create' ? 'Enter song details' : 'Select song',
      }}
    >
      {modalState === 'create' ? (
        <>
          <View
            style={{ alignSelf: 'center', width: '80%', height: '100%', marginTop: 10 }}
          >
            <FormInput
              label="Song Title"
              value={songTitle}
              setValue={setSongTitle}
              textContentType={'song'}
              caption={'If unknown, leave it as "TBD"'}
              style={{ marginBottom: 10 }}
            />
          </View>
          <FAB
            iconName="plus"
            text="Submit"
            onPress={() => {
              onAddContender(selectedMovieTmdbId, undefined, songTitle);
              onCloseModal();
            }}
            visible={songTitle.length > 0}
            horizontalOffset={10}
            bottomPercentage={'20%'}
          />
        </>
      ) : (
        <>
          <View style={{ height: '90%', position: 'relative' }}>
            <MovieListSelectable
              predictions={communityPredictionsWithMovie ?? []}
              selectedPredictions={
                selectedExistingPrediction ? [selectedExistingPrediction] : []
              }
              setSelectedPrediction={(p) => {
                setSelectedExistingPrediction((curr) => (curr === p ? undefined : p));
              }}
            />
            {!selectedExistingPrediction ? (
              <SubmitButton
                style={{ position: 'absolute', bottom: 0, width: 100 }}
                text={'Add New Song'}
                onPress={() => {
                  setModalState('create');
                }}
              />
            ) : null}
          </View>
          <FAB
            iconName="plus"
            text="Select"
            onPress={() => {
              if (selectedExistingPrediction) {
                addItemToPredictions(selectedExistingPrediction);
                onCloseModal();
              }
            }}
            visible={!!selectedExistingPrediction}
            horizontalOffset={10}
            bottomPercentage={'20%'}
          />
        </>
      )}
    </BasicModal>
  );
};

export default CreateSongModal;
