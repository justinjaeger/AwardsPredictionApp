import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderAccolade,
  ContenderVisibility,
  EventStatus,
  PredictionType,
  UserRole,
} from '../API';

export type ListPredictionSetsQuery = {
  listPredictionSets?: {
    __typename: 'ModelPredictionSetConnection';
    items: Array<{
      __typename: 'PredictionSet';
      id: string;
      userId: string;
      user: {
        __typename: 'User';
        id: string;
        email: string;
        username?: string | null;
        name?: string | null;
        bio?: string | null;
        image?: string | null;
        role: UserRole;
        createdAt: string;
        updatedAt: string;
      };
      eventId: string;
      event: {
        __typename: 'Event';
        id: string;
        awardsBody: AwardsBody;
        year: number;
        nominationDateTime?: string | null;
        winDateTime?: string | null;
        status?: EventStatus | null;
        createdAt: string;
        updatedAt: string;
      };
      categoryId: string;
      category: {
        __typename: 'Category';
        id: string;
        eventId: string;
        name: CategoryName;
        type: CategoryType;
        isShortlisted?: CategoryIsShortlisted | null;
        createdAt: string;
        updatedAt: string;
      };
      predictions?: {
        __typename: 'ModelPredictionConnection';
        nextToken?: string | null;
        items: Array<{
          __typename: 'Prediction';
          id: string;
          predictionSetId: string;
          contenderId: string;
          contender: {
            __typename: 'Contender';
            id: string;
            categoryId: string;
            eventId: string;
            movieId: string;
            personId?: string | null;
            songId?: string | null;
            visibility?: ContenderVisibility | null;
            accolade?: ContenderAccolade | null;
            createdAt: string;
            updatedAt: string;
          };
          ranking: number;
          createdAt: string;
          updatedAt: string;
        } | null>;
      } | null;
      type?: PredictionType | null;
      comment?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    id: string;
    email: string;
    username?: string | null;
    name?: string | null;
    bio?: string | null;
    image?: string | null;
    role: UserRole;
    predictionSets?: {
      __typename: 'ModelPredictionSetConnection';
      items: Array<{
        __typename: 'PredictionSet';
        id: string;
        userId: string;
        eventId: string;
        event: {
          __typename: 'Event';
          id: string;
          awardsBody: AwardsBody;
          year: number;
          nominationDateTime?: string | null;
          winDateTime?: string | null;
          status?: EventStatus | null;
          categories?: {
            __typename: 'ModelCategoryConnection';
            items: Array<{
              __typename: 'Category';
              id: string;
              eventId: string;
              name: CategoryName;
              type: CategoryType;
              isShortlisted?: CategoryIsShortlisted | null;
              createdAt: string;
              updatedAt: string;
            } | null>;
            nextToken?: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        };
        categoryId: string;
        category: {
          __typename: 'Category';
          id: string;
          eventId: string;
          name: CategoryName;
          type: CategoryType;
          isShortlisted?: CategoryIsShortlisted | null;
          createdAt: string;
          updatedAt: string;
        };
        type?: PredictionType | null;
        comment?: string | null;
        predictions?: {
          __typename: 'ModelPredictionConnection';
          nextToken?: string | null;
          items: Array<{
            __typename: 'Prediction';
            id: string;
            predictionSetId: string;
            contenderId: string;
            contender: {
              __typename: 'Contender';
              id: string;
              categoryId: string;
              eventId: string;
              movieId: string;
              personId?: string | null;
              songId?: string | null;
              visibility?: ContenderVisibility | null;
              accolade?: ContenderAccolade | null;
              createdAt: string;
              updatedAt: string;
            };
            ranking: number;
            createdAt: string;
            updatedAt: string;
          } | null>;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    historyPredictionSets?: {
      __typename: 'ModelHistoryPredictionSetConnection';
      items: Array<{
        __typename: 'HistoryPredictionSet';
        id: string;
        userId: string;
        eventId: string;
        categoryId: string;
        type?: PredictionType | null;
        comment?: string | null;
        predictions?: {
          __typename: 'ModelHistoryPredictionConnection';
          items: Array<{
            __typename: 'HistoryPrediction';
            id: string;
            historyPredictionSetId: string;
            contenderId: string;
            categoryId: string;
            ranking: number;
            createdAt: string;
            updatedAt: string;
          } | null>;
          nextToken?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    followers?: {
      __typename: 'ModelRelationshipConnection';
      items: Array<{
        __typename: 'Relationship';
        id: string;
        followedUserId: string;
        followingUserId: string;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    following?: {
      __typename: 'ModelRelationshipConnection';
      items: Array<{
        __typename: 'Relationship';
        id: string;
        followedUserId: string;
        followingUserId: string;
        createdAt: string;
        updatedAt: string;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      email: string;
      username?: string | null;
      name?: string | null;
      bio?: string | null;
      image?: string | null;
      role: UserRole;
      predictionSets?: {
        __typename: 'ModelPredictionSetConnection';
        nextToken?: string | null;
      } | null;
      historyPredictionSets?: {
        __typename: 'ModelHistoryPredictionSetConnection';
        nextToken?: string | null;
      } | null;
      followers?: {
        __typename: 'ModelRelationshipConnection';
        items: Array<{
          __typename: 'Relationship';
          id: string;
          followedUserId: string;
          followingUserId: string;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      following?: {
        __typename: 'ModelRelationshipConnection';
        items: Array<{
          __typename: 'Relationship';
          id: string;
          followedUserId: string;
          followingUserId: string;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type SearchUsersQuery = {
  searchUsers?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      email: string;
      username?: string | null;
      name?: string | null;
      bio?: string | null;
      image?: string | null;
      role: UserRole;
      predictionSets?: {
        __typename: 'ModelPredictionSetConnection';
        nextToken?: string | null;
      } | null;
      historyPredictionSets?: {
        __typename: 'ModelHistoryPredictionSetConnection';
        nextToken?: string | null;
      } | null;
      followers?: {
        __typename: 'ModelRelationshipConnection';
        items: Array<{
          __typename: 'Relationship';
          id: string;
          followedUserId: string;
          followingUserId: string;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      following?: {
        __typename: 'ModelRelationshipConnection';
        items: Array<{
          __typename: 'Relationship';
          id: string;
          followedUserId: string;
          followingUserId: string;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListEventsQuery = {
  listEvents?: {
    __typename: 'ModelEventConnection';
    items: Array<{
      __typename: 'Event';
      id: string;
      awardsBody: AwardsBody;
      year: number;
      nominationDateTime?: string | null;
      winDateTime?: string | null;
      status?: EventStatus | null;
      categories?: {
        __typename: 'ModelCategoryConnection';
        items: Array<{
          __typename: 'Category';
          id: string;
          eventId: string;
          name: CategoryName;
          type: CategoryType;
          isShortlisted?: CategoryIsShortlisted | null;
          createdAt: string;
          updatedAt: string;
        } | null>;
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};
