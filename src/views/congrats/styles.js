import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const MainContainer = styled(Box)(() => ({
    backgroundColor: '#F0F1F2', 
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex'
}));

export const Wrapper = styled(Container)(() => ({
    pt: 0,
    paddingLeft: '4px',
    paddingRight: '4px'
}));

export const BigTextWrapper = styled(Box)(() => ({
    maxWidth: '600px',
    margin: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px'
}));

export const bigTextStyle = (mobile) => {    
    return {
        display: 'inline-block',
        fontSize: mobile ? '1.5rem' : '2rem',
        lineHeight: mobile ? '1.8rem' : '2.5rem',
        fontWeight: 500,
        whiteSpace: 'pre-line'
    }
};