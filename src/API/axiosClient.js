/* Set up axios client */

// api/axiosClient.js
import axios from "axios";
import firebase from "firebase";
import queryString from "query-string";

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const getFireBaseToken = async () => {
  const currentUser = firebase.auth().currentUser;

  //already have currentUser
  if (currentUser) {
    return currentUser;
  }
  //Logged but current user is not fetch -> wait 5 second
  return new Promise((resolve, reject) => {
    console.log("getFireBaseToken:");
    const waitTimeOut = setTimeout(() => {
      console.log("timeout");
      reject(null);
    }, 10000);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("get firebase token: user not login");
          reject(null);
        }

        if (user) {
          const token = await user.getIdToken();
          if (token) {
            resolve(token);
          }
        }
        unregisterAuthObserver();
        clearTimeout(waitTimeOut);
      });
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    "content-type": "application/json",
    'User-Agent':'',
                'Accept':'',
                'Host':''
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = await getFireBaseToken()
  if (token) {
    console.log("on handle token:", token);
    config.headers.Authrization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
