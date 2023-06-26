import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

export const NavContainer = styled('nav')({
    display: 'flex'
});

export const NavUl = styled('ul')({
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
});

export const NavLi = styled('li')({
    margin: '0 16px'
});

export const NavLiWrapper = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'    
});

export const NavLink = styled(Link)({
    position: 'relative',
    padding: '10px 0',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    height: '60px',
    alignItems: 'center',
    display: 'flex'
});

export const NavLiActiveIndicator = styled('div')(({ theme }) => ({
    position: 'absolute',
    height: '2px',
    width: '100%',
    background: theme.palette.secondary.main,
    bottom: '2px'
}));