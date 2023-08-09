import crypto from 'crypto';
import { GraphQLError } from 'graphql';
import { ERROR_CODE } from './const';
/**
 * Generates an MD5 hash of the given text.
 *
 * @param {string} text - The text to hash.
 * @returns {string} - The MD5 hash of the text.
 */
export const md5Hash = (text) => crypto.createHash('md5').update(text).digest('hex');

/**
 * Checks if a given data is an empty string, null, or undefined.
 *
 * @param {*} data - The data to check.
 * @returns {boolean} - True if the data is an empty string, null, or undefined; otherwise, false.
 */
export const isEmptyStringNullOrUndefined = (data) => {
  if (typeof data === 'string' && data.length === 0) return true;
  if (!data) return true;
  return false;
};

export const throwError = (message, errorCode) => {
  const { status, code } = errorCode;
  console.error(message);
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: { status },
    },
  });
};

export const errorHandlerForResolvers = (error) => {
  const { extensions: { code, http: { status } } = { code: 'INTERNAL_SERVER_ERROR', http: { status: 500 } }, message } =
    error;
  process.env.NODE_ENV !== 'production'
    ? throwError(message, { code, status })
    : throwError('An unexpected error occurred', ERROR_CODE.FORBIDDEN);
};
