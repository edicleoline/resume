import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    
}));

const MainLayout = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />            
            <Main theme={theme} open={true} sx={{ width: '100%' }}>
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
