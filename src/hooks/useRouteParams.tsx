// @ts-nocheck
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PredictionsParamList, iUserInfo } from '../navigation/types';
import { useGetEvent } from './useGetEvent';
import { CategoryName, EventModel, Phase, WithId, iCategory } from '../models';

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
  yyyymmdd?: number;
  noShorts?: boolean;
  isLeaderboard?: boolean; // need to distinguish leaderboard vs history
  phase?: Phase;
  disableBack?: boolean;
} => {
  const navigation = useNavigation();
  const isRootOfBottomtabs = navigation.getState().index === 0;

  const { params } = useRoute<RouteProp<PredictionsParamList>>();
  const maybeEventId = params?.eventId as string | undefined;

  const event = useGetEvent(maybeEventId);
  const categoryData =
    params?.category && event?.categories[params.category as CategoryName];

  return {
    userInfo: params?.userInfo,
    eventId: params?.eventId,
    event,
    category: params?.category,
    categoryData: categoryData,
    yyyymmdd: params?.yyyymmdd,
    noShorts: params?.noShorts,
    isLeaderboard: params?.isLeaderboard,
    phase: params?.phase,
    disableBack: isRootOfBottomtabs,
  };
};
