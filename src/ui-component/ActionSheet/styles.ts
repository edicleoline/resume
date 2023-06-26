import { styled } from '@mui/material/styles';
import { a } from 'react-spring';

export const ActionSheetContainer = styled(a.div)(({ theme }) => ({
    zIndex: 9999,
    position: 'fixed',
    left: 0,
    height: 'calc(100vh + 100px)',
    width: '100%',
    borderRadius: '12px 12px 0px',
    background: theme.palette.background.paper,
    touchAction: 'none',
    marginLeft: '0 !important'
}));