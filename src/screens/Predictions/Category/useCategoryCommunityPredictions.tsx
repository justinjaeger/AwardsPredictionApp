import { useState } from 'react';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iIndexedPredictionsByCategory, iPrediction } from '../../../types';
import { useAsyncEffect } from '../../../util/hooks';
import ApiServices from '../../../services/graphql';
import Serializers from '../../../serializers';

// feeds "predictions" to CategoryCommunity
const useCategoryCommunityPredictions = ({
  predictionData,
}: {
  predictionData: iIndexedPredictionsByCategory;
}) => {
  const { category: _category } = useCategory();
  const category = _category as iCategory;
  const categoryId = category.id;

  const [predictions, setPredictions] = useState<iPrediction[]>(
    predictionData?.[categoryId]?.predictions || [],
  );

  // when mounts, we want to fetch beyond the first 10 predictions, which is what's returned in predictionData
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCommunityPredictionsByCategory(categoryId);
    if (data) {
      const predictionSets = data.communityPredictionSetByCategoryId?.items || [];
      if (predictionSets.length > 0) {
        const predictionSet = predictionSets[0];
        const predictions = Serializers.predictionsSerializer(
          predictionSet?.predictions?.items || [],
          predictionSet?.type,
        );
        setPredictions(predictions);
      }
    }
  }, []);

  return { predictions };
};

export default useCategoryCommunityPredictions;
