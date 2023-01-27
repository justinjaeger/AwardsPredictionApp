import { Divider } from '@ui-kitten/components';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { PredictionType } from '../../API';
import MovieGrid from '../../components/MovieGrid';
import { Body, SubHeader } from '../../components/Text';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../constants/awardsBodies';
import { getAwardsBodyCategories, getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { iPredictionSet } from '../../types';
import { formatLastUpdated } from '../../util/formatDateTime';

const ProfilePredictionsList = ({
  predictionSets,
}: {
  predictionSets: iPredictionSet[];
}) => {
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
        const truncatedPredictions = predictions.slice(0, slotsToUse);
        const eventName = AWARDS_BODY_TO_PLURAL_STRING[ps.event.awardsBody];
        const categoryName = awardsBodyCategories[ps.category.name]?.name || '';
        const lastUpdatedText = formatLastUpdated(new Date(ps.createdAt));
        return (
          <>
            <TouchableHighlight
              key={ps.id}
              style={{
                width: '100%',
                alignItems: 'flex-start',
              }}
              underlayColor={COLORS.secondaryDark}
              onPress={() => {}}
            >
              <View>
                <View style={{ marginLeft: theme.windowMargin }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <SubHeader
                      style={{
                        color: COLORS.lightest,
                      }}
                    >
                      {categoryName}
                    </SubHeader>
                    <Body
                      style={{
                        color: COLORS.lightest,
                      }}
                    >
                      {' | ' + eventName}
                    </Body>
                  </View>
                  <Body
                    style={{
                      marginTop: theme.windowMargin / 4,
                      marginBottom: theme.windowMargin / 2,
                      fontSize: 12,
                    }}
                  >
                    {'Updated' + ': ' + lastUpdatedText}
                  </Body>
                </View>
                <MovieGrid
                  predictions={truncatedPredictions}
                  isCollapsed={false} // TODO
                  noLine
                />
              </View>
            </TouchableHighlight>
            <Divider
              style={{
                width: '95%',
                opacity: 0.5,
                marginTop: 20,
                marginBottom: 20,
              }}
            />
          </>
        );
      })}
    </>
  );
};

export default ProfilePredictionsList;
