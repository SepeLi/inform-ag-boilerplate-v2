import { parseJwt } from '@/auth/utils';

describe('JWT utils', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  describe('parseJwt', () => {
    it('should parse a valid JWT and return the payload object', () => {
      const payload = parseJwt(token);

      expect(payload).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022
      });
    });

    it('should return null when the token is undefined', () => {
      const payload = parseJwt();

      expect(payload).toBeUndefined();
    });

    it('should return null when the token is invalid', () => {
      const token = 'invalid-token';
      const payload = parseJwt(token);

      expect(payload).toBeUndefined();
    });
  });

  it('does not log a warning for a valid token', () => {
    const consoleWarn = jest.spyOn(console, 'warn');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    parseJwt(token);

    expect(consoleWarn).not.toHaveBeenCalled();
  });

  it('logs a warning for an invalid token', () => {
    const consoleWarn = jest.spyOn(console, 'warn');
    parseJwt('invalid.token');

    expect(consoleWarn).toHaveBeenCalled();
  });
});
