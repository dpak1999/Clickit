/** @format */

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('clickit-user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('clickit-user'))
      : localStorage.clear();

  return userInfo;
};
