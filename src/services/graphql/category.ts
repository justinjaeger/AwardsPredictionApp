import {
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  ListCategoriesQuery,
  ListCategoriesQueryVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// Only used in DEV (so temporary)
export const getAllCategories = async (): Promise<iApiResponse<ListCategoriesQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListCategoriesQuery,
      ListCategoriesQueryVariables
    >(customQueries.listCategories);
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
    >(customQueries.listCategories, { filter: { eventCategoriesId: { eq: eventId } } });
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
      { input: { name, type, eventId } },
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
