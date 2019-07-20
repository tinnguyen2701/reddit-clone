module.exports = payload => {
  const errors = [];
  if (!payload.username) errors.push('user is required');
  if (!payload.password) errors.push('password is required');
  if (!payload.confirmPassword) errors.push('confirm password is required');
  if (payload.password !== payload.confirmPassword)
    errors.push('password is not equal confirm password');

  return {
    isValid: errors.length === 0 && true,
    errors,
  };
};
