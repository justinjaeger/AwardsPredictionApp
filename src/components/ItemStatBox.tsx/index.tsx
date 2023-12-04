import React from 'react';
import { FlatList, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Header, Label, SmallHeader, SubHeader, SubHeaderLight } from '../Text';
import { CategoryName, EventModel, Phase, WithId, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import Histogram from '../Histogram';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../util/categoryNameToTmdbCredit';
import { getPhaseUserIsPredicting } from '../../util/getPhaseUserIsPredicting';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import Stat from './Stat';

const NumPredictingItem = ({
  category,
  event,
  prediction,
  totalNumPredictingTop,
  totalNumPredictingCategory,
  disableCategoryLink,
  widthFactor,
  disableHistogramTouch,
  flatListRef,
}: {
  category: CategoryName;
  event: WithId<EventModel>;
  prediction: iPrediction;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  disableCategoryLink?: boolean;
  widthFactor?: number;
  disableHistogramTouch?: boolean;
  flatListRef?: React.RefObject<FlatList<any>>;
}) => {
  const { width } = useWindowDimensions();
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
        width: width * (widthFactor ?? 1),
        alignSelf: 'center',
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
          totalNumPredictingCategory={totalNumPredictingCategory}
          numPredicting={numPredicting}
          slots={slots}
          containerWidthFactor={widthFactor}
          enableHoverInfo
          disableHistogramTouch={disableHistogramTouch}
          flatListRef={flatListRef}
        />
      ) : null}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Stat percentage={win / totalNumPredictingCategory} subject="win" />
        {[undefined, Phase.NOMINATION].includes(phaseUserIsPredicting) ? (
          <Stat percentage={nom / totalNumPredictingCategory} subject="nom" />
        ) : null}
        {/* undefined means nothing has happened; NOMINATION means it's been shortlisted */}
        {phaseUserIsPredicting === undefined ? (
          <Stat percentage={listed / totalNumPredictingCategory} subject="listed" />
        ) : null}
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'baseline',
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <SubHeaderLight>{'out of'}</SubHeaderLight>
        <SmallHeader>{` ${totalNumPredictingCategory} `}</SmallHeader>
      </View>
      <Label style={{ textAlign: 'center' }}>{'users predicting category'}</Label>
    </View>
  );
};

export default NumPredictingItem;
