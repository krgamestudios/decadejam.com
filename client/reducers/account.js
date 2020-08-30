import { LOGIN, LOGOUT } from "../actions/account";

const initialStore = {
	id: 0,
	token: 0
};

export const accountReducer = (store = initialStore, action) => {
	switch(action.type) {
		case LOGIN: {
			let newStore = {
				...store,
				id: action.id,
				token: action.token
			}

			return newStore;
		}

		case LOGOUT:
			return initialStore;

		default:
			return store;
	};
}
