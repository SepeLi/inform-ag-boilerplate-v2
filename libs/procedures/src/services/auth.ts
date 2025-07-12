const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const loginValidation = async ({
  input,
}: {
  input: { email: string; password: string };
}) => {
  // TODO: Replace with real authentication logic
  if (input.email === 'atester.lee@gmail.com' && input.password === '1234567') {
    return { success: true, token: mockToken };
  }
  throw new Error('Invalid credentials');
};

export const registerValidation = async ({
  input,
}: {
  input: { email: string; password: string; confirmPassword: string };
}) => {
  // Example: check if passwords match
  if (input.password !== input.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  // TODO: Replace with real registration logic (e.g., check if user exists, save to DB)
  if (input.email === 'test@example.com') {
    throw new Error('User already exists');
  }
  return { success: true, message: 'Registration successful!' };
};
