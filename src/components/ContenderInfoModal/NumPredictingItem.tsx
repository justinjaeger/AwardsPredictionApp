import React from 'react';
import { View } from 'react-native';
import { Header, SubHeader, SubHeaderLight } from '../Text';
import { CategoryName, EventModel, Phase, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import Histogram from '../Histogram';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../util/categoryNameToTmdbCredit';
import { getPhaseUserIsPredicting } from '../../util/getPhaseUserIsPredicting';
import { formatPercentage } from '../../util/formatPercentage';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const NumPredictingItem = ({
  category,
  event,
  prediction,
  totalNumPredictingTop,
}: {
  category: CategoryName;
  event: EventModel;
  totalNumPredictingTop: number;
  prediction: iPrediction;
}) => {
  const numPredicting = prediction?.numPredicting;
  console.log('numPredicting', numPredicting);
  const totalNumPredicting = getTotalNumPredicting(numPredicting || {});
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { slots, shortlistDateTime } = event.categories[category];
  const categoryString = event.categories[category].name;

  const catCredits = getTmdbDataFromPrediction(prediction)?.movie.categoryCredits;
  const performerName = getTmdbDataFromPrediction(prediction)?.person?.name;
  const credit = catCredits && categoryNameToTmdbCredit(category, catCredits);
  const creditString = performerName ?? (credit ? credit.join(', ') : undefined);

  const phaseUserIsPredicting = getPhaseUserIsPredicting(event, shortlistDateTime);
  const { win, nom, listed } = getNumPredicting(
    prediction?.numPredicting ?? {},
    slots ?? 5,
  );

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: hexToRgb(COLORS.white, 0.3),
        paddingBottom: 10,
        paddingTop: 5,
        borderRadius: theme.borderRadius,
      }}
    >
      <View
        style={{
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        <Header>{`#${prediction?.ranking}`}</Header>
        <SubHeader style={{ marginLeft: 10 }}>{categoryString}</SubHeader>
      </View>
      {creditString ? (
        <SubHeader style={{ marginLeft: 10 }}>{creditString}</SubHeader>
      ) : null}
      {numPredicting ? (
        <Histogram
          totalNumPredicting={totalNumPredicting}
          totalNumPredictingTop={totalNumPredictingTop}
          numPredicting={numPredicting}
          slots={slots}
          enableHoverInfo
        />
      ) : null}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 30,
        }}
      >
        {/* undefined means nothing has happened; NOMINATION means it's been shortlisted */}
        {phaseUserIsPredicting === undefined ? (
          <View style={{ alignItems: 'center', width: '33%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Header>{listed.toString()}</Header>
              <SubHeaderLight style={{ marginLeft: 5 }}>{'list'}</SubHeaderLight>
            </View>
            <SubHeader>{`${formatPercentage(listed / totalNumPredicting)}`}</SubHeader>
          </View>
        ) : null}
        {[undefined, Phase.NOMINATION].includes(phaseUserIsPredicting) ? (
          <View style={{ alignItems: 'center', width: '33%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Header>{nom.toString()}</Header>
              <SubHeaderLight style={{ marginLeft: 5 }}>{'nom'}</SubHeaderLight>
            </View>
            <SubHeader>{`${formatPercentage(nom / totalNumPredicting)}`}</SubHeader>
          </View>
        ) : null}
        <View style={{ alignItems: 'center', width: '33%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Header>{win.toString()}</Header>
            <SubHeaderLight style={{ marginLeft: 5 }}>{'win'}</SubHeaderLight>
          </View>
          <SubHeader>{`${formatPercentage(win / totalNumPredicting)}`}</SubHeader>
        </View>
      </View>
    </View>
  );
};

export default NumPredictingItem;
