import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, SubHeader, SubHeaderLight } from '../Text';
import { CategoryName, EventModel, Phase, WithId, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import Histogram from '../Histogram';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../util/categoryNameToTmdbCredit';
import { getPhaseUserIsPredicting } from '../../util/getPhaseUserIsPredicting';
import { formatPercentage } from '../../util/formatPercentage';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';

const NumPredictingItem = ({
  category,
  event,
  prediction,
  totalNumPredictingTop,
  totalNumPredictingCategory,
  disableCategoryLink,
}: {
  category: CategoryName;
  event: WithId<EventModel>;
  prediction: iPrediction;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  disableCategoryLink?: boolean;
}) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userId: authUserId } = useAuth();
  const { setCategory, setEvent } = useEvent();

  const numPredicting = prediction?.numPredicting;
  const totalNumPredicting = getTotalNumPredicting(numPredicting || {});
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { slots, shortlistDateTime } = event.categories[category];
  const categoryString = event.categories[category].name;

  const catCredits = getTmdbDataFromPrediction(prediction)?.movie.categoryCredits;
  const credit = catCredits && categoryNameToTmdbCredit(category, catCredits);
  const performerName = getTmdbDataFromPrediction(prediction)?.person?.name;
  const songName = getTmdbDataFromPrediction(prediction)?.song?.title;
  const creditString =
    songName ?? performerName ?? (credit ? credit.join(', ') : undefined);

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
      <TouchableOpacity
        style={{
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
        onPress={
          disableCategoryLink
            ? undefined
            : () => {
                setCategory(category);
                setEvent(event);
                navigation.dispatch(
                  StackActions.push('Category', {
                    userId: authUserId ?? undefined,
                  }),
                );
              }
        }
      >
        <>
          <Header>{`#${prediction?.ranking}`}</Header>
          <SubHeader style={{ marginLeft: 10 }}>{categoryString}</SubHeader>
        </>
      </TouchableOpacity>
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
            <SubHeader>{`${formatPercentage(
              listed / totalNumPredictingCategory,
            )}`}</SubHeader>
          </View>
        ) : null}
        {[undefined, Phase.NOMINATION].includes(phaseUserIsPredicting) ? (
          <View style={{ alignItems: 'center', width: '33%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Header>{nom.toString()}</Header>
              <SubHeaderLight style={{ marginLeft: 5 }}>{'nom'}</SubHeaderLight>
            </View>
            <SubHeader>{`${formatPercentage(
              nom / totalNumPredictingCategory,
            )}`}</SubHeader>
          </View>
        ) : null}
        <View style={{ alignItems: 'center', width: '33%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Header>{win.toString()}</Header>
            <SubHeaderLight style={{ marginLeft: 5 }}>{'win'}</SubHeaderLight>
          </View>
          <SubHeader>{`${formatPercentage(win / totalNumPredictingCategory)}`}</SubHeader>
        </View>
      </View>
    </View>
  );
};

export default NumPredictingItem;
