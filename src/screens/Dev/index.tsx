import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import { Body, Header, SubHeader } from '../../components/Text';
import { User } from '../../models';
import { deleteMockUsers, createMockUsers } from '../../scripts/mocks/users';

const Dev = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(User).subscribe(({ items }) => {
      setUsers(items);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
        <Header>Dev Console</Header>
        <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }}>
          <SubHeader>USERS:</SubHeader>
        </View>
        <TouchableText
          text={'Create mock users'}
          onPress={createMockUsers}
          style={{ marginTop: 10 }}
        />
        <TouchableText
          text={'Delete mock users'}
          onPress={deleteMockUsers}
          style={{ marginTop: 10 }}
        />
        <TouchableText
          text={'Clear DataStore Locally'}
          onPress={deleteMockUsers}
          style={{ marginTop: 10 }}
        />
        <Body>{JSON.stringify(users)}</Body>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dev;
