import React from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import MovieGrid from '../../components/MovieGrid';
import { Body, SubHeader } from '../../components/Text';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iUserInfo, PredictionsNavigationProp } from '../../navigation/types';
import { formatLastUpdated } from '../../util/formatDateTime';
import { AwardsBody, CategoryName, iRecentPrediction } from '../../models';
import useQueryGetAllEvents from '../../hooks/queries/useQueryGetAllEvents';
import { useNavigation } from '@react-navigation/native';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import { CAROUSEL_MARGIN } from '../PredictionCarousel';

const UserPredictionList = ({
  predictionSets,
  userInfo,
}: {
  predictionSets: iRecentPrediction[];
  userInfo: iUserInfo | undefined;
  fixedSlots?: number;
}) => {
  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { data: events } = useQueryGetAllEvents();
  const { width } = useWindowDimensions();

  return (
    <>
      {predictionSets.map((ps) => {
        if (!ps) return null;
        const awardsBodyName = AWARDS_BODY_TO_PLURAL_STRING[ps.awardsBody as AwardsBody];
        const lastUpdatedText = formatLastUpdated(new Date(ps.createdAt));
        const event = events?.find(
          (e) => e.awardsBody === ps.awardsBody && e.year === ps.year,
        );
        if (!event) return null;
        const categoryData = event?.categories[ps.category as CategoryName];
        return (
          <TouchableHighlight
            key={ps.category + lastUpdatedText}
            style={{
              width,
              alignItems: 'flex-start',
              paddingTop: CAROUSEL_MARGIN,
              paddingBottom: CAROUSEL_MARGIN,
            }}
            underlayColor={COLORS.secondaryDark}
            onPress={() => {
              if (!event) {
                console.error('could not find event');
                return;
              }
              setPersonalCommunityTab('personal');
              // navigate to user's predictions
              navigation.navigate('Category', {
                userInfo,
                eventId: event._id,
                category: ps.category as CategoryName,
                showEventLink: true,
              });
            }}
          >
            <>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: theme.windowMargin,
                  paddingRight: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}
                  >
                    <SubHeader style={{ color: COLORS.lightest }}>
                      {categoryData?.name ?? ''}
                    </SubHeader>
                    <Body style={{ color: COLORS.lightest }}>
                      {'  |  ' + event.year + ' ' + awardsBodyName}
                    </Body>
                  </View>
                  <Body style={{ marginTop: 5 }}>
                    {'Updated' + ': ' + lastUpdatedText}
                  </Body>
                </View>
              </View>
              <MovieGrid
                eventId={event?._id}
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
