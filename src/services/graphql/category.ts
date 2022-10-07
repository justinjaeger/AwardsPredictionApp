import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListCategoriesQuery } from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';

export const getAllCategories = async (): Promise<iApiResponse<ListCategoriesQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
      query: queries.listCategories,
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listCategories) {
      throw new Error(
        'listCategories property not returned in getAllCategories response',
      );
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

export const getCategoriesByEvent = async (
  eventId: string,
): Promise<iApiResponse<ListCategoriesQuery>> => {
  try {
    const filter = { eventId: { eq: eventId } };
    const { data, errors } = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
      query: queries.listCategories,
      variables: { filter },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listCategories) {
      throw new Error(
        'listCategories property not returned in getCategoriesByEvent response',
      );
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};
