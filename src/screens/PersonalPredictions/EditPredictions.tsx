import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { AwardsBody, CategoryName, EventType, GetCategoryQuery } from '../../API';
import { TouchableText } from '../../components/Buttons';
import ContenderListDraggable from '../../components/List/ContenderList/ContenderListDraggable';
import { PersonalParamList } from '../../navigation/types';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../store';
import {
  useAsyncEffect,
  useSubscriptionEffect,
  useTypedNavigation,
} from '../../util/hooks';
import { fullEventToString } from '../../util/stringConversions';

// NOTE: Similar to Add Contenders, somewhat
const EditPredictions = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<PersonalParamList, 'Contenders'>>();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId } = useAuth();

  const [category, setCategory] = useState<GetCategoryQuery>();
  const [contenderIds, setContenderIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const cat = category?.getCategory;

  // NOTE: later, we'll just have the category live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  // Set header title (NOTE: dupliated from Global, combine these screens via top tabs eventually)
  // Move all duplicated stuff into shared menu like "add contender" (maybe that's in a FAB popout)
  useLayoutEffect(() => {
    if (!cat) return;
    const e = cat.event;
    if (!e) return;
    navigation.setOptions({
      headerTitle: fullEventToString(
        AwardsBody[e.awardsBody],
        EventType[e.type],
        e.year,
        CategoryName[cat.name],
      ),
    });
  }, [navigation, cat]);

  // Get predictions as list of sorted contender Ids
  useSubscriptionEffect(async () => {
    if (!userId || !cat) return;
    // get list of categoryIds of user's personal selections
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
      .map((p) => p?.contenderId || '');
    setContenderIds(sortedContenderIds);
  }, [cat]);

  const onPressThumbnail = async (cId: string) => {
    // do nothing for now?
  };

  const onSaveContenders = async () => {
    if (!userId) return;
    setLoading(true);
    const newPredictionData = contenderIds.map((id, i) => ({
      contenderId: id,
      ranking: i + 1,
    }));
    const eventId = cat?.eventId;
    if (!eventId) {
      return console.error('no eventId property on category');
    }
    await ApiServices.createOrUpdatePredictions(
      { userId, categoryId, eventId },
      newPredictionData,
    );
    navigation.goBack();
    setLoading(false);
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}>
      <TouchableText
        text={'Add or delete contenders'}
        onPress={() => {
          navigation.navigate('AddContenders', { categoryId });
        }}
        loading={loading}
        style={{ margin: 10 }}
      />
      <TouchableText
        text={'Save'}
        onPress={onSaveContenders}
        loading={loading}
        style={{ margin: 10 }}
      />
      <ContenderListDraggable
        categoryId={categoryId}
        contenderIds={contenderIds}
        onDragEnd={setContenderIds}
        onPressThumbnail={onPressThumbnail}
      />
    </View>
  );
};

export default EditPredictions;
