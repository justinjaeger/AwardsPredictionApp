import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { CategoryType, GetCategoryQuery, ListContendersQuery } from '../../API';
import { TouchableText } from '../../components/Buttons';
import ContenderListItem from '../../components/List/ContenderList/ContenderListItem';
import { PosterSize } from '../../constants/posterDimensions';
import { PersonalParamList } from '../../navigation/types';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../store';
import { useSubscriptionEffect, useTypedNavigation } from '../../util/hooks';
import { removeFromArray } from '../../util/removeFromArray';

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
  useSubscriptionEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  useSubscriptionEffect(async () => {
    if (!userId || !cat) return;
    // get / set all contenders
    const { data: cs } = await ApiServices.getContendersByCategory(cat.id);
    // TODO (going to have this done in Contender): sort by highest global ranking

    // because we can't set this before the selected contenders are set, if there are any
    const executeBeforeReturn = () => {
      setContenders(cs);
    };

    // get list of categoryIds of user's personal selections
    const { data: pSet } = await ApiServices.getPredictionsSet({
      userId,
      categoryId,
      eventId: cat.event.id,
    });
    const pSetId = pSet?.getPredictionSet?.id;
    if (!pSetId) {
      executeBeforeReturn();
      return;
    } // means user just hasn't made predictions
    const { data } = await ApiServices.getPredictionsByPredictionSetId(pSetId);
    const predictions = data?.listPredictions;
    if (!predictions) {
      executeBeforeReturn();
      return;
    }
    const sortedContenderIds = (predictions?.items || [])
      .sort((a, b) => {
        if (!a || !b) return 0;
        return a.ranking > b.ranking ? 1 : -1;
      })
      .map((p) => p?.contenderPredictionsId || '');
    setInitiallySelectedContenderIds(sortedContenderIds);
    setSelectedContenderIds(sortedContenderIds);
    executeBeforeReturn();
  }, [cat]);

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
    const eventId = cat?.eventCategoriesId;
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

  const _contenders = contenders?.listContenders;

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
        const selected = selectedContenderIds.includes(contenderId);
        return (
          <ContenderListItem
            contenderId={contenderId}
            ranking={i + 1}
            categoryId={categoryId}
            onPressItem={onPressItem}
            onPressThumbnail={onPressThumbnail}
            selected={selected}
            size={PosterSize.SMALL}
            isSelectable
            disabled={loading}
          />
        );
      })}
      {_contenders && _contenders.items.length > 0 ? (
        <TouchableText text={'Save'} onPress={onSave} style={{ margin: 10 }} />
      ) : null}
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender', { categoryId });
        }}
        style={{ margin: 10 }}
      />
    </ScrollView>
  );
};

export default AddContenders;
