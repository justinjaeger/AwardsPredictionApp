// @ts-nocheck
import { RouteProp, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../navigation/types';
import { useGetEvent } from './useGetEvent';
import { CategoryName, EventModel, WithId, iCategory } from '../types/api';

/**
 * Has lots of type errors because I want to use it in any screen I want
 * Should access the current event, category, or user id
 * As derived from the current route's params
 */
export const useRouteParams = (): {
  userId: string | undefined;
  eventId: string | undefined;
  event: WithId<EventModel> | undefined;
  category: CategoryName | undefined;
  categoryData: iCategory | undefined;
} => {
  const { params } = useRoute<RouteProp<PredictionsParamList>>();
  const maybeEventId = params?.eventId;

  const event = useGetEvent(maybeEventId) as WithId<EventModel> | undefined;
  const categoryData = event?.categories[params?.category as CategoryName];

  return {
    userId: params?.userId,
    eventId: params?.eventId,
    event,
    category: params?.category,
    categoryData: categoryData,
  };
};
