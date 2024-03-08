import React, { useEffect, useState } from 'react';
import ItemStatBox from '../../components/ItemStatBox/index';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { CategoryName, EventModel, WithId, iPrediction } from '../../models';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import { sortByLikelihood } from '../../util/sortPredictions';
import { ScrollView, View } from 'react-native';
import { getPredictedOutcomes } from '../../util/getPredictedOutcomes';
import useDevice from '../../util/device';
import theme from '../../constants/theme';
import { ORDERED_CATEGORIES } from '../../constants/categories';
import Stat from '../../components/ItemStatBox/Stat';
import SectionTopTabs from '../../components/SectionTopTabs';
import { useSharedValue } from 'react-native-reanimated';
import DualTabsWrapper from '../../components/DualTabsWrapper';

export type iContenderStatsData = iPrediction & {
  category: CategoryName;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  likelihood: number;
};

// TODO: When there are multiple categories here, make it so
// it doesn't fetch the data until you tap the tab - else this could be overwhelming
// TODO: make it so you can pass yyyymmdd into here
const ContenderStatEventTab = ({
  event,
  movieTmdbId,
  scrollRef,
}: {
  event: WithId<EventModel>;
  movieTmdbId: number;
  scrollRef: React.RefObject<ScrollView>;
}) => {
  const tabsPosX = useSharedValue(0);
  const { isPad } = useDevice();

  const { data: communityPredictions } = useQueryGetCommunityPredictions({ event });

  const [eventCorrespondingToData, setEventCorrespondingToData] =
    useState<WithId<EventModel>>(event);
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
        const categoryPredictions = categoryPrediction.predictions ?? [];
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
    setEventCorrespondingToData(event);
  }, [communityPredictions?._id]);

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;

  const longerDataSet =
    dataInCategoryOrder.length > dataInLikelihoodOrder.length
      ? dataInCategoryOrder
      : dataInLikelihoodOrder;
  const data = longerDataSet.map((_, i) => {
    return [dataInLikelihoodOrder[i], dataInCategoryOrder[i]];
  });

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
          <Stat number={`${potential.wins}`} text="wins predicted" />
          <Stat number={`${potential.noms}`} text="noms predicted" />
          <Stat number={`${potential.potential}`} text="potential" />
        </View>
      ) : null}
      <SectionTopTabs
        tabs={[{ title: 'Likelihood' }, { title: 'Category Order' }]}
        tabsPosX={tabsPosX}
      />
      {data.map(([tab1, tab2]) => (
        <DualTabsWrapper
          tabsPosX={tabsPosX}
          tab1={
            <View style={{ flex: 1 }}>
              <ItemStatBox
                key={tab1.contenderId}
                prediction={tab1}
                event={eventCorrespondingToData}
                category={tab1.category}
                totalNumPredictingTop={tab1.totalNumPredictingTop}
                totalNumPredictingCategory={tab1.totalNumPredictingCategory}
                widthFactor={widthFactor}
                scrollRef={scrollRef}
              />
            </View>
          }
          tab2={
            <View style={{ flex: 1 }}>
              <ItemStatBox
                key={tab2.contenderId}
                prediction={tab2}
                event={eventCorrespondingToData}
                category={tab2.category}
                totalNumPredictingTop={tab2.totalNumPredictingTop}
                totalNumPredictingCategory={tab2.totalNumPredictingCategory}
                widthFactor={widthFactor}
                scrollRef={scrollRef}
              />
            </View>
          }
        />
      ))}
    </View>
  );
};

export default ContenderStatEventTab;
