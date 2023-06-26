import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const ProfileRowContainer = styled(Grid)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

export const ProfileRowWrapper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    width: '100%',
    boxShadow: 'none',
    position: 'relative',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent'
}));