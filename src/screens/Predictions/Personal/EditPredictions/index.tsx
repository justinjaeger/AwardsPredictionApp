import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../../../components/Buttons';
import { PersonalParamList } from '../../../../navigation/types';
import ApiServices from '../../../../services/graphql';
import { useAuth } from '../../../../store';
import { useTypedNavigation } from '../../../../util/hooks';
import { useCategory } from '../../../../context/CategoryContext';
import { iPrediction, usePredictions } from '../../../../context/PredictionContext';
import { BodyLarge } from '../../../../components/Text';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { PosterSize } from '../../../../constants/posterDimensions';
import ContenderListItem from '../../../../components/List/ContenderList/ContenderListItem';

// NOTE: Similar to Add Contenders, somewhat
const EditPredictions = () => {
  const { event, category } = useCategory();
  const { predictionData, displayContenderInfo } = usePredictions();
  const navigation = useTypedNavigation<PersonalParamList>();
  const { userId } = useAuth();

  const ps: iPrediction[] | undefined =
    category?.getCategory?.id && predictionData[category?.getCategory?.id]
      ? predictionData[category.getCategory.id] // this might be undefined
      : [];

  const categoryPredictions = ps || [];

  //   const [contenderIds, setContenderIds] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<iPrediction[]>(categoryPredictions);
  const [loading, setLoading] = useState<boolean>(false);

  const cat = category?.getCategory;

  useEffect(() => {
    setPredictions(categoryPredictions);
  }, [categoryPredictions]);

  const onSaveContenders = async () => {
    const eventId = event?.getEvent?.id;
    if (!userId || !cat || !eventId) return;
    setLoading(true);
    const newPredictionData = predictions.map((p, i) => ({
      contenderId: p.contenderId,
      ranking: i + 1,
    }));
    await ApiServices.createOrUpdatePredictions(
      { userId, categoryId: cat.id, eventId },
      newPredictionData,
    );
    // TODO: must update PredictionContext (refresh it basically)
    navigation.goBack();
    setLoading(false);
  };

  if (!categoryPredictions) return null; // or loading state

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
        {categoryPredictions.length === 0 ? (
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

export default EditPredictions;
