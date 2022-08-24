import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import { Body, Header, SubHeader } from '../../components/Text';
import { User, Event, Category } from '../../models';
import { createMockEvents, deleteMockEvents } from '../../scripts/mocks/events';
import { deleteMockUsers, createMockUsers } from '../../scripts/mocks/users';

const Dev = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // USERS
  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(User).subscribe(({ items }) => {
      setUsers(items);
    });
    return () => sub.unsubscribe();
  }, []);

  // EVENTS
  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(Event).subscribe(({ items }) => {
      setEvents(items);
    });
    return () => sub.unsubscribe();
  }, []);

  // CATEGORIES
  useEffect(() => {
    // later we'll just use userId to get the user whose profile it is, but I want all users for experiment
    const sub = DataStore.observeQuery(Category).subscribe(({ items }) => {
      setCategories(items);
    });
    return () => sub.unsubscribe();
  }, []);

  const clear = () => {
    DataStore.clear();
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 40,
          paddingBottom: 200,
        }}
      >
        <Header>Dev Console</Header>
        <TouchableText
          text={'Clear/Sync DataStore'}
          onPress={clear}
          style={{ marginTop: 10 }}
        />
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
        {users?.map((u) => (
          <View style={{ margin: 5 }}>
            <Body>{JSON.stringify(u)}</Body>
          </View>
        ))}
        <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }}>
          <SubHeader>EVENTS:</SubHeader>
        </View>
        <TouchableText
          text={'Create mock events'}
          onPress={createMockEvents}
          style={{ marginTop: 10 }}
        />
        <TouchableText
          text={'Delete mock events'}
          onPress={deleteMockEvents}
          style={{ marginTop: 10 }}
        />
        {events?.map((e) => (
          <View style={{ margin: 5 }}>
            <Body>{JSON.stringify(e)}</Body>
          </View>
        ))}
        <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 10 }}>
          <SubHeader>CATEGORIES:</SubHeader>
        </View>
        {categories?.map((c) => (
          <View style={{ margin: 5 }}>
            <Body>{JSON.stringify(c)}</Body>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dev;