import { useState } from 'react';
import getPersonalPredictionsByCategory from '../../services/queryFuncs/getPersonalPredictionsByCategory';
import { iIndexedPredictionsByCategory } from '../../types';
import { useAsyncEffect } from '../../util/hooks';

const useQueryPersonalCategoryPredictions = (params: {
  userId: string | undefined;
  categoryId: string | undefined;
}) => {
  const { userId, categoryId } = params;

  const [predictions, setPredictions] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (!userId || !categoryId) {
      console.error('no userId or categoryId passed');
      return;
    }
    setIsLoading(true);
    const data = await getPersonalPredictionsByCategory(userId, categoryId);
    setIsLoading(false);
    setPredictions(data);
  }, [userId, categoryId]);

  return { predictions, isLoading };
};

export default useQueryPersonalCategoryPredictions;
