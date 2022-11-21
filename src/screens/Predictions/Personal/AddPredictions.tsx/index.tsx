import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import ContenderListItem from '../../../../components/List/ContenderList/ContenderListItem';
import { PersonalParamList, PredictionsParamList } from '../../../../navigation/types';
import { useTypedNavigation } from '../../../../util/hooks';
import { useCategory } from '../../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../../store/types';
import { Body } from '../../../../components/Text';
import useQueryCommunityEvent from '../../../../hooks/getCommunityEvent';
import { removePredictionFromList } from '../../../../util/removePredictionFromList';
import { CategoryHeader } from '../../styles';
import HeaderButton from '../../../../components/HeaderButton';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import { RouteProp, useRoute } from '@react-navigation/native';
import BackButton from '../../../../components/Buttons/BackButton';
import _ from 'lodash';

// TODO: really, this is adding OR deleting contenders

const AddPredictions = () => {
  const {
    params: { initialPredictions, onFinish },
  } = useRoute<RouteProp<PredictionsParamList, 'AddPredictions'>>();

  const navigation = useTypedNavigation<PersonalParamList>();
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityData, isLoading: isLoadingCommunity } = useQueryCommunityEvent(
    event,
  );
  const communityPredictions = (communityData || {})[category.id];

  const [selectedPredictions, setSelectedPredictions] = useState<iPrediction[]>(
    initialPredictions,
  );
  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
              Alert.alert('Unsaved Changes', 'Still go back?', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                { text: 'Go Back', onPress: onGoBack },
              ]);
            } else {
              onGoBack();
            }
          }}
        />
      ),
    });
  }, [navigation]);

  const onPressItem = async (prediction: iPrediction) => {
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    const newSelected = isAlreadySelected
      ? removePredictionFromList(selectedPredictions, prediction)
      : [...selectedPredictions, prediction];
    setSelectedPredictions(newSelected);
  };

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

  if (!communityPredictions || isLoadingCommunity) {
    return null;
  }

  return (
    <>
      <BackgroundWrapper>
        <>
          <CategoryHeader
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View style={{ flexDirection: 'row' }} />
            <View style={{ flexDirection: 'row' }}>
              {isEditing ? <HeaderButton onPress={() => onSave()} icon={'save'} /> : null}
              <HeaderButton
                onPress={() => {
                  navigation.navigate('CreateContender');
                }}
                icon={'plus'}
              />
            </View>
          </CategoryHeader>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 100,
              width: '100%',
            }}
          >
            {communityPredictions.length === 0 ? (
              <Body>No Predictions yet! Add some</Body>
            ) : null}
            {communityPredictions.map((cp, i) => {
              const highlighted = selectedPredictions
                .map((sp) => sp.contenderId)
                .includes(cp.contenderId);
              return (
                <ContenderListItem
                  prediction={cp}
                  ranking={i + 1}
                  onPressItem={onPressItem}
                  onPressThumbnail={(item) => {
                    const id = item.contenderId;
                    if (selectedContenderId === id) {
                      setSelectedContenderId(undefined);
                    } else {
                      setSelectedContenderId(id);
                    }
                  }}
                  selected={selectedContenderId === cp.contenderId}
                  highlighted={highlighted}
                  variant={'add'}
                />
              );
            })}
          </ScrollView>
        </>
      </BackgroundWrapper>
    </>
  );
};

export default AddPredictions;
