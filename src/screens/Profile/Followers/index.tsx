import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getHeaderTitle } from '../../../constants';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useTypedNavigation } from '../../../util/hooks';
import { ProfileParamList } from '../../../navigation/types';
import {
  getPaginatedFollowers,
  getPaginatedFollowing,
} from '../../../services/queryFuncs/getPaginatedRelationships';
import { iUser } from '../../../types';
import { Body } from '../../../components/Text';

const Followers = () => {
  const navigation = useTypedNavigation<ProfileParamList>();
  const {
    params: { userId, type },
  } = useRoute<RouteProp<ProfileParamList, 'Followers'>>();

  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);

  const fetchPage = async () => {
    const Request = type === 'followers' ? getPaginatedFollowers : getPaginatedFollowing;
    const { users, nextToken } = await Request(userId, paginateToken);
    setUsers((prev) => [...prev, ...users]);
    setPaginateToken(nextToken);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  useLayoutEffect(() => {
    // Render Header
    navigation.setOptions({
      headerTitle: getHeaderTitle(type === 'followers' ? 'Followers' : 'Following'),
    });
  }, []);

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}
      >
        <Body>{JSON.stringify(users)}</Body>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Followers;
