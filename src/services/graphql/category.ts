import {
  CategoryName,
  CategoryType,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
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
