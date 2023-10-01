export type ReactChildren = React.ReactNode | React.ReactNode[];

export enum QueryKeys {
  EVENTS = 'events',
  USER = 'user',
  USER_PROFILE = 'user-profile',
  FOLLOWING_RECENT_PREDICTIONS = 'following-recent-predictions',
  PERSONAL_EVENT = 'personal-predictions-by-event',
  COMMUNITY_EVENT = 'community-predictions-by-event',
  PAGINATED_FOLLOWERS = 'paginated-followers',
  PAGINATED_FOLLOWING = 'paginated-following',
  RELATIONSHIP_COUNT = 'relationship-count',
  FRIENDS_PREDICTING_EVENT = 'friends-predicting-event',
}

export enum AsyncStorageKeys {
  IS_NOT_FIRST_TIME = 'is-not-first-time',
}
