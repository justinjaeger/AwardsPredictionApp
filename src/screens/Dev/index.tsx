import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import { Body, SubHeader } from '../../components/Text';
import { User, Event, Category } from '../../models';
import { createMockEvents, deleteMockEvents } from '../../scripts/mocks/events';
import { deleteMockUsers, createMockUsers } from '../../scripts/mocks/users';
import TmdbMovieCache from '../../services/cache/tmdbMovie';
import TmdbPersonCache from '../../services/cache/tmdbPerson';
import ApiServices from '../../services/graphql';

const Dev = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // USERS
  useEffect(() => {
    ApiServices.getAllUsers().then(({ data: us }) => {
      if (us) {
        setUsers(us);
      }
    });
  }, []);

  // EVENTS
  useEffect(() => {
    ApiServices.getAllEvents().then(({ data: es }) => {
      if (es) {
        setEvents(es);
      }
    });
  }, []);

  // CATEGORIES
  useEffect(() => {
    ApiServices.getAllCategories().then(({ data: cs }) => {
      if (cs) {
        setCategories(cs);
      }
    });
  }, []);

  const clearAllCache = () => {
    TmdbMovieCache.clearAll();
    TmdbPersonCache.clearAll();
  };

  const sectionStyles: StyleProp<ViewStyle> = {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10,
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 200,
        }}
      >
        <TouchableText
          text={'Approve songs'}
          onPress={() => {
            navigation.navigate('ApproveSongs');
          }}
          style={{ marginTop: 10 }}
        />
        <TouchableText
          text={'Clear Cache'}
          onPress={clearAllCache}
          style={{ marginTop: 10 }}
        />
        <TouchableText
          text={'Manage Studios'}
          onPress={() => navigation.navigate('ManageStudios')}
          style={{ marginTop: 10 }}
        />
        <View style={{ ...sectionStyles }}>
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
        <View style={{ ...sectionStyles }}>
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
        <View style={{ ...sectionStyles }}>
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
