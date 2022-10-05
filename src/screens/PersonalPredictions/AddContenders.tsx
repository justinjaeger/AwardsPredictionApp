import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import ContenderListItem from '../../components/List/ContenderList/ContenderListItem';
import { getAwardsBodyCategories } from '../../constants/categories';
import { PosterSize } from '../../constants/posterDimensions';
import { CategoryType, Contender, Prediction } from '../../models';
import { PersonalParamList } from '../../navigation/types';
import DS from '../../services/datastore';
import { useAuth } from '../../store';
import { useSubscriptionEffect } from '../../util/hooks';
import { eventToString } from '../../util/stringConversions';

type iAddContenderItem = {
  selected: boolean;
  contender: Contender;
};

type iPredictionData = {
  contender: Contender;
  ranking: number;
}[];

// TODO: really, this is adding OR deleting contenders

const AddContenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<PersonalParamList, 'AddContenders'>>();
  const navigation = useNavigation();
  const { userId } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [initialPredictions, setInitialPredictions] = useState<Prediction[]>([]);
  const [contenderData, setContenderData] = useState<iAddContenderItem[]>([]);

  const selectedContenders = contenderData.filter((cd) => cd.selected);

  // Set header title
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

  // get initial list of contenders and mark whether they are selected or not
  useSubscriptionEffect(async () => {
    if (!userId) return;
    const { data: predictions } = await DS.getPredictions(userId, category);
    if (!predictions) return;
    setInitialPredictions(predictions);
    const initiallySelectedContenderIds = predictions.map((p) => p.contender.id);
    const allContenders = (await DataStore.query(Contender))
      .filter((c) => c.category?.id === category.id)
      .map((c) => {
        const selected = initiallySelectedContenderIds.includes(c.id);
        return {
          selected,
          contender: c,
        };
      });
    setContenderData(allContenders);
  }, []);

  const onPressFilm = async (contender: Contender) => {
    navigation.navigate('ContenderDetails', {
      contender,
      categoryType: category.type,
    });
  };

  const onPressPerformance = async (contender: Contender) => {
    let personTmdb;
    if (contender.contenderPersonId) {
      const { data: p } = await DS.getPersonById(contender.contenderPersonId);
      if (p) {
        personTmdb = p.tmdbId;
      }
    }
    navigation.navigate('ContenderDetails', {
      contender,
      categoryType: category.type,
      personTmdb,
    });
  };

  const onPressThumbnail = (() => {
    switch (CategoryType[category.type]) {
      case CategoryType.FILM:
      case CategoryType.SONG:
        return onPressFilm;
      case CategoryType.PERFORMANCE:
        return onPressPerformance;
    }
  })();

  const onPressItem = async (c: Contender) => {
    const newContenderData = contenderData.map((cd) => {
      if (cd.contender.id === c.id) {
        return {
          contender: cd.contender,
          selected: !cd.selected,
        };
      }
      return cd;
    });
    setContenderData(newContenderData);
  };

  const onSave = async () => {
    if (!userId) return;
    setLoading(true);
    const initialContenderIds = initialPredictions.map((p) => p.contender.id);
    const selectedContenderIds = selectedContenders.map((sc) => sc.contender.id);
    const addedContenderIds = selectedContenderIds.filter(
      (id) => !initialContenderIds.includes(id),
    );
    const deletedContenderIds = initialContenderIds.filter(
      (id) => !selectedContenderIds.includes(id),
    );
    // format initial predictions and remove deleted contenders
    const notDeletedContenders = initialPredictions.reduce((acc: Contender[], p) => {
      // filter out deleted contenders; format predictions as iPredictionData
      if (!deletedContenderIds.includes(p.contender.id)) {
        acc.push(p.contender);
      }
      return acc;
    }, []);
    // format the added contenders
    const addedContenders = selectedContenders.reduce((acc: Contender[], c) => {
      // filter out deleted contenders; format predictions as iPredictionData
      if (addedContenderIds.includes(c.contender.id)) {
        acc.push(c.contender);
      }
      return acc;
    }, []);
    // set the ranking order according to insertion order into the array
    const newPredictionData: iPredictionData = [
      ...notDeletedContenders,
      ...addedContenders,
    ].map((c, i) => ({
      contender: c,
      ranking: i + 1,
    }));
    const { data: newPredictions } = await DS.createOrUpdatePredictions(
      userId,
      category,
      newPredictionData,
    );
    if (newPredictions) {
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 100,
        width: '100%',
      }}
    >
      {contenderData.map((c, i) => (
        <ContenderListItem
          contender={c.contender}
          ranking={i + 1}
          category={category}
          onPressItem={onPressItem}
          onPressThumbnail={onPressThumbnail}
          selected={c.selected}
          size={PosterSize.SMALL}
          isSelectable
          disabled={loading}
        />
      ))}
      {contenderData.length > 0 ? (
        <TouchableText text={'Save'} onPress={onSave} style={{ margin: 10 }} />
      ) : null}
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender', { category });
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default AddContenders;
