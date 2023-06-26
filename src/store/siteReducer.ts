import * as types from './actions/types';
import { DEFAULT_LOCALE, Lang } from '../i18n/index';
import { Theme } from 'themes';

export type HeaderPosition = 'top' | 'bottom';

export interface HeaderState {
    position: HeaderPosition;
    opened: boolean;
    visible: boolean;
};

export interface SiteState {
    lang: Lang;
    theme: Theme;
    header: HeaderState;
    actionSheetOpened: boolean;
};

export const initialState: SiteState = {
    lang: DEFAULT_LOCALE,
    theme: 'dark',
    header: {
        position: 'top',
        opened: false,
        visible: true
    },
    actionSheetOpened: false
};

const siteReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_LANG:
            return {
                ...state,
                lang: action.lang
            };
        case types.SET_THEME:
            return {
                ...state,
                theme: action.theme
            };
        case types.SET_ACTION_SHEET_OPENED:
            return {
                ...state,
                actionSheetOpened: action.opened
            };
        case types.SET_HEADER_POSITION:
            return {
                ...state,
                header: {
                    ...state.header,
                    position: action.position
                }
            }
        case types.SET_HEADER_OPENED:
            return {
                ...state,
                header: {
                    ...state.header,
                    opened: action.opened
                }
            }
        case types.SET_HEADER_VISIBILITY:
            return {
                ...state,
                header: {
                    ...state.header,
                    visible: action.visible
                }
            }
        default:
            return state;
    }
};

export default siteReducer;
