export class ApiError extends Error {
  constructor(
    message: string,
    public readonly body: any,
  ) {
    super(message);
  }
}
