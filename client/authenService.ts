import Storage from './storage';

const userInfoStorage = Storage('user-info');

let listeners: any = [];

let userInfo = userInfoStorage.load() || null;
// TODO: check token

const authenService = {
	getUserInfo: () => userInfo,
	setUserInfo: (info: object | null) => {
		userInfo = info;

		if (info) {
			userInfoStorage.save(info);
		} else {
			userInfoStorage.clear();
		}

		listeners.forEach((l: () => void) => l());
	},
	subscribe: (listener: () => void) => {
		listeners.push(listener);
	},
	unsubscribe: (listener: any) => {
		return listeners = listeners.filter((l: () => void) => l !== listener);
	},
};

export default authenService;

// https://github.com/quanla/pure-react-sample-realworld/blob/master/src/client/realworld-app/authen/user-info
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
