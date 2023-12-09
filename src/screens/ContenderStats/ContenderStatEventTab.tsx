import React, { useEffect, useState } from 'react';
import ItemStatBox from '../../components/ItemStatBox.tsx';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { CategoryName, EventModel, WithId, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import { sortByLikelihood } from '../../util/sortPredictions';
import { ScrollView, View, useWindowDimensions } from 'react-native';
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

// TODO: When there are multiple categories here, make it so
// it doesn't fetch the data until you tap the tab - else this could be overwhelming
const ContenderStatEventTab = ({
  event,
  movieTmdbId,
  ref,
}: {
  event: WithId<EventModel>;
  movieTmdbId: number;
  ref: React.RefObject<ScrollView>;
}) => {
  //   const ref = React.useRef<FlatList<iContenderStatsData>>(null);

  const { isPad } = useDevice();
  const { width } = useWindowDimensions();

  const { data: communityPredictions } = useQueryGetCommunityPredictions(event);

  const [sortSetting, setSortSetting] = useState<'likelihood' | 'cat-order'>(
    'likelihood',
  );

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
  }, [!!communityPredictions]);

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;

  const data = sortSetting === 'cat-order' ? dataInCategoryOrder : dataInLikelihoodOrder;

  return (
    <View style={{ flex: 1 }}>
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
      {data.map((prediction) => (
        <View style={{ flex: 1, paddingBottom: 25 }}>
          <ItemStatBox
            key={prediction.contenderId}
            prediction={prediction}
            event={event}
            category={prediction.category}
            totalNumPredictingTop={prediction.totalNumPredictingTop}
            totalNumPredictingCategory={prediction.totalNumPredictingCategory}
            widthFactor={widthFactor}
            scrollRef={ref}
          />
        </View>
      ))}
    </View>
  );
};

export default ContenderStatEventTab;
