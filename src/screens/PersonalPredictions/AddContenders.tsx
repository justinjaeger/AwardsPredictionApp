import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AwardsBody,
  CategoryName,
  CategoryType,
  EventType,
  GetCategoryQuery,
  ListContendersQuery,
} from '../../API';
import { TouchableText } from '../../components/Buttons';
import ContenderListItem from '../../components/List/ContenderList/ContenderListItem';
import { PosterSize } from '../../constants/posterDimensions';
import { PersonalParamList } from '../../navigation/types';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../store';
import {
  useAsyncEffect,
  useSubscriptionEffect,
  useTypedNavigation,
} from '../../util/hooks';
import { removeFromArray } from '../../util/removeFromArray';
import { fullEventToString } from '../../util/stringConversions';

// TODO: really, this is adding OR deleting contenders
// NOTE: this is very similar to Contenders, some code is duplicated

const AddContenders = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<PersonalParamList, 'AddContenders'>>();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [contenders, setContenders] = useState<ListContendersQuery>();
  const [category, setCategory] = useState<GetCategoryQuery>();
  const [selectedContenderIds, setSelectedContenderIds] = useState<string[]>([]);
  const [initiallySelectedContenderIds, setInitiallySelectedContenderIds] = useState<
    string[]
  >([]);

  const cat = category?.getCategory;

  // NOTE: later, we'll just have the category live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  // Set header title
  useLayoutEffect(() => {
    if (!cat) return;
    const e = cat.event;
    navigation.setOptions({
      headerTitle: fullEventToString(
        AwardsBody[e.awardsBody],
        EventType[e.type],
        e.year,
        CategoryName[cat.name],
      ),
    });
  }, [navigation, cat]);

  // get initial list of contenders and mark whether they are selected or not
  useSubscriptionEffect(async () => {
    if (!userId || !cat) return;
    const { data: pSet } = await ApiServices.getPredictionsSet({
      userId,
      categoryId,
      eventId: cat.event.id,
    });
    const predictions = pSet?.getPredictionSet?.predictions;
    if (!predictions) {
      return console.error('no predictions found from getPredictionSet query');
    }
    // this is basically get contenders by category id
    const { data: cs } = await ApiServices.getContendersByCategory(cat.id);
    setContenders(cs);
    const initiallySelectedContendersIds = cs?.listContenders?.items.map(
      (c) => c?.id || '',
    );
    if (!initiallySelectedContendersIds) return;
    setInitiallySelectedContenderIds(initiallySelectedContendersIds);
    setSelectedContenderIds(initiallySelectedContendersIds);
  }, []);

  const onPressFilm = async (contenderId: string) => {
    if (!cat) return;
    navigation.navigate('ContenderDetails', {
      categoryType: cat.type,
      contenderId,
    });
  };

  const onPressPerformance = async (contenderId: string, personId: string) => {
    if (!cat) return;
    const { data } = await ApiServices.getPerson(personId);
    if (!data?.getPerson) return;
    const personTmdb = data.getPerson.tmdbId;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: cat.type,
      personTmdb,
    });
  };

  const onPressThumbnail = (contenderId: string, personId?: string) => {
    if (!category?.getCategory) return;
    const cType = CategoryType[category?.getCategory.type];
    if (cType === CategoryType.PERFORMANCE && personId) {
      onPressPerformance(contenderId, personId);
    } else {
      onPressFilm(contenderId);
    }
  };

  const onPressItem = async (contenderId: string) => {
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    const newSelected = isAlreadySelected
      ? removeFromArray<string>(selectedContenderIds, contenderId)
      : [...selectedContenderIds, contenderId];
    setSelectedContenderIds(newSelected);
  };

  const onSave = async () => {
    if (!userId) return;
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
    const eventId = cat?.eventId;
    if (!eventId) {
      return console.error('no eventId property on category');
    }
    const { data: newPredictions } = await ApiServices.createOrUpdatePredictions(
      { userId, categoryId, eventId },
      newPredictionData,
    );
    if (newPredictions) {
      navigation.goBack();
    }
    setLoading(false);
  };

  const _contenders = contenders?.listContenders;

  if (!_contenders) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 100,
        width: '100%',
      }}
    >
      {_contenders?.items.map((c, i) => {
        const contenderId = c?.id;
        if (!contenderId) return null;
        return (
          <ContenderListItem
            contenderId={contenderId}
            ranking={i + 1}
            categoryId={categoryId}
            onPressItem={onPressItem}
            onPressThumbnail={onPressThumbnail}
            selected={selectedContenderIds.includes(contenderId)}
            size={PosterSize.SMALL}
            isSelectable
            disabled={loading}
          />
        );
      })}
      {_contenders.items.length > 0 ? (
        <TouchableText text={'Save'} onPress={onSave} style={{ margin: 10 }} />
      ) : null}
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender', { categoryId: 'asdf' });
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default AddContenders;
