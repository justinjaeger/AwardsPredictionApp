import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { iContendersProps } from '.';
import { TouchableText } from '../../../components/Buttons';
import ContenderList from '../../../components/List/ContenderList';
import { CategoryType, Contender } from '../../../models';
import { useSubscriptionEffect } from '../../../util/hooks';

// TODO: no list order yet. eventually have to define something
const Films = (props: iContendersProps) => {
  const { category } = props;

  const navigation = useNavigation();

  const [contenders, setContenders] = useState<Contender[]>([]);

  useSubscriptionEffect(async () => {
    const _contenders = (await DataStore.query(Contender)).filter(
      (c) => c.category?.id === category.id,
    );
    setContenders(_contenders);
  }, []);

  return (
    <>
      <ContenderList
        categoryType={CategoryType[category.type]}
        contenders={contenders}
        onPressItem={(contender: Contender) => {
          navigation.navigate('ContenderDetails', {
            contender,
            categoryType: category.type,
          });
        }}
      />
      <TouchableText
        text={'Submit a contender'}
        onPress={() => {
          navigation.navigate('CreateContender', { category });
        }}
        style={{ margin: 10 }}
      />
    </>
  );
};

export default Films;
