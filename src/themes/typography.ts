export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily,
        h6: {
            fontWeight: 500,
            color: theme.text?.dark,
            fontSize: '0.75rem'
        },
        h5: {
            fontSize: '0.875rem',
            color: theme.text?.dark,
            fontWeight: 500
        },
        h4: {
            fontSize: '1rem',
            color: theme.text?.dark,
            fontWeight: 600
        },
        h3: {
            fontSize: '1.25rem',
            color: theme.text?.dark,
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color: theme.text?.dark,
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color: theme.text?.dark,
            fontWeight: 700
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'red'
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: 'red'
        },
        caption: {
            fontSize: '0.75rem',
            color: theme.text?.secondary,
            fontWeight: 400
        },
        body1: {
            letterSpacing: '0em',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.primary.main
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            fontSize: '0.875rem',
            color: theme.primary.light
        },
        overline: {
            color: theme.primary.light,
            lineHeight: '1.2em',
        },
        button: {
            textTransform: 'capitalize' as const
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey[500],
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        }
    };
}
