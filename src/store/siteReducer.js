import * as types from './actions/types';

export const initialState = {
    lang: null
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LANG:
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
};

export default siteReducer;
