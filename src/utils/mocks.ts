export const mockSuccessPromise = <T extends Object>(
  data: T,
  delay: number
): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), delay));
