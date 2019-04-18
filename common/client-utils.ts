export class UnsuccessfulApiResponse extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export function is2xxResponse(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}
