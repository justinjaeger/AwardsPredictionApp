// @ts-nocheck
import { RouteProp, useRoute } from '@react-navigation/native';
import { PredictionsParamList, iUserInfo } from '../navigation/types';
import { useGetEvent } from './useGetEvent';
import { CategoryName, EventModel, WithId, iCategory } from '../types/api';

/**
 * Shortcut to getting route params, but at the expense of type safety
 * Sometimes you want to route params in a component that is used by multiple routes
 * For ex, you'd have to just expect "category" to be undefined if the route is 'Event'
 */
export const useRouteParams = (): {
  userInfo: iUserInfo | undefined;
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
    userInfo: params?.userInfo,
    eventId: params?.eventId,
    event,
    category: params?.category,
    categoryData: categoryData,
  };
};
