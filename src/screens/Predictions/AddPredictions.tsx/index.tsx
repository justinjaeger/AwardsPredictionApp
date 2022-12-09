import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { BodyBold } from '../../../components/Text';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { CategoryHeader } from '../styles';
import HeaderButton from '../../../components/HeaderButton';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { RouteProp, useRoute } from '@react-navigation/native';
import BackButton from '../../../components/Buttons/BackButton';
import _ from 'lodash';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import { FAB } from '../../../components/Buttons/FAB';
import CreateContender from '../CreateContender';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import Snackbar from '../../../components/Snackbar';

const AddPredictions = () => {
  const {
    params: { initialPredictions, onFinish },
  } = useRoute<RouteProp<PredictionsParamList, 'AddPredictions'>>();

  const navigation = useTypedNavigation<PredictionsParamList>();
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityData } = useQueryCommunityEvent(event);
  const communityPredictions = communityData ? communityData[category.id] || [] : [];

  const [selectedPredictions, setSelectedPredictions] = useState<iPrediction[]>(
    initialPredictions,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const selectedContenderIds = selectedPredictions.map((sp) => sp.contenderId);
  const initiallySelectedContenderIds = initialPredictions.map((p) => p.contenderId);

  // keeps track of whether we've edited the predictions from their initial state
  useEffect(() => {
    // make sure to call .sort() because the order doesn't matter, it's disregarded in the onFinish func
    const resultIsSame = _.isEqual(
      selectedContenderIds.sort(),
      initiallySelectedContenderIds.sort(),
    );
    setIsEditing(!resultIsSame);
  }, [selectedPredictions]);

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            const onGoBack = () => {
              navigation.goBack();
            };
            if (isEditing) {
              onSave();
            } else {
              onGoBack();
            }
          }}
        />
      ),
    });
  }, [navigation]);

  const onSave = async () => {
    // Below: we have to re-order the predictions so that the NEW films are at the bottom, so it doesn't change the previous order
    // films that we JUST added
    const addedContenderIds = selectedContenderIds.filter(
      (id) => !initiallySelectedContenderIds.includes(id),
    );
    // films that we JUST deleted
    const deletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !selectedContenderIds.includes(id),
    );
    // films that remain on the list
    const notDeletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !deletedContenderIds.includes(id),
    );
    // place the films that were UNCHANGED at the top, in the same order, with the new ones at the bottom
    const updatedContenderIds = [...notDeletedContenderIds, ...addedContenderIds];
    // doesn't need to be a reduce, but since "find" can technically return a null value, even though it shouldn't, this is more typesafe
    const sortedPredictions = updatedContenderIds.reduce((acc: iPrediction[], id) => {
      const prediction = selectedPredictions.find((p) => p.contenderId === id);
      if (prediction) {
        acc.push(prediction);
      }
      return acc;
    }, []);
    onFinish(sortedPredictions);
    navigation.goBack();
  };

  const onSelectPredictionFromSearch = (prediction: iPrediction) => {
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    if (isAlreadySelected) {
      // alert user that contender is already selected
      Snackbar.success(
        `This ${CATEGORY_TYPE_TO_STRING[
          category.type
        ].toLowerCase()} is already in your predictions`,
      );
    } else {
      Snackbar.success('Added to list');
      const newSelected = [...selectedPredictions, prediction];
      setSelectedPredictions(newSelected);
    }
  };

  return (
    <BackgroundWrapper>
      <>
        {isSearching ? (
          <CreateContender
            onSelectPrediction={onSelectPredictionFromSearch}
            onClose={() => setIsSearching(false)}
          />
        ) : (
          <>
            <CategoryHeader>
              <View style={{ flexDirection: 'row' }}>
                {isEditing ? (
                  <HeaderButton
                    onPress={() => {
                      Alert.alert('Undo recent changes?', '', [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: 'Undo',
                          onPress: () => {
                            setSelectedPredictions(initialPredictions);
                          },
                        },
                      ]);
                    }}
                    icon={'undo'}
                  />
                ) : null}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <HeaderButton onPress={() => setIsSearching(true)} icon={'search'} />
              </View>
            </CategoryHeader>
            {!communityPredictions || communityPredictions.length === 0 ? (
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BodyBold style={{ textAlign: 'center', lineHeight: 30 }}>
                  {'No predictions yet.\nAdd some!'}
                </BodyBold>
              </View>
            ) : selectedPredictions.length === 0 ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <BodyBold style={{ textAlign: 'center', lineHeight: 30 }}>
                  {'No predictions selected. Tap to add!'}
                </BodyBold>
              </View>
            ) : null}
            <MovieListSelectable
              predictions={communityPredictions}
              selectedPredictions={selectedPredictions}
              setSelectedPredictions={(ps) => setSelectedPredictions(ps)}
            />
            <FAB iconName="checkmark" text="Done" onPress={onSave} visible={isEditing} />
          </>
        )}
      </>
    </BackgroundWrapper>
  );
};

export default AddPredictions;
