import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../../navigation/types';
import NumPredictingItem from '../../components/ContenderInfoModal/NumPredictingItem';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { CategoryName, Movie, iPrediction } from '../../types/api';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import { sortPredictions } from '../../util/sortPredictions';
import { FlatList, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import ContenderInfoHeader from '../../components/ContenderInfoHeader';
import { eventToString } from '../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../constants';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { truncateText } from '../../util/truncateText';
import { Header, SubHeader } from '../../components/Text';
import { getPredictedOutcomes } from '../../util/getPredictedOutcomes';

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
};

const ContenderStats = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderStats'>>();
  const { movieTmdbId, event } = route.params;
  const { store } = useTmdbDataStore();

  const { data: communityPredictions } = useQueryGetCommunityPredictions(event);

  // Set the header
  useLayoutEffect(() => {
    if (!event) return;
    // const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const eventName = eventToString(event.awardsBody, event.year);
    // const categoryName = awardsBodyCategories[category]?.name || '';
    const headerTitle =
      eventName + '\n' + truncateText((store[movieTmdbId] as Movie).title ?? '', 20);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  if (!communityPredictions) return null;

  const allPredictionsWithContender: iContenderStatsData[] = [];
  Object.entries(communityPredictions.categories).forEach(
    ([category, categoryPrediction]) => {
      const categoryPredictions = categoryPrediction.predictions;
      const predictions = categoryPredictions.filter(
        (p) => p.movieTmdbId === movieTmdbId,
      );
      const totalNumPredictingTop = getTotalNumPredicting(
        predictions[0]?.numPredicting ?? {},
      );
      const totalNumPredictingCategory =
        communityPredictions.categories[category as CategoryName].totalUsersPredicting ??
        totalNumPredictingTop;

      predictions.forEach((p) => {
        allPredictionsWithContender.push({
          ...p,
          category: category as CategoryName,
          totalNumPredictingTop,
          totalNumPredictingCategory,
        });
      });
    },
  );

  const { numNoms, numWins, numPoential, potentialPredictions } = getPredictedOutcomes(
    allPredictionsWithContender,
    event,
  );

  return (
    <BackgroundWrapper>
      <View style={{ flex: 1 }}>
        <FlatList
          data={sortPredictions(potentialPredictions) as iContenderStatsData[]}
          ListHeaderComponent={
            <>
              <ContenderInfoHeader
                prediction={{
                  contenderId: '',
                  ranking: 0,
                  movieTmdbId,
                }}
              />
              <View
                style={{
                  padding: 10,
                  paddingBottom: 20,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Header>{numWins.toString()}</Header>
                  <SubHeader>wins predicted</SubHeader>
                </View>
                <View>
                  <Header>{numNoms.toString()}</Header>
                  <SubHeader>noms predicted</SubHeader>
                </View>
                <View>
                  <Header>{numPoential.toString()}</Header>
                  <SubHeader>potential</SubHeader>
                </View>
              </View>
            </>
          }
          renderItem={({ item: prediction }) => (
            <View style={{ flex: 1, paddingBottom: 25 }}>
              <NumPredictingItem
                key={prediction.contenderId}
                prediction={prediction}
                event={event}
                category={prediction.category}
                totalNumPredictingTop={prediction.totalNumPredictingTop}
                totalNumPredictingCategory={prediction.totalNumPredictingCategory}
              />
            </View>
          )}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default ContenderStats;
