import { SET_LANG } from './types';

const setLang = (lang) => {
    return {
        type: SET_LANG,
        lang: lang
    };
};

export default setLang;
