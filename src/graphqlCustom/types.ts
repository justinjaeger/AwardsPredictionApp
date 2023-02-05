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
