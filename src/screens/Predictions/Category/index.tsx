import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { CategoryName } from '../../../API';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { IconButtonOutlined } from '../../../components/Buttons/IconButton';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import MovieList from '../../../components/MovieList';
import { BodyLarge } from '../../../components/Text';
import { getAwardsBodyCategories } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PredictionsParamList } from '../../../navigation/types';
import getCommunityPredictionsByEvent from '../../../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../../../services/queryFuncs/getPersonalPredictionsByEvent';
import { iCategory, iEvent, QueryKeys } from '../../../store/types';
import { useTypedNavigation } from '../../../util/hooks';

type iContenderListProps = {
  tab: 'community' | 'personal';
};

const HeaderButton = (props: { icon: string; onPress: () => void }) => {
  const { icon, onPress } = props;
  return (
    <IconButtonOutlined
      onPress={onPress}
      iconProps={{
        name: icon,
      }}
      styles={{
        width: 40,
        height: 40,
        marginRight: theme.posterMargin,
        marginLeft: theme.posterMargin,
      }}
    />
  );
};

const TIMING = 250;

// NOTE: Has a lot in common with ContenderListDraggable
export const Category = (props: iContenderListProps) => {
  const { tab } = props;

  const gridOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  const { category: _category, displayContenderInfo, event: _event } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  const [display, setDisplay] = useState<'list' | 'grid'>('list');
  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>();

  const toggleDisplay = () => {
    if (display === 'list') setDisplay('grid');
    if (display === 'grid') setDisplay('list');
  };

  // Set the header
  useLayoutEffect(() => {
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const headerTitle =
      'Best ' + awardsBodyCategories[CategoryName[category.name]]?.name || '';
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: predictionData, isLoading } = useQuery({
    queryKey: [
      tab === 'community' ? QueryKeys.COMMUNITY_EVENT : QueryKeys.PERSONAL_EVENT,
    ],
    queryFn:
      tab === 'community'
        ? () => getCommunityPredictionsByEvent(event)
        : () => getPersonalPredictionsByEvent(event.id, userId || ''),
  });
  const predictions = (predictionData || {})[category.id];

  useEffect(() => {
    if (display === 'grid') {
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(gridOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
      }, TIMING);
    }
    if (display === 'list') {
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
      }, TIMING);
    }
  }, [display]);

  if (isLoading || !predictions) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        >
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: theme.windowMargin,
                backgroundColor: COLORS.primary,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <HeaderButton
                  onPress={() => {
                    toggleDisplay();
                  }}
                  icon={display === 'grid' ? 'list' : display === 'list' ? 'grid' : ''}
                />
                {tab === 'personal' ? (
                  <HeaderButton
                    onPress={() => {
                      navigation.navigate('PersonalPredictions');
                    }}
                    icon={'edit-outline'}
                  />
                ) : null}
              </View>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  width: 120,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: listOpacity,
                }}
              >
                <View>
                  <BodyLarge style={{ textAlign: 'right' }}>Predict</BodyLarge>
                  <BodyLarge style={{ textAlign: 'right' }}>Nom</BodyLarge>
                </View>
                <View>
                  <BodyLarge style={{ textAlign: 'right' }}>Predict</BodyLarge>
                  <BodyLarge style={{ textAlign: 'right' }}>Win</BodyLarge>
                </View>
              </Animated.View>
            </View>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 100,
                marginTop: theme.windowMargin,
              }}
            >
              <Animated.View style={{ opacity: gridOpacity, position: 'absolute' }}>
                <MovieList predictions={predictions} />
              </Animated.View>
              <Animated.View style={{ opacity: listOpacity }}>
                {predictions.map((prediction, i) => (
                  <ContenderListItem
                    prediction={prediction}
                    ranking={i + 1}
                    selected={selectedContenderId === prediction.contenderId}
                    toggleSelected={(id: string) => {
                      if (selectedContenderId === id) {
                        setSelectedContenderId(undefined);
                      } else {
                        setSelectedContenderId(id);
                      }
                    }}
                    onPressItem={(item) => {
                      setSelectedContenderId(item.contenderId);
                    }}
                    onPressThumbnail={displayContenderInfo}
                  />
                ))}
              </Animated.View>
            </ScrollView>
            {predictions && predictions.length === 0 ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BodyLarge>No films in this list</BodyLarge>
              </View>
            ) : null}
          </>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(
    <Category tab={'community'} />,
    <Category tab={'personal'} />,
  );
};

export default TabsWrapper;
