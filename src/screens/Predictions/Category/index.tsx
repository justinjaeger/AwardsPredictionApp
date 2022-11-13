import { useQuery } from '@tanstack/react-query';
import React, { useLayoutEffect } from 'react';
import { ScrollView, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { CategoryName } from '../../../API';
import { IconButtonOutlined } from '../../../components/Buttons/IconButton';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import MovieList from '../../../components/MovieList';
import { BodyLarge } from '../../../components/Text';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { PosterSize } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PredictionsParamList } from '../../../navigation/types';
import getCommunityPredictionsByCategory from '../../../services/queryFuncs/getCommunityPredictionsByCategory';
import getPersonalPredictionsByCategory from '../../../services/queryFuncs/getPersonalPredictionsByCategory';
import { iCategory, iEvent, iPrediction, QueryKeys } from '../../../store/types';
import { useTypedNavigation } from '../../../util/hooks';

type iCategoryProps = {
  personalPredictions: iPrediction[];
  communityPredictions: iPrediction[];
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressItem?: (prediction: iPrediction) => void;
};

type iContenderListProps = {
  tab: 'community' | 'personal';
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressItem?: (prediction: iPrediction) => void;
};

// NOTE: Has a lot in common with ContenderListDraggable
export const Category = (props: iContenderListProps) => {
  const { tab, isSelectable, onPressItem } = props;

  const { width } = useWindowDimensions();
  const { category: _category, displayContenderInfo, event: _event } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  // Set the header
  useLayoutEffect(() => {
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const headerTitle =
      'Best ' + awardsBodyCategories[CategoryName[category.name]]?.name || '';
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  const { data: predictions, isLoading } = useQuery({
    queryKey: [
      tab === 'community' ? QueryKeys.COMMUNITY_CATEGORY : QueryKeys.PERSONAL_CATEGORY,
    ],
    queryFn:
      tab === 'community'
        ? () => getCommunityPredictionsByCategory(category)
        : () => getPersonalPredictionsByCategory(category.id, userId),
  });

  if (isLoading || !predictions) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',

        paddingBottom: 100,
      }}
    >
      <TouchableHighlight
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <>
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
          <View
            style={{
              margin: theme.windowMargin,
              alignItems: 'flex-end',
            }}
          >
            {tab === 'personal' ? (
              <IconButtonOutlined
                onPress={() => {
                  navigation.navigate('PersonalPredictions');
                }}
                iconProps={{
                  name: 'edit-outline',
                }}
                styles={{ width: width / 5 - theme.posterMargin * 2 }}
              />
            ) : null}
          </View>
          <MovieList predictions={predictions} />
          {predictions.map((prediction, i) => (
            <ContenderListItem
              prediction={prediction}
              ranking={i + 1}
              onPressItem={(item) => {
                onPressItem && onPressItem(item);
              }}
              onPressThumbnail={displayContenderInfo}
              selected={false}
              isSelectable={isSelectable}
              posterWidth={(width - theme.windowMargin * 2 + theme.posterMargin) / 5}
            />
          ))}
        </>
      </TouchableHighlight>
    </ScrollView>
  );
};

const TabsWrapper = (props: iCategoryProps) => {
  const { isSelectable, onPressItem } = props;
  return PredictionTabsNavigator(
    <Category tab={'community'} isSelectable={isSelectable} onPressItem={onPressItem} />,
    <Category tab={'personal'} isSelectable={isSelectable} onPressItem={onPressItem} />,
  );
};

export default TabsWrapper;
