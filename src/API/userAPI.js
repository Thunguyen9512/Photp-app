/* Fake API */
import firebase from "firebase";

const userApi = {
  getMe: () => {
    return new Promise((resolve, reject) => {
      //Wait 500ms ----> return result like real Api

      //assume Api request fail and return error
    //   reject(new Error("My error"));
    //   return;
      //Api request success  
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
        });
      }, 100);
    });
  },
};

export default userApi;
