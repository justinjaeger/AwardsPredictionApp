import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import { PersonalParamList } from '../../../../navigation/types';
import ApiServices from '../../../../services/graphql';
import { useTypedNavigation } from '../../../../util/hooks';
import { useCategory } from '../../../../context/CategoryContext';
import { iPrediction } from '../../../../context/PredictionContext';
import { BodyLarge } from '../../../../components/Text';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { PosterSize } from '../../../../constants/posterDimensions';
import ContenderListItem from '../../../../components/List/ContenderList/ContenderListItem';
import { useAuth } from '../../../../context/UserContext';
import { iCategory, iEvent, QueryKeys } from '../../../../store/types';
import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  iPredictionData,
  iPredictionSetParams,
} from '../../../../services/graphql/prediction';
import PredictionTabsNavigator from '../../../../navigation/PredictionTabsNavigator';
import { Category } from '../../Category';
import getCommunityPredictionsByEvent from '../../../../services/queryFuncs/getCommunityPredictionsByEvent';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import { CategoryHeader } from '../../styles';
import HeaderButton from '../../../../components/HeaderButton';
import theme from '../../../../constants/theme';
import LoadingStatue from '../../../../components/LoadingStatue';

const EditPredictions = () => {
  const { event: _event, category: _category, displayContenderInfo } = useCategory();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId: _userId } = useAuth();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: predictionData } = useQuery({
    queryKey: [QueryKeys.PERSONAL_EVENT],
    queryFn: () => getCommunityPredictionsByEvent(event),
  });
  const serverPredictions = (predictionData || {})[category.id];

  const updatePredictions = useMutation({
    mutationFn: async (params: {
      predictionSetParams: iPredictionSetParams;
      predictionData: iPredictionData;
    }) => {
      return ApiServices.createOrUpdatePredictions(
        params.predictionSetParams,
        params.predictionData,
      );
    },
    onSuccess: async () => {
      console.error('isFetching1', isFetching);
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
      console.error('isFetching2', isFetching);
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      console.error('isFetching3', isFetching);
      setLoading(false);
      navigation.goBack();
    },
  });

  const [predictions, setPredictions] = useState<iPrediction[]>(serverPredictions || []);
  const [loading, setLoading] = useState<boolean>(false);

  const onSaveContenders = async () => {
    setLoading(true);
    const newPredictionData = predictions.map((p, i) => ({
      contenderId: p.contenderId,
      ranking: i + 1,
    }));
    updatePredictions.mutate({
      predictionSetParams: { userId, categoryId: category.id, eventId: event.id },
      predictionData: newPredictionData,
    });
  };

  return (
    <BackgroundWrapper>
      <>
        <CategoryHeader>
          <View />
          <Animated.View
            style={{
              flexDirection: 'row',
              width: 120,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <HeaderButton
              onPress={() => {
                navigation.navigate('AddPredictions');
              }}
              icon={'plus'}
            />
            <HeaderButton onPress={() => onSaveContenders()} icon={'save'} />
          </Animated.View>
        </CategoryHeader>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <>
            {predictions.length === 0 ? (
              <View style={{ marginTop: 10 }}>
                <BodyLarge>No films in this list</BodyLarge>
              </View>
            ) : null}
            {loading ? <LoadingStatue /> : null}
            {/* @ts-ignore not actually broken */}
            <NestableScrollContainer>
              <NestableDraggableFlatList
                data={predictions}
                keyExtractor={(item) => item.contenderId}
                contentContainerStyle={{
                  paddingBottom: PosterSize.SMALL,
                  paddingTop: theme.windowMargin,
                }}
                renderItem={({ item: prediction, index, drag, isActive }) => (
                  <ScaleDecorator>
                    <ContenderListItem
                      tab={'personal'}
                      prediction={prediction}
                      ranking={(index || 0) + 1}
                      onPressThumbnail={displayContenderInfo}
                      selected={false}
                      draggable={{
                        drag,
                        isActive,
                      }}
                      toggleSelected={() => {}}
                    />
                  </ScaleDecorator>
                )}
                onDragEnd={({ data }) => {
                  setPredictions(data);
                }}
              />
            </NestableScrollContainer>
          </>
        </View>
      </>
    </BackgroundWrapper>
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(<Category tab={'community'} />, <EditPredictions />);
};

export default TabsWrapper;
