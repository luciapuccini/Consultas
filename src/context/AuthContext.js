import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
};

const restore = (dispatch) => async ({ email, password }) => {
  try {
    let token;
    await fetch('http://www.mocky.io/v2/5e89211c3100006800d39c05')
      .then((res) => res.json())
      .then((data) => {
        async () => await AsyncStorage.setItem('TOKEN', data.token);
        token = data.token;
      });
    dispatch({ type: 'RESTORE_TOKEN', token });
  } catch (err) {
    console.log(err);
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    let token;
    await fetch('http://www.mocky.io/v2/5e89211c3100006800d39c05')
      .then((res) => res.json())
      .then((data) => {
        async () => await AsyncStorage.setItem('TOKEN', data.token);
        token = data.token;
      });
    dispatch({ type: 'SIGN_IN', token });
  } catch (error) {
    console.log(error);
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('TOKEN');
  dispatch({ type: 'SIGN_OUT' });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    // const response = await fetch()
    // await AsyncStorage.setItem('token', data.token);
    // dispatch({ type: 'SIGN_IN', data.token });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, restore },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  },
);
