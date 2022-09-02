import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { CreateContenderParamList } from '../../navigation/types';
import { Category, CategoryType } from '../../models';
import { getAwardsBodyCategories } from '../../constants/categories';
import CreateFilm from './CreateFilm';
import CreatePerson from './CreatePerson';

export type iCreateContenderProps = { category: Category };

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<CreateContenderParamList, 'CreateContender'>>();
  const navigation = useNavigation();

  // Set header title
  useLayoutEffect(() => {
    const categoryList = getAwardsBodyCategories(category.event);
    const headerTitle = `Add ${categoryList[category.name]?.name || 'Contender'}`;
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      {category.type === CategoryType.PERFORMANCE ? (
        <CreatePerson category={category} />
      ) : (
        <CreateFilm category={category} />
      )}
    </ScrollView>
  );
};

export default CreateContender;
