import React from 'react';
import { View } from 'react-native';
import { getTotalNumPredicting } from '../../../util/getNumPredicting';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { PredictionsParamList } from '../../../navigation/types';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { StackNavigationProp } from '@react-navigation/stack';
import useDevice from '../../../util/device';
import theme from '../../../constants/theme';
import { useEvent } from '../../../context/EventContext';
import NumPredictingItem from '../../../components/ItemStatBox.tsx';
import { SubmitButton } from '../../../components/Buttons';
import ContenderInfoHeader from '../../../components/ContenderInfoHeader';
import BackgroundWrapper from '../../../components/BackgroundWrapper';

const ContenderInfoModal = () => {
  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderInfoModal'>>();
  const { prediction } = route.params;
  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;
  const { isPad } = useDevice();
  const navigation = useNavigation<StackNavigationProp<PredictionsParamList>>();
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { data: communityPredictions } = useQueryGetCommunityPredictions();
  const { person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  if (!communityPredictions) return null;

  const predictions = communityPredictions.categories[category].predictions;

  const communityPrediction = predictions.find(
    (p) => p.contenderId === prediction.contenderId,
  );

  const totalNumPredictingTop = getTotalNumPredicting(
    communityPrediction?.numPredicting ?? {},
  );

  const totalNumPredictingCategory =
    communityPredictions.categories[category].totalUsersPredicting ??
    totalNumPredictingTop;

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;

  return (
    <BackgroundWrapper>
      <View>
        {communityPrediction ? (
          <ContenderInfoHeader prediction={communityPrediction} />
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
            widthFactor={widthFactor}
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
            navigation.dispatch(
              StackActions.replace('ContenderStats', {
                event,
                movieTmdbId: prediction.movieTmdbId,
              }),
            );
          }}
          text={`More${person || song ? ' movie' : ''} stats`}
          style={{
            marginTop: 10,
            marginBottom: 10,
            height: isPad ? 70 : 50,
            width: '80%',
            maxWidth: 400,
          }}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default ContenderInfoModal;
