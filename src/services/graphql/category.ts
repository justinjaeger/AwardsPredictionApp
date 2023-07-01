import {
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import { GraphqlAPIProtected, handleError, iApiResponse } from '../utils';

export const createCategory = async (
  name: CategoryName,
  type: CategoryType,
  eventId: string,
): Promise<iApiResponse<CreateCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
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

export const updateCategoryIsShortlisted = async (
  categoryId: string,
  isShortlisted: CategoryIsShortlisted,
): Promise<iApiResponse<UpdateCategoryMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
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
