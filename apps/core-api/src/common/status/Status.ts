import { StatusCodeDescription } from '@common/type/CommonTypes';

export class StatusCode {
  // Common

  public static SUCCESS: StatusCodeDescription = {
    code: 200,
    message: 'Success.',
  };

  public static BAD_REQUEST_ERROR: StatusCodeDescription = {
    code: 400,
    message: 'Bad request.',
  };

  public static UNAUTHORIZED_ERROR: StatusCodeDescription = {
    code: 401,
    message: 'Unauthorized error.',
  };

  public static WRONG_CREDENTIALS_ERROR: StatusCodeDescription = {
    code: 402,
    message: 'Wrong Credentials.',
  };

  public static ACCESS_DENIED_ERROR: StatusCodeDescription = {
    code: 403,
    message: 'Access denied.',
  };

  public static INTERNAL_SERVER_ERROR: StatusCodeDescription = {
    code: 500,
    message: 'Internal server error.',
  };

  public static USER_INPUT_VALIDATION_ERROR: StatusCodeDescription = {
    code: 400,
    message: 'Input Validation Error',
  };

  public static ENTITY_NOT_FOUND_ERROR: StatusCodeDescription = {
    code: 1000,
    message: 'Entity not found.',
  };

  public static ENTITY_VALIDATION_ERROR: StatusCodeDescription = {
    code: 1001,
    message: 'Entity validation error.',
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: StatusCodeDescription = {
    code: 1002,
    message: 'Use-case port validation error.',
  };

  public static VALUE_OBJECT_VALIDATION_ERROR: StatusCodeDescription = {
    code: 1003,
    message: 'Value object validation error.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: StatusCodeDescription = {
    code: 1004,
    message: 'Entity already exists.',
  };
}
