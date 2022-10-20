import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { AwardsBody, CategoryName, EventType, GetCategoryQuery } from '../../API';
import { TouchableText } from '../../components/Buttons';
import ContenderList from '../../components/List/ContenderList';
import { Body } from '../../components/Text';
import { PersonalParamList } from '../../navigation/types';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../store';
import {
  useAsyncEffect,
  useSubscriptionEffect,
  useTypedNavigation,
} from '../../util/hooks';
import { fullEventToString } from '../../util/stringConversions';

// NOTE: Similar to Category/Contenders
const ViewPredictions = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<PersonalParamList, 'Contenders'>>();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId } = useAuth();

  const [category, setCategory] = useState<GetCategoryQuery>();
  const [contenderIds, setContenderIds] = useState<string[]>([]);

  const cat = category?.getCategory;

  // NOTE: later, we'll just have the category live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  // Set header title (NOTE: dupliated from Global, combine these screens via top tabs eventually)
  // Move all duplicated stuff into shared menu like "add contender" (maybe that's in a FAB popout)
  useLayoutEffect(() => {
    const c = category?.getCategory;
    if (!c) return;
    const e = c.event;
    navigation.setOptions({
      headerTitle: fullEventToString(
        AwardsBody[e.awardsBody],
        EventType[e.type],
        e.year,
        CategoryName[c.name],
      ),
    });
  }, [navigation, category]);

  // NOTE: same logic exists in EditPredictions
  // Get predictions as list of sorted contender Ids
  useSubscriptionEffect(async () => {
    if (!userId || !cat) return;
    const { data: pSet } = await ApiServices.getPredictionsSet({
      userId,
      categoryId,
      eventId: cat.event.id,
    });
    const pSetId = pSet?.getPredictionSet?.id;
    if (!pSetId) return; // means user just hasn't made predictions
    const { data } = await ApiServices.getPredictionsByPredictionSetId(pSetId);
    const predictions = data?.listPredictions;
    if (!predictions) return;
    const sortedContenderIds = (predictions?.items || [])
      .sort((a, b) => {
        if (!a || !b) return 0;
        return a.ranking > b.ranking ? 1 : -1;
      })
      .map((p) => p?.contenderPredictionsId || '');
    setContenderIds(sortedContenderIds);
  }, [cat]);

  const onPressThumbnail = async (contenderId: string) => {
    // do nothing for now?
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}
    >
      {contenderIds.length > 0 ? (
        <>
          <TouchableText
            text={'Edit Predictions'}
            onPress={() => {
              navigation.navigate('EditPredictions', { categoryId });
            }}
            style={{ margin: 10 }}
          />
          <ContenderList
            categoryId={categoryId}
            orderedContenderIds={contenderIds}
            onPressThumbnail={onPressThumbnail}
          />
        </>
      ) : (
        <Body>No predictions yet. Add some. Or it's just loading</Body>
      )}
      <TouchableText
        text={'Add to list'}
        onPress={() => {
          navigation.navigate('AddContenders', { categoryId });
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default ViewPredictions;
