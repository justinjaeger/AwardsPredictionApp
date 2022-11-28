import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import { PersonalParamList } from '../../../../navigation/types';
import ApiServices from '../../../../services/graphql';
import { useTypedNavigation } from '../../../../util/hooks';
import { useCategory } from '../../../../context/CategoryContext';
import { BodyLarge } from '../../../../components/Text';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { PosterSize } from '../../../../constants/posterDimensions';
import ContenderListItem from '../../../../components/List/ContenderList/ContenderListItem';
import { useAuth } from '../../../../context/UserContext';
import { iCategory, iEvent, iPrediction, QueryKeys } from '../../../../store/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  iPredictionData,
  iPredictionSetParams,
} from '../../../../services/graphql/prediction';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import { CategoryHeader } from '../../styles';
import HeaderButton from '../../../../components/HeaderButton';
import theme from '../../../../constants/theme';
import LoadingStatue from '../../../../components/LoadingStatue';
import useQueryPersonalEvent from '../../../../hooks/getPersonalEvent';

const EditPredictions = () => {
  const { event: _event, category: _category, displayContenderInfo } = useCategory();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId: _userId } = useAuth();
  const queryClient = useQueryClient();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: predictionData } = useQueryPersonalEvent(event.id, userId);
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
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
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
                      categoryType={category.type}
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

export default EditPredictions;
