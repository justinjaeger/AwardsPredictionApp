export type ReactChildren = React.ReactNode | React.ReactNode[];

export enum QueryKeys {
  EVENTS = 'events',
  USER = 'user', // We use his like (USER + userId)
  COMMUNITY_PREDICTIONS = 'community-predictions-by-event',
  USER_PREDICTIONS = 'user-predictions-by-event',
  FOLLOWING_USERS_NESTED_FIELDS = 'following-users-nested-fields',
  EVENT_ACCOLADES = 'event-accolades',
}

export enum AsyncStorageKeys {
  IS_NOT_FIRST_TIME = 'is-not-first-time',
  USER_INFO = 'user-info',
  GENDERED_PREFERENCE = 'gendered-preference',
}
