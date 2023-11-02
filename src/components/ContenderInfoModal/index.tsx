import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import BasicModal from '../BasicModal';
import { CategoryName, EventModel, WithId, iPrediction } from '../../types/api';
import NumPredictingItem from '../ItemStatBox.tsx';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { PredictionsParamList } from '../../navigation/types';
import useQueryGetCommunityPredictions from '../../hooks/queries/useQueryGetCommunityPredictions';
import { SubmitButton } from '../Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import ContenderInfoHeader from '../ContenderInfoHeader';
import { IconButton } from '../Buttons/IconButton';
import COLORS from '../../constants/colors';

const ContenderInfoModal = ({
  visible,
  onClose,
  event,
  category,
  prediction,
}: {
  visible: boolean;
  onClose: () => void;
  event: WithId<EventModel>;
  category: CategoryName;
  prediction: iPrediction;
}) => {
  const navigation = useNavigation<StackNavigationProp<PredictionsParamList>>();
  const { width, height } = useWindowDimensions();
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { data: communityPredictions } = useQueryGetCommunityPredictions();
  const { person } = getTmdbDataFromPrediction(prediction) ?? {};

  if (!communityPredictions) return null;

  const predictions = communityPredictions.categories[category].predictions;

  // TODO: DO this for performance, song
  const communityPrediction = predictions.find(
    (p) => p.movieTmdbId === prediction.movieTmdbId,
  );

  const totalNumPredictingTop = getTotalNumPredicting(
    communityPrediction?.numPredicting ?? {},
  );

  const totalNumPredictingCategory =
    communityPredictions.categories[category].totalUsersPredicting ??
    totalNumPredictingTop;

  const close = () => {
    onClose();
  };

  return (
    <BasicModal
      visible={visible}
      onClose={() => close()}
      width={width}
      height={height * 0.8}
      childStyle={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <>
        <View>
          <View style={{ position: 'absolute', right: 10, top: -20, zIndex: 100 }}>
            <IconButton
              onPress={() => close()}
              iconProps={{
                color: 'white',
                size: 30,
                name: 'close-outline',
              }}
              styles={{
                backgroundColor: COLORS.secondaryDark,
                borderWidth: 1,
                borderColor: COLORS.white,
              }}
            />
          </View>
          {communityPrediction ? (
            <ContenderInfoHeader
              prediction={communityPrediction}
              onNavigateAway={() => close()}
            />
          ) : null}
          {communityPrediction ? (
            <NumPredictingItem
              key={communityPrediction.contenderId}
              prediction={communityPrediction}
              category={category}
              event={event}
              totalNumPredictingTop={totalNumPredictingTop}
              totalNumPredictingCategory={totalNumPredictingCategory}
              disableCategoryLink
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <SubmitButton
            onPress={() => {
              close();
              navigation.dispatch(
                StackActions.push('ContenderStats', {
                  event,
                  movieTmdbId: prediction.movieTmdbId,
                }),
              );
            }}
            text={`More${person ? ' movie' : ''} stats`}
            style={{ marginTop: 10, marginBottom: 10, height: 50, width: '80%' }}
          />
        </View>
      </>
    </BasicModal>
  );
};

export default ContenderInfoModal;
