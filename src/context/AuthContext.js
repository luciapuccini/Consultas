import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import { getToken } from '../utils/authHelper';
import { Alert } from 'react-native';
import { SERVER_URL } from '../utils/config';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
};

const restore = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('TOKEN');
  //valida que se autologee si existe token en asyncStorage
  if (token !== null && token !== undefined) {
    dispatch({ type: 'SIGN_IN', payload: token });
  } else {
  }
};
const storeData = async (jwt) => {
  try {
    await AsyncStorage.setItem('TOKEN', jwt);
  } catch (e) {
    console.log(e);
    // saving error
  }
};
const signin = (dispatch) => async ({ legajo, password, deviceToken }) => {
  const user = { legajo, password, deviceToken };
  try {
    let token;
    const res = await fetch(`${SERVER_URL}/users/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (data.error) {
      return data.message;
    }
    const { jwt } = data;
    storeData(jwt);
    token = jwt;
    dispatch({ type: 'SIGN_IN', payload: token });
  } catch (error) {
    console.log(error);
    Alert.alert(
      '⚠️ Los servicios no estan funcionando',
      'Vuelva a intentar mas tarde',
    );
  }
};

const signout = (dispatch) => async () => {
  const token = await getToken();
  try {
    fetch(`${SERVER_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  } catch (error) {
    console.log('Upss');
  }
  await AsyncStorage.removeItem('TOKEN');
  dispatch({ type: 'SIGN_OUT' });
};

const signup = (dispatch) => async (user) => {
  console.log('SINGUP', user);
  try {
    let token;
    //http://www.mocky.io/v2/5e93a8953000009100156b76
    const res = await fetch(`${SERVER_URL}/users/addStudent`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log('que es dataa', data);
    if (data.error) {
      return data.message;
    }
    dispatch({ type: 'SIGN_IN', payload: token });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, restore },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  },
);
