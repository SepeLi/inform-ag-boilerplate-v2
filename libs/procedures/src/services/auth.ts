export const loginValidation = async ({
  input,
}: {
  input: { email: string; password: string };
}) => {
  // TODO: Replace with real authentication logic
  if (input.email === 'atester.lee@gmail.com' && input.password === '1234567') {
    return { success: true, token: process.env.JWT_SECRET };
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
