export const isUserLogin = ({ auth }) => auth.isLogin;
export const getUser = ({ auth }) => auth.user;
export const getAuth = ({ auth }) => {
  const { isLogin, token, user } = auth;
  return { isLogin, token, user };
};

export const selectUser = ({ auth }) => auth.user;
export const selectAuth = ({ auth }) => {
  const { isLogin, token } = auth;
  return { isLogin, token };
};
export const selectLoading = ({ auth }) => auth.loading;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const getFavorite = ({ auth }) => auth.user.favorite;

export const getUserId = ({ auth }) => auth.user;

export const selectError = ({ auth }) => auth.error;

