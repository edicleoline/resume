import ptTranslationMessages from '../i18n/translations/pt.json';
import enTranslationMessages from '../i18n/translations/en.json';

const DEFAULT_LOCALE = 'pt';

const messages = {
    pt: ptTranslationMessages,
    en: enTranslationMessages
};

const locale = () => {
    return DEFAULT_LOCALE;
};

export { DEFAULT_LOCALE, locale, messages };
