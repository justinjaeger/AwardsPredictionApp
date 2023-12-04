import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../../navigation/types';
import ItemStatBox from '../../components/ItemStatBox.tsx';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { CategoryName, Movie, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import { sortByLikelihood } from '../../util/sortPredictions';
import { FlatList, View, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import ContenderInfoHeader from '../../components/ContenderInfoHeader';
import { eventToString } from '../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../constants';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { truncateText } from '../../util/truncateText';
import { Header, SubHeader } from '../../components/Text';
import PredictionTab from '../../navigation/PredictionTabsNavigator/PredictionTab';
import { getPredictedOutcomes } from '../../util/getPredictedOutcomes';
import useDevice from '../../util/device';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { ORDERED_CATEGORIES } from '../../constants/categories';

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  likelihood: number;
};

const ContenderStats = () => {
  const { isPad } = useDevice();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderStats'>>();
  const { movieTmdbId, event } = route.params;
  const { store } = useTmdbDataStore();
  const { width } = useWindowDimensions();
  const ref = React.useRef<FlatList<iContenderStatsData>>(null);

  const { data: communityPredictions } = useQueryGetCommunityPredictions(event);

  // Set the header
  useLayoutEffect(() => {
    if (!event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    // const categoryName = awardsBodyCategories[category]?.name || '';
    const headerTitle =
      eventName + '\n' + truncateText((store[movieTmdbId] as Movie).title ?? '', 20);
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  const [sortSetting, setSortSetting] = useState<'likelihood' | 'cat-order'>(
    'likelihood',
  );

  const [isScrolling, setIsScrolling] = useState(false);

  const [dataInCategoryOrder, setDataInCategoryOrder] = useState<iContenderStatsData[]>(
    [],
  );
  const [dataInLikelihoodOrder, setDataInLikelihoodOrder] = useState<
    iContenderStatsData[]
  >([]);
  const [potential, setPotential] = useState<
    | {
        noms: number;
        wins: number;
        potential: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (!communityPredictions) return;
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
          communityPredictions.categories[category as CategoryName]
            .totalUsersPredicting ?? totalNumPredictingTop;

        predictions.forEach((p) => {
          const { slots } = event.categories[category as CategoryName];
          const { win, nom, listed } = getNumPredicting(
            p?.numPredicting ?? {},
            slots ?? 5,
          );

          const likelihood =
            listed / totalNumPredictingCategory +
            nom / totalNumPredictingCategory +
            win / totalNumPredictingCategory;

          allPredictionsWithContender.push({
            ...p,
            category: category as CategoryName,
            totalNumPredictingTop,
            totalNumPredictingCategory,
            likelihood,
          });
        });
      },
    );
    const { numNoms, numWins, numPoential, allSignificantPredictions } =
      getPredictedOutcomes(allPredictionsWithContender, event);
    setPotential({
      noms: numNoms,
      wins: numWins,
      potential: numPoential,
    });

    const sortedByCategoryOrder = ORDERED_CATEGORIES.reduce(
      (acc: iContenderStatsData[], catName) => {
        const predictions = allSignificantPredictions.filter(
          (p) => p.category === catName,
        );
        return [...acc, ...predictions];
      },
      [],
    );
    setDataInCategoryOrder(sortedByCategoryOrder);
    setDataInLikelihoodOrder(sortByLikelihood(allSignificantPredictions));
  }, []);

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;

  return (
    <BackgroundWrapper>
      <View style={{ flex: 1 }}>
        <FlatList
          data={sortSetting === 'cat-order' ? dataInCategoryOrder : dataInLikelihoodOrder}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={() => setIsScrolling(true)}
          onMomentumScrollEnd={() => setIsScrolling(false)}
          ref={ref}
          ListHeaderComponent={
            <>
              <ContenderInfoHeader
                prediction={{
                  contenderId: '',
                  ranking: 0,
                  movieTmdbId,
                }}
              />
              {potential ? (
                <View
                  style={{
                    padding: isPad ? 40 : 10,
                    paddingBottom: isPad ? 40 : 20,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Header>{potential.wins.toString()}</Header>
                    <SubHeader>wins predicted</SubHeader>
                  </View>
                  <View>
                    <Header>{potential.noms.toString()}</Header>
                    <SubHeader>noms predicted</SubHeader>
                  </View>
                  <View>
                    <Header>{potential.potential.toString()}</Header>
                    <SubHeader>potential</SubHeader>
                  </View>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: width * widthFactor,
                  marginBottom: 25,
                  borderRadius: 0,
                  borderColor: COLORS.primaryLight,
                  borderWidth: 1,
                }}
              >
                <PredictionTab
                  text="Likelihood"
                  selected={sortSetting === 'likelihood'}
                  onPress={() => setSortSetting('likelihood')}
                />
                <View style={{ width: 1, backgroundColor: COLORS.primaryLight }} />
                <PredictionTab
                  text="Category Order"
                  selected={sortSetting === 'cat-order'}
                  onPress={() => setSortSetting('cat-order')}
                />
              </View>
            </>
          }
          keyExtractor={(item) => item.category + item.songId + item.personTmdbId}
          renderItem={({ item: prediction }) => (
            <View style={{ flex: 1, paddingBottom: 25 }}>
              <ItemStatBox
                key={prediction.contenderId}
                prediction={prediction}
                event={event}
                category={prediction.category}
                totalNumPredictingTop={prediction.totalNumPredictingTop}
                totalNumPredictingCategory={prediction.totalNumPredictingCategory}
                widthFactor={widthFactor}
                disableHistogramTouch={isScrolling}
                flatListRef={ref}
              />
            </View>
          )}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default ContenderStats;
