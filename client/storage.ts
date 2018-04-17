const { localStorage } = window;

const Storage = (nameSpace: string) => ({
	save: (data: object) => {
		try {
			localStorage.setItem(nameSpace, JSON.stringify(data));
		} catch (error) {
			console.log('Saving data error...');
		}
	},
	load: () => {
		try {
			return JSON.parse(localStorage.getItem(nameSpace) || '') || undefined;
		} catch (error) {
			return undefined;
		}
	},
	clear: () => {
		try {
			localStorage.removeItem(nameSpace);
		} catch (error) {
			console.log('Clearing data error');
		}
	},
});

export default Storage;

// https://github.com/fbarrailla/giphy-app/blob/master/vanilla/src/utils.js
