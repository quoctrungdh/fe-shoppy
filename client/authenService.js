let listeners = [];

const userInfoNameSpace = 'user-info';

let userInfo = (() => {
  const dataString = localStorage.getItem(userInfoNameSpace);
  const info = dataString === null || dataString === undefined ? null : JSON.parse(dataString);

  // TODO: check token
  return info;
})();

const authenService = {
  getUserInfo: () => userInfo,
  setUserInfo: (info) => {
    userInfo = info;

    if (info) {
      localStorage.setItem(userInfoNameSpace, JSON.stringify(info));
    } else {
      localStorage.removeItem(userInfoNameSpace);
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

// TODO: refactor localStorage to support more browser mode

// https://github.com/quanla/pure-react-sample-realworld/blob/master/src/client/realworld-app/authen/user-info
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
