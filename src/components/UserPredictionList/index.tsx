import React from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import MovieGrid from '../../components/MovieGrid';
import { Body, Label, SubHeader } from '../../components/Text';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useEvent } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { PredictionsParamList } from '../../navigation/types';
import { formatLastUpdated } from '../../util/formatDateTime';
import { useTypedNavigation } from '../../util/hooks';
import { AwardsBody, CategoryName, iRecentPrediction } from '../../types/api';
import { useOpenEvents } from '../../context/OpenEventsProvider';

const UserPredictionList = ({
  predictionSets,
  userId,
}: {
  predictionSets: iRecentPrediction[];
  fixedSlots?: number;
  userId: string;
}) => {
  const { userId: authUserId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { getEvent } = useOpenEvents();
  const { setEvent, setCategory } = useEvent();
  const { width } = useWindowDimensions();
  const isAuthUserProfile = userId === authUserId;

  return (
    <>
      {predictionSets.map((ps) => {
        if (!ps) return null;
        const awardsBodyName = AWARDS_BODY_TO_PLURAL_STRING[ps.awardsBody as AwardsBody];
        const lastUpdatedText = formatLastUpdated(new Date(ps.createdAt));
        return (
          <TouchableHighlight
            key={ps.awardsBody + ps.year + ps.category}
            style={{
              width,
              alignItems: 'flex-start',
            }}
            underlayColor={COLORS.secondaryDark}
            onPress={() => {
              const event = getEvent(ps.awardsBody as AwardsBody, ps.year);
              if (!event) {
                console.error('could not find event in open events context');
                return;
              }
              // navigate to user's predictions
              setEvent(event);
              setCategory(ps.category as CategoryName);
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
                  <SubHeader style={{ color: COLORS.lightest }}>{ps.category}</SubHeader>
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

export default UserPredictionList;
