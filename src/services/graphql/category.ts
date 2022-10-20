import {
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetCategoryQuery,
  GetCategoryQueryVariables,
  ListCategoriesQuery,
  ListCategoriesQueryVariables,
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
    const { data, errors } = await GraphqlAPI<
      ListCategoriesQuery,
      ListCategoriesQueryVariables
    >(queries.listCategories);
    if (!data?.listCategories) {
      throw new Error(JSON.stringify(errors));
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
    const { data, errors } = await GraphqlAPI<
      ListCategoriesQuery,
      ListCategoriesQueryVariables
    >(queries.listCategories, { filter: { eventCategoriesId: { eq: eventId } } });
    if (!data?.listCategories) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting categories by event', err);
  }
};

export const createCategory = async (
  name: CategoryName,
  type: CategoryType,
  eventId: string,
): Promise<iApiResponse<CreateCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      CreateCategoryMutation,
      CreateCategoryMutationVariables
    >(
      mutations.createCategory,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      { input: { name, type, eventCategoriesId: eventId } },
    );
    if (!data?.createCategory) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating category', err);
  }
};

export const deleteCategory = async (
  id: string,
): Promise<iApiResponse<DeleteCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeleteCategoryMutation,
      DeleteCategoryMutationVariables
    >(mutations.deleteCategory, { input: { id } });
    console.error('deleteCattt', data);
    if (!data?.deleteCategory) {
      throw new Error(JSON.stringify(errors));
    }
    console.error('deleteCat', data);
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting category', err);
  }
};
