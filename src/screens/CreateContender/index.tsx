import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CreateContenderParamList } from '../../navigation/types';
import { getAwardsBodyCategories } from '../../constants/categories';
import CreateFilm from './CreateFilm';
import CreatePerformance from './CreatePerformance';
import CreateSong from './CreateSong';
import { useAsyncEffect, useTypedNavigation } from '../../util/hooks';
import { AwardsBody, CategoryType, GetCategoryQuery } from '../../API';
import ApiServices from '../../services/graphql';

export type iCreateContenderProps = {
  categoryId: string;
  categoryType: CategoryType;
  eventYear: number;
};

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { categoryId },
  } = useRoute<RouteProp<CreateContenderParamList, 'CreateContender'>>();
  const navigation = useTypedNavigation<CreateContenderParamList>();

  const [category, setCategory] = useState<GetCategoryQuery>();

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
    if (!e) return;
    const categoryList = getAwardsBodyCategories(AwardsBody[e.awardsBody], e.year);
    const headerTitle = `Add ${categoryList[cat.name]?.name || 'Contender'}`;
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const CreateComponent = (() => {
    if (!cat) return null;
    switch (CategoryType[cat.type]) {
      case CategoryType.FILM:
        return (
          <CreateFilm
            categoryId={cat.id}
            categoryType={cat.type}
            eventYear={cat.event.year}
          />
        );
      case CategoryType.PERFORMANCE:
        return (
          <CreatePerformance
            categoryId={cat.id}
            categoryType={cat.type}
            eventYear={cat.event.year}
          />
        );
      case CategoryType.SONG:
        return (
          <CreateSong
            categoryId={cat.id}
            categoryType={cat.type}
            eventYear={cat.event.year}
          />
        );
    }
  })();

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      {CreateComponent}
    </ScrollView>
  );
};

export default CreateContender;
