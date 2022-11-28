import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableHighlight, View } from 'react-native';
import { CategoryName } from '../../../API';
import { getAwardsBodyCategories, getCategorySlots } from '../../../constants/categories';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../store/types';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { Body, SubHeader } from '../../../components/Text';
import { useAuth } from '../../../context/UserContext';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { eventToString } from '../../../util/stringConversions';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryCommunityOrPersonalEvent from '../../../hooks/getCommunityOrPersonalEvent';
import MovieGrid from '../../../components/MovieGrid';

const EventPredictions = (props: { tab: 'personal' | 'community' }) => {
  const { tab } = props;

  const { event: _event, setCategory } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const event = _event as iEvent;
  const userId = _userId as string;

  // define the header
  useLayoutEffect(() => {
    const headerTitle = eventToString(event.awardsBody, event.type, event.year);
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const { data: predictionData, isLoading } = useQueryCommunityOrPersonalEvent(
    tab,
    event,
    userId,
  );

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(bodyOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [isLoading]);

  if (!userId && tab === 'personal') {
    return <Body>You must sign in </Body>;
  }

  const onSelectCategory = async (category: iCategory) => {
    setCategory(category);
    navigation.navigate('Category');
  };

  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categoryList = Object.values(event.categories);
  const orderedCategories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  return (
    <BackgroundWrapper>
      <>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingOpacity,
          }}
        >
          <LoadingStatue />
        </Animated.View>
        <Animated.ScrollView
          style={{ opacity: bodyOpacity, width: '100%' }}
          contentContainerStyle={{
            alignItems: 'flex-start',
            paddingBottom: 100,
          }}
        >
          {orderedCategories.map((category) => {
            const catPredictions: iPrediction[] | undefined = (predictionData || {})[
              category.id
            ];
            const slots = getCategorySlots(event.year, event.awardsBody, category.name);
            const truncatedPredictions = (catPredictions || [])?.slice(0, slots);
            return (
              <TouchableHighlight
                key={category.id}
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                }}
                underlayColor={COLORS.secondaryDark}
                onPress={() => onSelectCategory(category)}
              >
                <View>
                  <SubHeader
                    style={{
                      color: COLORS.lightest,
                      marginLeft: theme.windowMargin,
                      marginBottom: theme.windowMargin,
                      marginTop: theme.windowMargin,
                    }}
                  >
                    {awardsBodyCategories[CategoryName[category.name]]?.name || ''}
                  </SubHeader>
                  <MovieGrid predictions={truncatedPredictions} noLine />
                </View>
              </TouchableHighlight>
            );
          })}
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(
    <EventPredictions tab={'community'} />,
    <EventPredictions tab={'personal'} />,
  );
};

export default TabsWrapper;
