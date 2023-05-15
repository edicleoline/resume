import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes';
import themes from './themes';
import NavigationScroll from './layout/NavigationScroll';
import setLang from './store/actions/setLang';
import { store } from './store';
import { useEffect, useState, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { locale, messages } from './i18n';
import { DEFAULT_LOCALE } from './i18n/index';
import moment from 'moment';
import localizationFr from 'moment/locale/fr';
import localizationPt from 'moment/locale/pt';

moment.updateLocale('fr', localizationFr);
moment.updateLocale('pt', localizationPt);

const App = () => {    
    const customization = useSelector((state) => state.customization);    
    const site = useSelector((state) => state.site);

    useEffect(() => {
        if (!site.lang) {
            moment.locale(DEFAULT_LOCALE);
            store.dispatch(setLang(DEFAULT_LOCALE));            
        } else {
            moment.locale(site.lang);
        }
    }, [site]);
    
    return (
        <IntlProvider locale={site.lang} messages={messages[site.lang]}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </IntlProvider>        
    );
};

export default App;
