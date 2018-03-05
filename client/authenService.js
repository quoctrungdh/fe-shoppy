import Storage from './storage';

const userInfoStorage = Storage('user-info');

let listeners = [];

let userInfo = userInfoStorage.load() || null;
// TODO: check token

const authenService = {
  getUserInfo: () => userInfo,
  setUserInfo: (info) => {
    userInfo = info;

    if (info) {
      userInfoStorage.save(info);
    } else {
      userInfoStorage.clear();
    }

    listeners.forEach(l => l());
  },
  subscribe: (listener) => {
    listeners.push(listener);

    return function removeListener() {
      listeners = listeners.filter(l => l !== listener);
    };
  },
};

export default authenService;

// https://github.com/quanla/pure-react-sample-realworld/blob/master/src/client/realworld-app/authen/user-info
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
