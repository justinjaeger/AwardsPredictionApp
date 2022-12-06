import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { ListCategoriesQuery, ListEventsQuery, ListUsersQuery } from '../../API';
import { TouchableText } from '../../components/Buttons';
import { Body, SubHeader } from '../../components/Text';
import COLORS from '../../constants/colors';
import { createMockEvents, deleteMockEvents } from '../../scripts/mocks/events';
import { deleteMockUsers, createMockUsers } from '../../scripts/mocks/users';
import TmdbMovieCache from '../../services/cache/tmdbMovie';
import TmdbPersonCache from '../../services/cache/tmdbPerson';
import ApiServices from '../../services/graphql';
import { useSubscriptionEffect } from '../../util/hooks';

const Dev = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState<ListUsersQuery>();
  const [events, setEvents] = useState<ListEventsQuery>();
  const [categories, setCategories] = useState<ListCategoriesQuery>();

  // USERS
  useSubscriptionEffect(async () => {
    const { data: us } = await ApiServices.getAllUsers();
    if (us) {
      setUsers(us);
    }
  }, []);

  // EVENTS
  useSubscriptionEffect(async () => {
    const { data: es } = await ApiServices.getAllEvents();
    if (es) {
      setEvents(es);
    }
  }, []);

  // CATEGORIES
  useSubscriptionEffect(async () => {
    const { data: cs } = await ApiServices.getAllCategories();
    if (cs) {
      setCategories(cs);
    }
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
    <SafeAreaView style={{ height: '100%', backgroundColor: COLORS.primary }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 200,
        }}
      >
        <TouchableText
          text={'Manage Studios'}
          onPress={() => navigation.navigate('ManageStudios')}
          style={{ marginTop: 30 }}
        />
        <TouchableText
          text={'Clear Cache'}
          onPress={clearAllCache}
          style={{ marginTop: 30 }}
        />
        <View style={{ ...sectionStyles, marginTop: 30 }}>
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
        {users?.listUsers?.items.map((u) => (
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
          onPress={() => {
            deleteMockEvents();
          }}
          style={{ marginTop: 10 }}
        />
        {events?.listEvents?.items.map((e) => (
          <View style={{ margin: 5 }}>
            <Body>{JSON.stringify(e)}</Body>
          </View>
        ))}
        <View style={{ ...sectionStyles }}>
          <SubHeader>CATEGORIES:</SubHeader>
        </View>
        {categories?.listCategories?.items.map((c) => (
          <View style={{ margin: 5 }}>
            <Body>{JSON.stringify(c)}</Body>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dev;
