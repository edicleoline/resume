import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { motion } from "framer-motion";

export const NavContainer = styled(motion.nav)({
    display: 'flex'
});

export const NavUl = styled(motion.ul)({
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexDirection: 'column'
});

export const NavLi = styled(motion.li)({
    margin: '0'
});

export const NavLiWrapper = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'    
});

export const NavLink = styled(Link)({
    position: 'relative',
    padding: '4px 0',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
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