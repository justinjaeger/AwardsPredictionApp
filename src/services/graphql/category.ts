import {
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  ListCategoriesQuery,
  ListCategoriesQueryVariables,
  ModelCategoryFilterInput,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const createCategory = async (
  name: CategoryName,
  type: CategoryType,
  eventId: string,
): Promise<iApiResponse<CreateCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      CreateCategoryMutation,
      CreateCategoryMutationVariables
    >(mutations.createCategory, { input: { name, type, eventId } });
    if (!data?.createCategory) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating category', err);
  }
};

export const getCategoriesByName = async (
  categoryNames: CategoryName[],
): Promise<iApiResponse<ListCategoriesQuery>> => {
  const filter: ModelCategoryFilterInput[] = categoryNames.map((name) => ({
    name: { eq: name },
  }));
  try {
    const { data, errors } = await GraphqlAPI<
      ListCategoriesQuery,
      ListCategoriesQueryVariables
    >(queries.listCategories, { filter: { or: filter } });
    if (!data?.listCategories) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting categories by name', err);
  }
};

export const updateCategoryIsShortlisted = async (
  categoryId: string,
  isShortlisted: CategoryIsShortlisted,
): Promise<iApiResponse<UpdateCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateCategoryMutation,
      UpdateCategoryMutationVariables
    >(mutations.updateCategory, { input: { id: categoryId, isShortlisted } });
    if (!data?.updateCategory) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updating category is shortlisted', err);
  }
};
