import React from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Header, Label, SmallHeader, SubHeader, SubHeaderLight } from '../Text';
import { CategoryName, EventModel, Phase, WithId, iPrediction } from '../../types/api';
import { getNumPredicting, getTotalNumPredicting } from '../../util/getNumPredicting';
import Histogram, { SLOTS_TO_DISPLAY_EXTRA } from '../Histogram';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { categoryNameToTmdbCredit } from '../../util/categoryNameToTmdbCredit';
import { getBiggestPhaseThatHasHappened } from '../../util/getBiggestPhaseThatHasHappened';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import {
  StackActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import Stat from './Stat';

const NumPredictingItem = ({
  category,
  event,
  prediction,
  totalNumPredictingTop,
  totalNumPredictingCategory,
  widthFactor,
  flatListRef,
  scrollRef,
}: {
  category: CategoryName;
  event: WithId<EventModel>;
  prediction: iPrediction;
  totalNumPredictingTop: number;
  totalNumPredictingCategory: number;
  widthFactor?: number;
  flatListRef?: React.RefObject<FlatList<any>>;
  scrollRef?: React.RefObject<ScrollView>;
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userId: authUserId } = useAuth();

  const numPredicting = prediction?.numPredicting;
  const totalNumPredicting = getTotalNumPredicting(numPredicting || {});
  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const navigationState = useNavigationState((state) => state);

  // THIS IS PROBABLY UNDEFINED!!
  const { slots } = event.categories[category];
  const categoryString = event.categories[category].name;

  const catCredits = getTmdbDataFromPrediction(prediction)?.movie.categoryCredits;
  const credit = catCredits && categoryNameToTmdbCredit(category, catCredits);
  const performerName = getTmdbDataFromPrediction(prediction)?.person?.name;
  const songName = getTmdbDataFromPrediction(prediction)?.song?.title;
  const creditString =
    songName ?? performerName ?? (credit ? credit.join(', ') : undefined);

  const biggestPhaseThatHasHappened = getBiggestPhaseThatHasHappened(event, category);
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
        onPress={() => {
          // If the current screen is the ContenderInfoModal, go back
          // since the only category displayed here is the one of the prev screen
          if (
            navigationState.routes[navigationState.index].name === 'ContenderInfoModal'
          ) {
            navigation.goBack();
          } else {
            navigation.dispatch(
              StackActions.replace('Category', {
                userId: authUserId ?? undefined,
                eventId: event._id,
                category: category,
              }),
            );
          }
        }}
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
          flatListRef={flatListRef}
          scrollRef={scrollRef}
        />
      ) : null}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 30,
        }}
      >
        <Stat percentage={win / totalNumPredictingCategory} text="predict win" />
        {[undefined, Phase.SHORTLIST].includes(biggestPhaseThatHasHappened) ? (
          <>
            <Stat percentage={nom / totalNumPredictingCategory} text="predict nom" />
            {biggestPhaseThatHasHappened === undefined ? (
              <Stat
                percentage={listed / totalNumPredictingCategory}
                text={`top ${(slots ?? 5) + SLOTS_TO_DISPLAY_EXTRA}`}
              />
            ) : null}
          </>
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
