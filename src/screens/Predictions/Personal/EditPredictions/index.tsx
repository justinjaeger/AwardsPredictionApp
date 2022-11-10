import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../../../components/Buttons';
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
import getPersonalPredictionsByCategory from '../../../../services/queryFuncs/getPersonalPredictionsByCategory';
import {
  iPredictionData,
  iPredictionSetParams,
} from '../../../../services/graphql/prediction';
import PredictionTabsNavigator from '../../../../navigation/PredictionTabsNavigator';
import { Category } from '../../Category';

// NOTE: Similar to Add Contenders, somewhat
const EditPredictions = () => {
  const { event: _event, category: _category, displayContenderInfo } = useCategory();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId: _userId } = useAuth();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

  const { data: serverPredictions, isLoading } = useQuery({
    queryKey: [QueryKeys.PERSONAL_CATEGORY],
    queryFn: () => getPersonalPredictionsByCategory(category.id, userId),
  });

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_CATEGORY] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
    },
  });

  const [predictions, setPredictions] = useState<iPrediction[]>(serverPredictions || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [navigateBackWhenDoneFetching, setDone] = useState<boolean>(false);

  // fires when everything is saved
  useEffect(() => {
    if (isFetching === 0 && navigateBackWhenDoneFetching === true) {
      navigation.goBack();
      setDone(false);
    }
  }, [isFetching]);

  const onSaveContenders = async () => {
    setLoading(true);
    const newPredictionData = predictions.map((p, i) => ({
      contenderId: p.contenderId,
      ranking: i + 1,
    }));
    await updatePredictions.mutate({
      predictionSetParams: { userId, categoryId: category.id, eventId: event.id },
      predictionData: newPredictionData,
    });
    setDone(true);
    setLoading(false);
  };

  if (isLoading) return null;

  return (
    <View style={{ alignItems: 'center', marginTop: 40, paddingBottom: 200 }}>
      <TouchableText
        text={'Add or delete contenders'}
        onPress={() => {
          navigation.navigate('AddPredictions');
        }}
        loading={loading}
        style={{ margin: 10 }}
      />
      <TouchableText
        text={'Save'}
        onPress={onSaveContenders}
        loading={loading}
        style={{ margin: 10 }}
      />
      <>
        {predictions.length === 0 ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BodyLarge>No films in this list</BodyLarge>
          </View>
        ) : null}
        {/* @ts-ignore not actually broken */}
        <NestableScrollContainer>
          <NestableDraggableFlatList
            data={predictions}
            keyExtractor={(item) => item.contenderId}
            style={{}}
            contentContainerStyle={{
              paddingBottom: PosterSize.SMALL,
              paddingTop: 20,
            }}
            renderItem={({ item: prediction, index, drag, isActive }) => (
              <ScaleDecorator>
                <ContenderListItem
                  prediction={prediction}
                  ranking={(index || 0) + 1}
                  onPressThumbnail={displayContenderInfo}
                  selected={false}
                  isSelectable={false}
                  draggable={{
                    drag,
                    isActive,
                  }}
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
  );
};

const TabsWrapper = () => {
  return PredictionTabsNavigator(<Category tab={'community'} />, <EditPredictions />);
};

export default TabsWrapper;
