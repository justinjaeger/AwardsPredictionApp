import { useEffect, useState } from 'react';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iIndexedPredictionsByCategory, iPrediction } from '../../../types';
import { useAsyncEffect, useDeepCompareEffect } from '../../../util/hooks';
import ApiServices from '../../../services/graphql';
import Serializers from '../../../serializers';
import _ from 'lodash';

// feeds "initialPredictions" and "updatedPredictions" to CategoryPersonal
const useCategoryPersonalPredictions = ({
  predictionData,
  userId,
}: {
  predictionData: iIndexedPredictionsByCategory;
  userId: string | undefined;
}) => {
  const { category: _category, date, setIsEditing } = useCategory();
  const category = _category as iCategory;
  const categoryId = category.id;
  const isHistory = !!date;

  const [initialPredictions, setInitialPredictions] = useState<iPrediction[]>(
    predictionData?.[categoryId]?.predictions || [],
  );

  const [updatedPredictions, setUpdatedPredictions] = useState<iPrediction[]>(
    initialPredictions,
  );

  // when mounts, we want to fetch beyond the first 10 predictions, which is what's returned in predictionData
  useAsyncEffect(async () => {
    if (!userId) return;
    const { data } = await ApiServices.getPersonalPredictionsByCategory({
      categoryId,
      userId,
    });
    if (data) {
      const predictionSets = data.predictionSetByUserIdAndCategoryId?.items || [];
      if (predictionSets.length > 0) {
        const predictionSet = predictionSets[0];
        const predictions = Serializers.predictionsSerializer(
          predictionSet?.predictions?.items || [],
          predictionSet?.type,
        );
        setUpdatedPredictions(predictions);
        setInitialPredictions(predictions);
      }
    }
  }, [userId]);

  // when predictionData changes, should update. When we're coming from a profile this is necessary
  useEffect(() => {
    setUpdatedPredictions(initialPredictions);
  }, [initialPredictions.length]);

  // when we've edited the predictions from their initial state, set isEditing to true
  const initialPredictionIds = initialPredictions.map((p) => p.contenderId);
  const predictionIds = updatedPredictions.map((p) => p.contenderId);
  useDeepCompareEffect(() => {
    // only can edit if not viewing history
    if (!isHistory) {
      const resultIsSame = _.isEqual(predictionIds, initialPredictionIds);
      setIsEditing(!resultIsSame);
    }
  }, [initialPredictionIds, predictionIds]);

  return {
    initialPredictions,
    updatedPredictions,
    setUpdatedPredictions,
  };
};

export default useCategoryPersonalPredictions;
