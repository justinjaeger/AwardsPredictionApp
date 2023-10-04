/**
 * What backend response with
 * Must be in sync with type of same name on backend
 */
export type ApiResponse<D> = {
  statusCode: number;
  data?: D;
  error?: string;
  message?: string; // a user-facing message
};

/**
 * What client receives
 */
export type ClientResponse<D> = {
  status: 'success' | 'error';
  data?: D;
  message?: string; // a user-facing message
  error?: string;
};
