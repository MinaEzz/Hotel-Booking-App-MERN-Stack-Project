import IAppError from "../types/appError.types";
import STATUSTEXT from "../constants/httpStatusText";

function createError(
  message: string,
  statusCode = 500,
  status = STATUSTEXT.ERROR,
  errors?: { field: string; message: string }[]
): IAppError {
  const error: IAppError = new Error(message);
  error.statusCode = statusCode;
  error.status = status;
  error.errors = errors || [];
  return error;
}

export default createError;
