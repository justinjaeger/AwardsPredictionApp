import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import ContenderList from '../../components/List/ContenderList';
import { CategoryName, EventType, AwardsBody, Contender } from '../../models';
import { PersonalParamList } from '../../navigation/types';
import DS from '../../services/datastore';
import { useAuth } from '../../store';
import { useSubscriptionEffect } from '../../util/hooks';
import { fullEventToString } from '../../util/stringConversions';

const ViewPredictions = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<PersonalParamList, 'Contenders'>>();
  const navigation = useNavigation();
  const { userId } = useAuth();

  const [contenders, setContenders] = useState<Contender[]>([]);

  // Set header title (NOTE: dupliated from Global, combine these screens via top tabs eventually)
  // Move all duplicated stuff into shared menu like "add contender" (maybe that's in a FAB popout)
  useLayoutEffect(() => {
    const e = category.event;
    if (!e) return;
    navigation.setOptions({
      headerTitle: fullEventToString(
        AwardsBody[e.awardsBody],
        EventType[e.type],
        e.year,
        CategoryName[category.name],
      ),
    });
  }, [navigation, category.name, category.event]);

  // NOTE: same logic exists in EditPredictions
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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}
    >
      {contenders.length > 0 ? (
        <>
          <TouchableText
            text={'Edit Predictions'}
            onPress={() => {
              navigation.navigate('EditPredictions', { category });
            }}
            style={{ margin: 10 }}
          />
          <ContenderList
            category={category}
            contenders={contenders}
            onPressThumbnail={onPressThumbnail}
          />
        </>
      ) : (
        <TouchableText
          text={'Add to list'}
          onPress={() => {
            navigation.navigate('AddContenders', { category });
          }}
          style={{ margin: 10 }}
        />
      )}
    </ScrollView>
  );
};

export default ViewPredictions;
