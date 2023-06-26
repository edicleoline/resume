import { SET_THEME } from './types';
import { Theme } from 'themes';

const setTheme = (theme: Theme) => {
    return {
        type: SET_THEME,
        theme: theme
    };
};

export default setTheme;
