import React from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import MovieGrid from '../../components/MovieGrid';
import { Body, Label, SubHeader } from '../../components/Text';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { PredictionsParamList } from '../../navigation/types';
import { formatLastUpdated } from '../../util/formatDateTime';
import { useTypedNavigation } from '../../util/hooks';
import { AwardsBody, CategoryName, iRecentPrediction } from '../../types/api';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';

const UserPredictionList = ({
  predictionSets,
  userId,
  userImage,
}: {
  predictionSets: iRecentPrediction[];
  fixedSlots?: number;
  userId: string;
  userImage: string | undefined;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { data: events } = useQueryGetAllEvents();
  const { width } = useWindowDimensions();
  const isAuthProfile = userId === authUserId;

  return (
    <>
      {predictionSets.map((ps) => {
        if (!ps) return null;
        const awardsBodyName = AWARDS_BODY_TO_PLURAL_STRING[ps.awardsBody as AwardsBody];
        const lastUpdatedText = formatLastUpdated(new Date(ps.createdAt));
        const event = events?.find(
          (e) => e.awardsBody === ps.awardsBody && e.year === ps.year,
        );
        const categoryData = event?.categories[ps.category as CategoryName];
        return (
          <TouchableHighlight
            key={ps.category + lastUpdatedText}
            style={{
              width,
              alignItems: 'flex-start',
            }}
            underlayColor={COLORS.secondaryDark}
            onPress={() => {
              if (!event) {
                console.error('could not find event');
                return;
              }
              // navigate to user's predictions
              const params = {
                userId,
                userImage,
                eventId: event._id,
                category: ps.category as CategoryName,
                showEventLink: true,
              };
              if (isAuthProfile) {
                navigation.navigate('Category', params);
              } else {
                navigation.navigate('CategoryFromProfile', params);
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
                  <SubHeader style={{ color: COLORS.lightest }}>
                    {categoryData?.name ?? ''}
                  </SubHeader>
                  <Body style={{ color: COLORS.lightest }}>
                    {'  |  ' + awardsBodyName}
                  </Body>
                </View>
                <Label style={{ marginTop: 5 }}>
                  {'Updated' + ': ' + lastUpdatedText}
                </Label>
              </View>
              <MovieGrid
                predictions={ps.topPredictions}
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

export default UserPredictionList;
