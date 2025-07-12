export const parseJwt = (token?: string) => {
  try {
    if (token) {
      const payload = Buffer.from(token.split('.')[1], 'base64');
      return JSON.parse(payload.toString());
    }
  } catch (e) {
    console.warn(e);
  }
};
