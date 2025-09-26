export default interface IAppError extends Error {
  status?: string;
  statusCode?: number;
  errors?: { field: string; message: string }[];
}
