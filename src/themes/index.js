import { createTheme } from '@mui/material/styles';

// import colors from 'assets/scss/_themes-vars.module.scss';
// import componentStyleOverrides from './compStyleOverride';
// import themePalette from './palette';
// import themeTypography from './typography';

export const theme = (customization) => {
    const themeOptions = {
        direction: 'ltr',
        palette: {
            primary: {
              main: '#333333',
            },
            secondary: {
              main: '#19857b',
            },
            error: {
              main: '#999',
            },
        },
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: {
            fontFamily: `'Roboto', sans-serif`
        }
    };

    const themes = createTheme(themeOptions);

    return themes;
};

export default theme;



