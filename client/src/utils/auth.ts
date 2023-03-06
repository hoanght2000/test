import { LoginType } from '../@types';

export const saveAuth = (auth: LoginType) => {
	localStorage.setItem('auth', JSON.stringify(auth));
};

export const getAuth = () => {
	const auth = localStorage.getItem('auth');
	return auth ? JSON.parse(auth) : null;
};

export const clearAuth = () => {
	localStorage.removeItem('auth');
};
