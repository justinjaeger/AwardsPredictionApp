import { Divider } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { CATEGORY_TYPE_TO_STRING } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { Body, SmallHeader, SubHeader } from '../Text';
import { CategoryName, iPrediction } from '../../types/api';
import { triggerHaptic } from '../../util/hapticFeedback';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';
import { getSlotsInPhase } from '../../util/getSlotsInPhase';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { getContenderRiskiness } from '../../util/getContenderRiskiness';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
  lastUpdatedString: string;
  isAuthProfile?: boolean;
  onPressAdd: () => void;
};

// TODO: Might want to combine with MovieListCommunity eventually
const MovieListDraggable = ({
  predictions,
  setPredictions,
  lastUpdatedString,
  isAuthProfile,
  onPressAdd,
}: iMovieListProps) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const {
    categoryData,
    category: _category,
    eventId: _eventId,
    yyyymmdd,
    phase,
  } = useRouteParams();
  const showAccolades = !!yyyymmdd;
  const category = _category!;
  const eventId = _eventId!;

  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);

  const { slots: _slots, type } = categoryData!;
  const slotsInPhase = getSlotsInPhase(phase, categoryData);
  const slots = showAccolades ? slotsInPhase : _slots ?? 5;

  const { data: predictionSet } = useQueryGetCommunityPredictions({
    yyyymmdd,
  });
  const { predictions: communityPredictions, totalUsersPredicting } =
    predictionSet.categories[category as CategoryName];

  const [itemsToDelete, setItemsToDelete] = useState<iPrediction[]>([]);

  const onPressItem = useCallback(async (prediction: iPrediction) => {
    navigation.navigate('ContenderInfoModal', { prediction, category, eventId });
  }, []);

  const toggleDeleteMode = useCallback((prediction: iPrediction) => {
    triggerHaptic();
    setItemsToDelete((curr) => {
      const newItems = [...curr];
      const index = curr.findIndex((p) => p.contenderId === prediction.contenderId);
      if (index === -1) {
        newItems.push(prediction);
      } else {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  }, []);

  // for leaderboard: get riskiness of all contenders that user earned points for
  const contenderIdToRiskiness: { [cId: string]: number } = {};
  if (showAccolades) {
    predictions.forEach(({ contenderId, ranking }) => {
      const accolade = contenderIdsToPhase?.[contenderId];
      const userDidPredictWithinSlots = ranking && ranking <= slots;
      const userScoredPoints = !!(userDidPredictWithinSlots && accolade);
      if (!userScoredPoints) {
        return;
      }
      const numPredictingContender = (communityPredictions ?? []).find(
        (p) => p.contenderId === contenderId,
      )?.numPredicting;
      const riskiness = getContenderRiskiness(
        numPredictingContender,
        slots,
        totalUsersPredicting,
      );
      contenderIdToRiskiness[contenderId] = riskiness;
    });
  }
  const totalRiskiness = Object.values(contenderIdToRiskiness).reduce((a, b) => a + b);

  return (
    <DraggableFlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 150,
      }}
      onPlaceholderIndexChange={() => {
        triggerHaptic();
      }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          <SmallHeader style={{ padding: 10 }}>{`${totalRiskiness}pts`}</SmallHeader>
        </>
      }
      ListFooterComponent={
        isAuthProfile && predictions.length === 0 ? (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
            <TouchableHighlight
              style={{
                width: '90%',
                maxWidth: 400,
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
              underlayColor={COLORS.secondaryDark}
              onPress={onPressAdd}
            >
              <SubHeader>{`+ Add ${CATEGORY_TYPE_TO_STRING[type]}s`}</SubHeader>
            </TouchableHighlight>
          </View>
        ) : isAuthProfile && predictions.length > 0 ? (
          <Body
            style={{
              color: COLORS.gray,
              width: '100%',
              marginTop: 20,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {'To delete, press + hold'}
          </Body>
        ) : null
      }
      renderItem={({ item: prediction, getIndex, drag, isActive }) => {
        const index = getIndex() || 0;
        const ranking = index + 1;
        const isSelectedForDelete = itemsToDelete.some(
          (p) => p.contenderId === prediction.contenderId,
        );
        const accoladeToShow = showAccolades
          ? contenderIdsToPhase && contenderIdsToPhase[prediction.contenderId]
          : undefined;

        return (
          <>
            {index === slots ? (
              <Divider
                style={{
                  margin: 10,
                  backgroundColor: isActive ? 'transparent' : COLORS.secondary,
                }}
              />
            ) : null}
            <ScaleDecorator activeScale={1}>
              <ContenderListItem
                prediction={prediction}
                ranking={ranking}
                onPressItem={() => {
                  if (itemsToDelete.includes(prediction)) {
                    toggleDeleteMode(prediction);
                  } else {
                    onPressItem(prediction);
                  }
                }}
                onLongPress={
                  isAuthProfile
                    ? () => {
                        toggleDeleteMode(prediction);
                      }
                    : undefined
                }
                draggable={{
                  drag,
                  isActive,
                }}
                categoryType={type}
                iconRightProps={
                  !isAuthProfile
                    ? undefined
                    : isSelectedForDelete
                    ? {
                        iconName: 'trash-outline',
                        backgroundColor: COLORS.error,
                        onPress: () => {
                          triggerHaptic();
                          setPredictions(
                            predictions.filter(
                              (p) => p.contenderId !== prediction.contenderId,
                            ),
                          );
                          setItemsToDelete((curr) =>
                            curr.filter((p) => p.contenderId !== prediction.contenderId),
                          );
                        },
                      }
                    : {
                        iconName: 'menu',
                        enableOnPressIn: true,
                        onPress: () => drag(),
                      }
                }
                accolade={accoladeToShow || undefined}
                riskiness={
                  showAccolades
                    ? contenderIdToRiskiness[prediction.contenderId]
                    : undefined
                }
              />
            </ScaleDecorator>
          </>
        );
      }}
      onDragEnd={({ data }) => {
        setPredictions(data);
      }}
    />
  );
};

export default MovieListDraggable;
