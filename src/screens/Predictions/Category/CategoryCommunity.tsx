import React from 'react';
import { Animated, View } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import HeaderButton from '../../../components/HeaderButton';
import MovieGrid from '../../../components/MovieGrid';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import { useDisplay } from '../../../hooks/animatedState/useDisplay';
import useQueryCommunityOrPersonalEvent from '../../../hooks/queries/getCommunityOrPersonalEvent';
import { iCategory, iEvent } from '../../../types';
import { CategoryHeader } from '../styles';

const CategoryCommunity = () => {
  const {
    display,
    delayedDisplay,
    toggleDisplay,
    gridOpacity,
    listOpacity,
  } = useDisplay();
  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    toggleCollapsed,
  } = useCollapsible();

  const { category: _category, event: _event } = useCategory();
  const { userId } = useAuth();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const {
    data: predictionData,
    isLoading,
  } = useQueryCommunityOrPersonalEvent('community', !!userId, { event });
  const predictions = predictionData ? predictionData[category.id] || [] : [];

  if (isLoading || !predictions) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <>
        <CategoryHeader>
          <View style={{ flexDirection: 'row' }}>
            <HeaderButton
              onPress={() => {
                toggleDisplay();
              }}
              icon={display === 'grid' ? 'list' : 'grid'}
            />
            <Animated.View style={{ opacity: listOpacity }}>
              <HeaderButton
                onPress={toggleCollapsed}
                icon={isCollapsed ? 'collapse' : 'expand'}
              />
            </Animated.View>
          </View>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: 120,
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: listOpacity,
              display: delayedDisplay === 'list' ? 'flex' : 'none',
            }}
          >
            <View>
              <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
              <BodyBold style={{ textAlign: 'right' }}>Nom</BodyBold>
            </View>
            <View>
              <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
              <BodyBold style={{ textAlign: 'right' }}>Win</BodyBold>
            </View>
          </Animated.View>
        </CategoryHeader>
        {predictions && predictions.length === 0 ? (
          <View
            style={{
              width: '100%',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BodyBold>No films in this category</BodyBold>
          </View>
        ) : null}
        <Animated.ScrollView
          style={{
            display: delayedDisplay === 'grid' ? 'flex' : 'none',
            opacity: gridOpacity,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            marginTop: theme.windowMargin,
          }}
        >
          <Animated.View style={{ opacity: gridOpacity }}>
            <MovieGrid predictions={predictions} />
          </Animated.View>
        </Animated.ScrollView>
        <Animated.View
          style={{
            opacity: listOpacity,
            display: delayedDisplay === 'list' ? 'flex' : 'none',
          }}
        >
          <Animated.View
            style={{
              display: !isCollapsed ? 'flex' : 'none',
              opacity: expandedOpacity,
              width: '100%',
            }}
          >
            <MovieListCommunity predictions={predictions} />
          </Animated.View>
          <Animated.View
            style={{
              display: isCollapsed ? 'flex' : 'none',
              opacity: collapsedOpacity,
            }}
          >
            <MovieListCommunity predictions={predictions} isCollapsed />
          </Animated.View>
        </Animated.View>
      </>
    </BackgroundWrapper>
  );
};

export default CategoryCommunity;
