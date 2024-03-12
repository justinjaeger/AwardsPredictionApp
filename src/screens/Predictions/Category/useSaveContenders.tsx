import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import useMutationUpdatePredictions from '../../../hooks/mutations/useMutationUpdatePredictions';
import { useAuth } from '../../../context/AuthContext';
import { PredictionSet, WithId, iPrediction } from '../../../models';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import { sortPredictions } from '../../../util/sortPredictions';
import { useRouteParams } from '../../../hooks/useRouteParams';

export type iSaveContendersResult = {
  onSaveContenders: (ps?: iPrediction[]) => Promise<void>;
  isSaving: boolean;
  showSave: boolean;
  setShowSave: (b: boolean) => void;
  predictionData: WithId<PredictionSet> | null;
  isLoading: boolean;
  predictionsRef: React.MutableRefObject<iPrediction[]>;
};

// used in both FromProfile and from event
export const useSaveContenders = (): iSaveContendersResult => {
  const { category: _category, event: _event, userInfo, yyyymmdd } = useRouteParams();
  const category = _category!;
  const event = _event!;

  const { userId: authUserId } = useAuth();
  const isAuthProfile = userInfo?.userId === authUserId;

  const { data: predictionData, isLoading } = useQueryGetUserPredictions({
    event,
    userId: userInfo?.userId,
    yyyymmdd,
  });
  const initialPredictions = sortPredictions(
    predictionData?.categories[category]?.predictions ?? [],
  );

  // ref is used because this doesn't need to trigger a re-render
  const predictionsRef = useRef<iPrediction[]>(initialPredictions);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    predictionsRef.current = initialPredictions;
  }, [userInfo?.userId, !!predictionData]);

  const [isSaving, setIsSaving] = useState(false);
  // func to fire after we update predictions on db
  const onComplete = () => {
    setIsSaving(false);
    setShowSave(false);
  };
  const onIsSaving = () => {
    setIsSaving(true);
  };
  const { mutate: updatePredictions } = useMutationUpdatePredictions(
    onComplete,
    onIsSaving,
  );

  const onSaveContenders = async (ps?: iPrediction[]) => {
    if (!userInfo?.userId || !isAuthProfile) return;
    const predictionsToSave = ps || predictionsRef.current;
    const predictionsHaveNotChanged = _.isEqual(
      predictionsToSave.map((p) => p.contenderId),
      initialPredictions.map((p) => p.contenderId),
    );
    if (predictionsHaveNotChanged) return;
    // set then rankings according to INSERTION ORDER
    const orderedPredictions: iPrediction[] = predictionsToSave.map((p, i) => ({
      ...p,
      ranking: i + 1,
    }));
    await updatePredictions({
      categoryName: category,
      eventId: event._id,
      predictions: orderedPredictions,
    });
  };

  return {
    onSaveContenders,
    isSaving,
    showSave,
    setShowSave,
    predictionData: predictionData ?? null,
    isLoading,
    predictionsRef,
  };
};
