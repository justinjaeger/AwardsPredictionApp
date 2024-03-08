import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
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
import ItemStatBox from '../../../components/ItemStatBox';
import { SubmitButton } from '../../../components/Buttons';
import ContenderInfoHeader from '../../../components/ContenderInfoHeader';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useRouteParams } from '../../../hooks/useRouteParams';
import ModalHeader from '../../../components/ModalHeader';
import HistoryDateIndicator from '../../../components/HistoryDateIndicator';

const ContenderInfoModal = () => {
  const scrollRef = useRef<ScrollView>(null);

  const route = useRoute<RouteProp<PredictionsParamList, 'ContenderInfoModal'>>();
  const { prediction } = route.params;
  const { event: _event, category: _category, yyyymmdd } = useRouteParams();
  const event = _event!;
  const category = _category!;
  const { isPad } = useDevice();
  const navigation = useNavigation<StackNavigationProp<PredictionsParamList>>();
  const { getTmdbDataFromPrediction } = useTmdbDataStore();

  const { data: communityPredictions } = useQueryGetCommunityPredictions({
    yyyymmdd,
  });
  const { person, song } = getTmdbDataFromPrediction(prediction) ?? {};

  if (!communityPredictions) return null;

  const predictions = communityPredictions.categories[category].predictions ?? [];

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

  if (!communityPrediction) return null;

  return (
    <>
      <ModalHeader />
      <BackgroundWrapper>
        <ScrollView style={{ flex: 1, width: '100%' }} ref={scrollRef}>
          <View>
            <ContenderInfoHeader prediction={communityPrediction} />
            <HistoryDateIndicator yyyymmdd={yyyymmdd} style={{ marginBottom: 10 }} />
            <ItemStatBox
              key={communityPrediction.contenderId}
              prediction={communityPrediction}
              category={category}
              event={event}
              totalNumPredictingTop={totalNumPredictingTop}
              totalNumPredictingCategory={totalNumPredictingCategory}
              widthFactor={widthFactor}
              scrollRef={scrollRef}
            />
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
                    eventId: event._id,
                    year: event.year,
                    movieTmdbId: prediction.movieTmdbId,
                    yyyymmdd,
                  }),
                );
              }}
              text={`All${person || song ? ' movie' : ''} stats`}
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: isPad ? 70 : 50,
                width: '80%',
                maxWidth: 400,
              }}
            />
          </View>
        </ScrollView>
      </BackgroundWrapper>
    </>
  );
};

export default ContenderInfoModal;
