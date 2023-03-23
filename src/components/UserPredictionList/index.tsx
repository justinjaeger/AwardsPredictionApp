import React from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { PredictionType } from '../../API';
import MovieGrid from '../../components/MovieGrid';
import { Body, Label, SubHeader } from '../../components/Text';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import { getAwardsBodyCategories, getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/UserContext';
import { PredictionsParamList } from '../../navigation/types';
import { iPredictionSet } from '../../types';
import { formatLastUpdated } from '../../util/formatDateTime';
import { useTypedNavigation } from '../../util/hooks';

const ProfilePredictionsList = ({
  predictionSets,
  fixedSlots,
  userId,
}: {
  predictionSets: iPredictionSet[];
  fixedSlots?: number;
  userId: string;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { setEvent, setCategory } = useCategory();
  const { width } = useWindowDimensions();
  const isAuthUserProfile = userId === authUserId;
  return (
    <>
      {predictionSets.map((ps) => {
        if (!ps) return null;
        const awardsBodyCategories = getAwardsBodyCategories(
          ps.event.awardsBody,
          ps.event.year,
        );
        const predictions = ps.predictions;
        const predictionType =
          predictions[0]?.predictionType || PredictionType.NOMINATION;
        const slots = getCategorySlots(ps.event, ps.category.name, predictionType);
        const slotsToUse = slots !== 1 ? slots : 5; // slots is "1" when predictions have happened, so if predictions have happened, so for winner predictions let's just show top 5
        const truncatedPredictions = predictions.slice(0, fixedSlots || slotsToUse);
        const eventName = AWARDS_BODY_TO_PLURAL_STRING[ps.event.awardsBody];
        const categoryName = awardsBodyCategories[ps.category.name]?.name || '';
        const lastUpdatedText = formatLastUpdated(new Date(ps.createdAt));
        return (
          <TouchableHighlight
            key={ps.id}
            style={{
              width,
              alignItems: 'flex-start',
            }}
            underlayColor={COLORS.secondaryDark}
            onPress={() => {
              // navigate to user's predictions
              setEvent(ps.event);
              setCategory(ps.category);
              if (isAuthUserProfile) {
                navigation.navigate('Category', {
                  userId,
                  showEventLink: true,
                });
              } else {
                navigation.navigate('CategoryFromProfile', {
                  userId,
                  showEventLink: true,
                });
              }
            }}
          >
            <>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingLeft: theme.windowMargin,
                  paddingRight: theme.windowMargin,
                  marginBottom: 10,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <SubHeader style={{ color: COLORS.lightest }}>{categoryName}</SubHeader>
                  <Body style={{ color: COLORS.lightest }}>{'  |  ' + eventName}</Body>
                </View>
                <Label style={{ marginTop: 5 }}>
                  {'Updated' + ': ' + lastUpdatedText}
                </Label>
              </View>
              <MovieGrid
                predictions={truncatedPredictions}
                isCollapsed={false} // TODO
                noLine
                style={{ marginBottom: 0 }}
              />
            </>
          </TouchableHighlight>
        );
      })}
    </>
  );
};

export default ProfilePredictionsList;
