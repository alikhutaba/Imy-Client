import {
    SAVE_ALL_ALLERGENS,
    SAVE_ALL_PROTOCOLS,
    SAVE_LOGIN_USER,
    SAVE_LOGOUT_USER
} from "../actionsTypes";

const initialState = {
    allergensDB: [],
    protocolsDB: [],
    logedinUser: null
};

const staticDataReducers = (state = initialState, action) => {

    switch (action.type) {
        case SAVE_ALL_ALLERGENS: {
            const { allergens } = action.payload;
            return {
                ...state,
                allergensDB: allergens,
            };
        }

        case SAVE_ALL_PROTOCOLS: {
            const { protocols } = action.payload;
            return {
                ...state,
                protocolsDB: protocols,
            };
        }


        case SAVE_LOGIN_USER: {
            const { user } = action.payload;
            return {
                ...state,
                logedinUser: user,
            };
        }

        case SAVE_LOGOUT_USER: {
            const { user } = action.payload;
            return {
                ...state,
                logedinUser: user,
            };
        }


        default:
            return state;
    }
};

export default staticDataReducers;