import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import ContenderListDraggable from '../../components/List/ContenderList/ContenderListDraggable';
import { getAwardsBodyCategories } from '../../constants/categories';
import { Contender, Prediction } from '../../models';
import { PersonalParamList } from '../../navigation/types';
import DS from '../../services/datastore';
import { useAuth } from '../../store';
import { useSubscriptionEffect } from '../../util/hooks';
import { eventToString } from '../../util/stringConversions';

const EditPredictions = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<PersonalParamList, 'Contenders'>>();
  const navigation = useNavigation();
  const { userId } = useAuth();

  const [predictions, setPredictions] = useState<Prediction[] | undefined>();

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
  }, [navigation, category.name, category.event]);

  useSubscriptionEffect(async () => {
    if (!userId) return;
    const { data: p } = await DS.getPredictions(userId, category);
    if (!p) return;
    setPredictions([...p]);
  }, []);

  const onPressThumbnail = async (c: Contender) => {
    // do nothing for now?
  };

  // TODO: better loading state
  if (!predictions) return null;

  const orderedContenders = predictions
    .sort((a, b) => (a.ranking > b.ranking ? 1 : -1))
    .map((p) => p.contender);

  return (
    <View style={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}>
      <ContenderListDraggable
        category={category}
        contenders={orderedContenders}
        onPressThumbnail={onPressThumbnail}
      />
      <TouchableText
        text={'Add to list'}
        onPress={() => {
          navigation.navigate('AddContenders', { category });
        }}
        style={{ margin: 10 }}
      />
    </View>
  );
};

export default EditPredictions;
