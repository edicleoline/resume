import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes';
import { themes } from './themes';
import NavigationScroll from './layout/NavigationScroll';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n';
import moment from 'moment';
// import localizationFr from 'moment/locale/fr';
// import localizationPt from 'moment/locale/pt';
import { useAppSelector } from 'hooks/useAppSelector';
import { RootState } from 'store';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

// moment.updateLocale('fr', localizationFr);
// moment.updateLocale('pt', localizationPt);

const App = () => {    
    // const customization = useSelector((state) => state.customization);    
    // const site = useSelector((state) => state.site);

    // useEffect(() => {
    //     if (!site.lang) {
    //         moment.locale(DEFAULT_LOCALE);
    //         store.dispatch(setLang(DEFAULT_LOCALE));            
    //     } else {
    //         moment.locale(site.lang);
    //     }
    // }, [site]);

    const lang = useAppSelector((state: RootState) => state.site.lang);
    const theme = useAppSelector((state: RootState) => state.site.theme);

    useEffect(() => {
        document.getElementsByTagName('html')[0].setAttribute('data-color-mode', theme);
    }, [theme]);
    
    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(theme === 'dark')}>
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
