export type AuthError = {
  email?: string;
  password?: string;
  global?: string;
};

export function getAuthErrorMessage(errorCode: string): AuthError {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return { email: 'This email is already registered. Please try logging in.' };
    case 'auth/invalid-email':
      return { email: 'Invalid email address.' };
    case 'auth/weak-password':
      return { password: 'Password is too weak (minimum 6 characters).' };
    case 'auth/user-not-found':
      return { email: 'No account found with this email.' };
    case 'auth/wrong-password':
      return { password: 'Incorrect password. Please try again.' };
    case 'auth/network-request-failed':
      return { global: 'Network error. Please check your Internet connection.' };
    default:
      return { global: 'An error occurred. Please try again.' };
  }
}
