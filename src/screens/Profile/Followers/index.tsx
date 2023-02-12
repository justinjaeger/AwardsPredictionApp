import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getHeaderTitle } from '../../../constants';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryGetUser from '../../../hooks/queries/getUser';
import { useTypedNavigation } from '../../../util/hooks';
import { ProfileParamList } from '../../../navigation/types';

const Followers = () => {
  const navigation = useTypedNavigation<ProfileParamList>();
  const {
    params: { userId, type },
  } = useRoute<RouteProp<ProfileParamList, 'Followers'>>();

  console.error('type', type);
  console.error('userId', userId);

  const { data: user } = useQueryGetUser(userId);
  const usernameBeforeEdit = user?.username || '';

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: getHeaderTitle(type === 'followers' ? 'Followers' : 'Following'),
    });
  }, [usernameBeforeEdit, navigation]);

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}
      >
        <></>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Followers;
