import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { Grid } from '@mui/material';

export const ShareButtonBase = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
           border: '4px solid currentColor',
        },
    },
}));

export const ShareButtonGrid = styled(Grid)(({ theme }) => ({
    flex: 1,
    textAlign: 'center'
}));