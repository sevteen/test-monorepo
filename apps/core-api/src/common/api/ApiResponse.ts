import { StatusCode } from '@common/status/Status';
import { Nullable } from '@common/type/CommonTypes';

export type ErrorDetails = {
  code: number | string;
  message: string;
  detail: string;
};

export class ApiResponse<TData> {
  public readonly code: number;
  public readonly message: string;
  public readonly timestamp: number;
  public readonly data: Nullable<TData>;
  public readonly request_id: string;
  public readonly errors: ErrorDetails | ErrorDetails[];

  private constructor(
    code: number,
    message: string,
    data?: TData,
    request_id?: string,
    errors?: ErrorDetails | ErrorDetails[],
  ) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
    this.request_id = request_id;
    this.errors = errors;
  }

  public static success<TData>(data?: TData, message?: string): ApiResponse<TData> {
    const resultCode: number = StatusCode.SUCCESS.code;
    const resultMessage: string = message || StatusCode.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(
    request_id: string,
    code?: number,
    message?: string,
    data?: TData,
    errors?: ErrorDetails | ErrorDetails[],
  ): ApiResponse<TData> {
    const resultCode: number = code || StatusCode.INTERNAL_SERVER_ERROR.code;
    const resultMessage: string = message || StatusCode.INTERNAL_SERVER_ERROR.message;

    return new ApiResponse(resultCode, resultMessage, data, request_id, errors);
  }
}
