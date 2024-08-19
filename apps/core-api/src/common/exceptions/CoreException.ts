import { Optional, StatusCodeDescription } from '@common/type/CommonTypes';

export type CreateExceptionPayload<TData> = {
  code: StatusCodeDescription;
  overrideMessage?: string;
  data?: TData;
};

export class CoreException<TData> extends Error {
  public readonly code: number;

  public readonly data: Optional<TData>;

  private constructor(codeDescription: StatusCodeDescription, overrideMessage?: string, data?: TData) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(payload: CreateExceptionPayload<TData>): CoreException<TData> {
    return new CoreException(payload.code, payload.overrideMessage, payload.data);
  }
}
