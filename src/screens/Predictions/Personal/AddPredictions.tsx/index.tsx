import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryType } from '../../../../API';
import { TouchableText } from '../../../../components/Buttons';
import ContenderListItem from '../../../../components/List/ContenderList/ContenderListItem';
import { PersonalParamList } from '../../../../navigation/types';
import { useTypedNavigation } from '../../../../util/hooks';
import { removeFromArray } from '../../../../util/removeFromArray';
import { useCategory } from '../../../../context/CategoryContext';
import { useAuth } from '../../../../context/UserContext';
import { iCategory, iEvent, iPrediction } from '../../../../store/types';
import { useIsFetching } from '@tanstack/react-query';
import { Body } from '../../../../components/Text';
import useQueryCommunityEvent from '../../../../hooks/getCommunityEvent';
import useQueryPersonalEvent from '../../../../hooks/getPersonalEvent';
import useMutationUpdatePredictions from '../../../../hooks/updatePredictions';

// TODO: really, this is adding OR deleting contenders
// NOTE: this is very similar to Contenders, some code is duplicated

const AddPredictions = () => {
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId: _userId } = useAuth();
  const { category: _category, event: _event } = useCategory();
  const isFetching = useIsFetching();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: personalData, isLoading: isLoadingPersonal } = useQueryPersonalEvent(
    event.id,
    userId,
  );
  const personalPredictions = (personalData || {})[category.id];

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityData, isLoading: isLoadingCommunity } = useQueryCommunityEvent(
    event,
  );
  const communityPredictions = (communityData || {})[category.id];

  const { mutate: updatePredictions } = useMutationUpdatePredictions();

  // TODO: can do this screen AFTER global predictions are gotten, because we need these
  // Need global predictions AND personal per category
  const [loading, setLoading] = useState<boolean>(false);
  const [navigateBackWhenDoneFetching, setDone] = useState<boolean>(false);
  const [selectedPredictions, setSelectedPredictions] = useState<iPrediction[]>([]);

  // we want to copy it to a local state to easily edit it
  useEffect(() => {
    if (personalPredictions) {
      setSelectedPredictions(personalPredictions);
    }
  }, [personalPredictions]);

  // fires when everything is saved
  useEffect(() => {
    if (isFetching === 0 && navigateBackWhenDoneFetching === true) {
      navigation.goBack();
      setDone(false);
    }
  }, [isFetching]);

  // Declare contender id arrays
  const selectedContenderIds = selectedPredictions.map((sp) => sp.contenderId);
  const initiallySelectedContenderIds = (personalPredictions || []).map(
    (pp) => pp.contenderId,
  );

  const onPressFilm = async (contenderId: string) => {
    navigation.navigate('ContenderDetails', {
      categoryType: category.type,
      contenderId: contenderId,
    });
  };

  const onPressPerformance = async (contenderId: string, personTmdbId: number) => {
    navigation.navigate('ContenderDetails', {
      contenderId: contenderId,
      categoryType: category.type,
      personTmdb: personTmdbId,
    });
  };

  const onPressThumbnail = (contenderId: string, personTmdbId?: number) => {
    const cType = CategoryType[category.type];
    if (cType === CategoryType.PERFORMANCE && personTmdbId) {
      onPressPerformance(contenderId, personTmdbId);
    } else {
      onPressFilm(contenderId);
    }
  };

  const onPressItem = async (prediction: iPrediction) => {
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    const newSelected = isAlreadySelected
      ? removeFromArray<iPrediction>(selectedPredictions, prediction)
      : [...selectedPredictions, prediction];
    setSelectedPredictions(newSelected);
  };

  const onSave = async () => {
    setLoading(true);
    const addedContenderIds = selectedContenderIds.filter(
      (id) => !initiallySelectedContenderIds.includes(id),
    );
    const deletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !selectedContenderIds.includes(id),
    );
    // format initial predictions and remove deleted contenders
    const notDeletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !deletedContenderIds.includes(id),
    );
    const updatedContenderIds = [...notDeletedContenderIds, ...addedContenderIds];
    // set the ranking order according to insertion order into the array
    const newPredictionData = updatedContenderIds.map((c, i) => ({
      contenderId: c,
      ranking: i + 1,
    }));
    await updatePredictions({
      predictionSetParams: { userId, categoryId: category.id, eventId: event.id },
      predictionData: newPredictionData,
    });
    setDone(true);
  };

  if (!communityPredictions || isLoadingPersonal || isLoadingCommunity) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 100,
        width: '100%',
      }}
    >
      {communityPredictions.length === 0 ? (
        <Body>No Predictions yet! Add some</Body>
      ) : null}
      {communityPredictions.map((cp, i) => {
        const selected = selectedPredictions
          .map((sp) => sp.contenderId)
          .includes(cp.contenderId);
        return (
          <ContenderListItem
            prediction={cp}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressThumbnail}
            selected={selected}
            // size={PosterSize.SMALL}
            // isSelectable
            disabled={loading}
            tab={'personal'}
            toggleSelected={() => {}}
          />
        );
      })}
      <TouchableText text={'Save'} onPress={onSave} style={{ margin: 10 }} />
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender');
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default AddPredictions;
