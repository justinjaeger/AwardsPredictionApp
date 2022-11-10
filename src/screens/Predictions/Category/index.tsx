import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import { BodyLarge } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PredictionsParamList } from '../../../navigation/types';
import getCommunityPredictionsByCategory from '../../../services/queryFuncs/getCommunityPredictionsByCategory';
import getPersonalPredictionsByCategory from '../../../services/queryFuncs/getPersonalPredictionsByCategory';
import { iCategory, iPrediction, QueryKeys } from '../../../store/types';
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

  const { category: _category, displayContenderInfo } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const category = _category as iCategory;
  const userId = _userId as string;

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
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <TouchableHighlight
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundColor: COLORS.lightestGray,
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
          {tab === 'personal' ? (
            <>
              <TouchableText
                text={'Edit Predictions'}
                onPress={() => {
                  navigation.navigate('PersonalPredictions');
                }}
                style={{ margin: 10 }}
              />
            </>
          ) : null}
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
              size={PosterSize.MEDIUM}
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
