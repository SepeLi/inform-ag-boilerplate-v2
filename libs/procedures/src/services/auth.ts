export const loginValidation = async ({
  input,
}: {
  input: { email: string; password: string };
}) => {
  // TODO: Replace with real authentication logic
  const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || '';
  const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || '';
  if (
    input.email === TEST_USER_EMAIL &&
    input.password === TEST_USER_PASSWORD
  ) {
    return { success: true, token: process.env.JWT_SECRET };
  }
  throw new Error('Invalid credentials');
};

export const registerValidation = async ({
  input,
}: {
  input: { email: string; password: string; confirmPassword: string };
}) => {
  if (input.password !== input.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  // TODO: Replace with real registration logic (e.g., check if user exists, save to DB)
  if (input.email === 'test@example.com') {
    throw new Error('User already exists');
  }
  return { success: true, message: 'Registration successful!' };
};
