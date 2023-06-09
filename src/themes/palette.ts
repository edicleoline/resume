export function themePaletteLight(colors) {
    return {
        common: {
            black: colors?.darkPaper
        },
        primary: {
            light: colors?.primaryLight,
            main: colors?.primaryMain,
            dark: colors?.primaryDark,
            200: colors?.primary200,
            800: colors?.primary800
        },
        secondary: {
            light: colors?.secondaryLight,
            main: colors?.secondaryMain,
            dark: colors?.secondaryDark,
            200: colors?.secondary200,
            800: colors?.secondary800
        },
        error: {
            light: colors?.errorLight,
            main: colors?.errorMain,
            dark: colors?.errorDark
        },
        warning: {
            light: colors?.warningLight,
            main: colors?.warningMain,
            dark: colors?.warningDark
        },
        success: {
            light: colors?.successLight,
            200: colors?.success200,
            main: colors?.successMain,
            dark: colors?.successDark
        },
        grey: {
            50: colors?.grey50,
            100: colors?.grey100,
            500: colors?.grey500,
            600: colors?.grey900,
            700: colors?.grey700,
            900: colors?.grey900
        },
        dark: {
            light: colors?.grey900,
            main: colors?.darkLevel1,
            dark: colors?.darkLevel2,
            800: colors?.darkBackground,
            900: colors?.darkPaper
        },
        text: {
            primary: colors?.grey900,
            secondary: colors?.grey500,
            dark: colors?.grey900,
            hint: colors?.grey100
        },
        background: {
            paper: colors?.paper,
            default: colors?.paper
        }
    };
}

export function themePaletteDark(colors) {
    return {
        common: {
            black: colors?.darkPaper
        },
        primary: {
            light: colors?.darkPrimaryLight,
            main: colors?.darkPrimaryMain,
            dark: colors?.darkPrimaryDark,
            200: colors?.darkPrimary200,
            800: colors?.darkPrimary800
        },
        secondary: {
            light: colors?.darkSecondaryLight,
            main: colors?.darkSecondaryMain,
            dark: colors?.darkSecondaryDark,
            200: colors?.darkSecondary200,
            800: colors?.darkSecondary800
        },
        error: {
            light: colors?.errorLight,
            main: colors?.errorMain,
            dark: colors?.errorDark
        },
        warning: {
            light: colors?.warningLight,
            main: colors?.warningMain,
            dark: colors?.warningDark
        },
        success: {
            light: colors?.successLight,
            200: colors?.success200,
            main: colors?.successMain,
            dark: colors?.successDark
        },
        grey: {
            50: colors?.grey50,
            100: colors?.grey100,
            500: colors?.grey500,
            600: colors?.grey900,
            700: colors?.grey700,
            900: colors?.grey900
        },
        dark: {
            light: colors?.darkTextPrimary,
            main: colors?.darkLevel1,
            dark: colors?.darkLevel2,
            800: colors?.darkBackground,
            900: colors?.darkPaper
        },
        text: {
            primary: colors?.darkTextPrimary,
            secondary: colors?.grey500,
            dark: colors?.grey100,
            hint: colors?.grey100
        },
        background: {
            paper: colors?.darkPaper,
            default: colors?.darkBackground
        }
    };
}
