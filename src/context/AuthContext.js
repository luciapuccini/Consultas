import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

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
  if (token !== null && token !== undefined) {
    dispatch({ type: 'SIGN_IN', payload: token });
  } else {
  }
};
const storeData = async (jwt, userId) => {
  const setToken = ['TOKEN', jwt];
  const setUser = ['USER_ID', userId];
  try {
    await AsyncStorage.multiSet([setToken, setUser]);
  } catch (e) {
    // saving error
  }
};
const signin = (dispatch) => async ({ legajo, password, deviceToken }) => {
  const user = { legajo, password, deviceToken };
  try {
    let token;
    //http://181.164.121.14:25565/users/login
    //http://www.mocky.io/v2/5e90d8663300008a00e9ccbc
    await fetch('http://181.164.121.14:25565/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Este es el user', data);
        const { userId, jwt } = data;
        storeData(jwt, userId);
        token = jwt;
      });
    dispatch({ type: 'SIGN_IN', payload: token });
  } catch (error) {
    console.log(error);
  }
};

const signout = (dispatch) => async () => {
  const id = await AsyncStorage.getItem('USER_ID');
  try {
    fetch(`http://181.164.121.14:25565/users/logout/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  } catch (error) {
    console.log('Upss');
  }
  await AsyncStorage.removeItem('TOKEN');
  dispatch({ type: 'SIGN_OUT' });
};

const signup = (dispatch) => async ({
  legajo,
  name,
  email,
  password,
  phone,
}) => {
  const user = { legajo, name, email, password, mobile: phone };
  try {
    let token;
    //http://181.164.121.14:25565/users/addStudent
    //http://www.mocky.io/v2/5e93a8953000009100156b76
    //WARNING how to login after ---> missing jwt
    await fetch('http://www.mocky.io/v2/5e93a8953000009100156b76', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        async () => await AsyncStorage.setItem('TOKEN', data.token);
        token = data.token;
      });
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
