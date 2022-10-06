import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListCategoriesQuery } from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';
import { Category } from '../../models';

export const getAllCategories = async (): Promise<iApiResponse<Category[]>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
      query: queries.listCategories,
    });
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listCategories) {
      throw new Error(
        'listCategories property not returned in getAllCategories response',
      );
    }
    const data = res.data.listCategories.items as Category[]; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

export const getCategoriesByEvent = async (
  eventId: string,
): Promise<iApiResponse<Category[]>> => {
  try {
    const filter = { eventId: { eq: eventId } };
    const res = await API.graphql<GraphQLQuery<ListCategoriesQuery>>({
      query: queries.listCategories,
      variables: { filter },
    });
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listCategories) {
      throw new Error(
        'listCategories property not returned in getCategoriesByEvent response',
      );
    }
    const data = res.data.listCategories.items as Category[]; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};
