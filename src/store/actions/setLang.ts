import { Lang } from 'i18n';
import { SET_LANG } from './types';

const setLang = (lang: Lang) => {
    return {
        type: SET_LANG,
        lang: lang
    };
};

export default setLang;
