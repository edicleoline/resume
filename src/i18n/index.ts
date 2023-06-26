import translationsPt from './translations/pt.json';
import translationsEn from './translations/en.json';

export type Lang = 'pt' | 'en';

const DEFAULT_LOCALE: Lang = 'pt';

const messages = {
    pt: translationsPt,
    en: translationsEn
};

export { DEFAULT_LOCALE, messages };
