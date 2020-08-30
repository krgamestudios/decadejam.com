export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (id, token) => {
	return {
		type: LOGIN,
		id: id,
		token: token
	};
};

export const logout = () => {
	return {
		type: LOGOUT
	};
};
