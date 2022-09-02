import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import ContenderList from '../../../components/List/ContenderList';
import { getCategoryList } from '../../../constants/categories';
import { Contender } from '../../../models';
import { HomeParamList } from '../../../navigation/types';
import { useSubscriptionEffect } from '../../../util/hooks';
import { eventToString } from '../../../util/stringConversions';

// TODO: no list order yet. eventually have to define something
const Contenders = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<HomeParamList, 'Contenders'>>();
  const navigation = useNavigation();

  const [contenders, setContenders] = useState<Contender[]>([]);

  // Set header title
  useLayoutEffect(() => {
    const categoryList = getCategoryList(category.event);
    navigation.setOptions({
      headerTitle:
        'Best' + ' ' + categoryList[category.name] + ' ' + eventToString(category.event),
    });
  }, [navigation, category.name, category.event]);

  useSubscriptionEffect(async () => {
    const _contenders = (await DataStore.query(Contender)).filter(
      (c) => c.category?.id === category.id,
    );
    setContenders(_contenders);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <ContenderList
        contenders={contenders}
        onPressItem={(contender: Contender) => {
          navigation.navigate('ContenderDetails', { contender });
        }}
      />
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

export default Contenders;
