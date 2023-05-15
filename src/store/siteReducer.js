import * as types from './actions/types';
import { DEFAULT_LOCALE } from './../i18n/index';

export const initialState = {
    lang: DEFAULT_LOCALE
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
