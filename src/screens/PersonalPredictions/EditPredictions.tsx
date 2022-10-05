import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import ContenderListDraggable from '../../components/List/ContenderList/ContenderListDraggable';
import { getAwardsBodyCategories } from '../../constants/categories';
import { Contender } from '../../models';
import { PersonalParamList } from '../../navigation/types';
import DS from '../../services/datastore';
import { iPredictionData } from '../../services/datastore/user/predictions';
import { useAuth } from '../../store';
import { useSubscriptionEffect } from '../../util/hooks';
import { eventToString } from '../../util/stringConversions';

const EditPredictions = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<PersonalParamList, 'Contenders'>>();
  const navigation = useNavigation();
  const { userId } = useAuth();

  const [contenders, setContenders] = useState<Contender[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Set header title (NOTE: dupliated from Global, combine these screens via top tabs eventually)
  // Move all duplicated stuff into shared menu like "add contender" (maybe that's in a FAB popout)
  useLayoutEffect(() => {
    const categoryList = getAwardsBodyCategories(category.event);
    navigation.setOptions({
      headerTitle:
        'Best' +
        ' ' +
        categoryList[category.name]?.name +
        ' ' +
        eventToString(category.event),
    });
    navigation.setOptions({});
  }, [navigation, category.name, category.event]);

  useSubscriptionEffect(async () => {
    if (!userId) return;
    const { data: ps } = await DS.getPredictions(userId, category);
    if (!ps) return;
    const sortedContenders = (ps || [])
      .sort((a, b) => (a.ranking > b.ranking ? 1 : -1))
      .map((p) => p.contender);
    setContenders(sortedContenders);
  }, []);

  const onPressThumbnail = async (c: Contender) => {
    // do nothing for now?
  };

  const onSaveContenders = async () => {
    if (!userId) return;
    const predictionData: iPredictionData = contenders.map((c, i) => ({
      contender: c,
      ranking: i + 1,
    }));
    setLoading(true);
    await DS.createOrUpdatePredictions(userId, category, predictionData);
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}>
      <TouchableText
        text={'Add or delete contenders'}
        onPress={() => {
          navigation.navigate('AddContenders', { category });
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
        category={category}
        contenders={contenders}
        onDragEnd={setContenders}
        onPressThumbnail={onPressThumbnail}
      />
    </View>
  );
};

export default EditPredictions;
