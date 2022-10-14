import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import {
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  GetCategoryQuery,
  GetCategoryQueryVariables,
  ListCategoriesQuery,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getCategoryById = async (
  id: string,
): Promise<iApiResponse<GetCategoryQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      GetCategoryQuery,
      GetCategoryQueryVariables
    >(queries.getCategory, { id });
    if (!data?.getCategory) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting category by id', err);
  }
};

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
    return handleError('error getting all categories', err);
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

export const createCategory = async (
  name: CategoryName,
  type: CategoryType,
  eventId: string,
): Promise<iApiResponse<CreateCategoryMutation>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<CreateCategoryMutation>>({
      query: mutations.createCategory,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      variables: { input: { name, type, eventId } },
    });
    if (!data?.createCategory) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating category', err);
  }
};
