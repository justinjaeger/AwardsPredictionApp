import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { Category, CategoryType } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import Films from './Films';
import Performances from './Performances';

export type iContendersProps = { category: Category };

// TODO: no list order yet. eventually have to define something
const Contenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<HomeParamList, 'Contenders'>>();
  const navigation = useNavigation();

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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {category.type === CategoryType.PERFORMANCE ? (
        <Performances category={category} />
      ) : (
        <Films category={category} />
      )}
    </ScrollView>
  );
};

export default Contenders;
