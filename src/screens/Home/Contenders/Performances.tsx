import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { iContendersProps } from '.';
import { TouchableText } from '../../../components/Buttons';
import ContenderList from '../../../components/List/ContenderList';
import { CategoryType, Contender } from '../../../models';
import DS from '../../../services/datastore';
import { useSubscriptionEffect } from '../../../util/hooks';

// TODO: no list order yet. eventually have to define something
const Performances = (props: iContendersProps) => {
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
        onPressItem={async (contender: Contender) => {
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

export default Performances;
