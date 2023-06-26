import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { Main, Container, HeaderContainer, HeaderMobileContainer, HeaderMobileToolbarContainer, HeaderMobileNavContainer } from './styles';
import Header from './Header';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import setHeaderPosition from 'store/actions/setHeaderPosition';
import { useAppSelector } from 'hooks/useAppSelector';
import { RootState } from 'store';
import HeaderNavMobile from './HeaderMobile/Nav';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderMobile from './HeaderMobile';
import setHeaderVisibility from 'store/actions/setHeaderVisibility';
import setHeaderOpened from 'store/actions/setHeaderOpened';
import Backdrop from '@mui/material/Backdrop';

export const HEADER_HEIGHT = 60;
export const HEADER_MOBILE_HEIGHT = 80;

const MainLayout = () => {
    const theme = useTheme();
    const mobile = !useMediaQuery(theme.breakpoints.up('md'));
    const [isMobile] = useDevice();
    const dispatch = useAppDispatch();
    const headerState = useAppSelector((state: RootState) => state.site.header);

    useEffect(() => {
        if (isMobile) {
            dispatch(setHeaderPosition('bottom'));
        } else {
            dispatch(setHeaderPosition('top'));
        }
    }, [mobile]);    

    const headerHeight = () => {
        if (!isMobile) return `${HEADER_HEIGHT}px`;
        if (isMobile && !headerState.opened) return `${HEADER_MOBILE_HEIGHT}px`;
        return '70vh';
    };

    const actionSheetOpened = useAppSelector((state: RootState) => state.site.actionSheetOpened);

    useEffect(() => {
        dispatch(setHeaderOpened(false));
        dispatch(setHeaderVisibility(!actionSheetOpened));
    }, [actionSheetOpened]);

    const [backdropIsOpen, setBakdropIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setBakdropIsOpen(headerState.opened);
    }, [headerState.opened]);

    const headerBottom = () => {
        if (!isMobile) return 'auto';
        if (isMobile && !headerState.visible) return `-${HEADER_MOBILE_HEIGHT}px`;
        return '0';
    };

    const handleBackdropClose = () => {
        dispatch(setHeaderOpened(false));
    };

    return (
        <Container
            theme={theme}
            sx={{
                bgcolor: theme.palette.background.default
            }}
        >
            <CssBaseline />
            <AppBar
                enableColorOnDark
                color="inherit"
                elevation={0}
                sx={{
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    top: isMobile ? 'auto' : '0',
                    bottom: headerBottom(),
                    borderRadius: isMobile ? '12px 12px 0 0' : '0',
                    maxHeight: '400px',
                    height: headerHeight(),
                    bgcolor: theme.palette.primary.dark,
                    zIndex: theme.zIndex.drawer + 2
                }}
            >
                <Toolbar
                    sx={{
                        padding: '0 !important'
                    }}
                >
                    {!isMobile && (
                        <HeaderContainer>
                            <Header  />
                        </HeaderContainer>
                    )}
                    {mobile && (
                        <HeaderMobileContainer>
                            <HeaderMobileToolbarContainer>
                                <HeaderMobile />
                            </HeaderMobileToolbarContainer>
                            <HeaderMobileNavContainer>
                                <AnimatePresence
                                    initial={false}
                                    mode="wait"
                                >
                                    {(isMobile && headerState.opened) && (
                                        <HeaderNavMobile />
                                    )}
                                </AnimatePresence>
                            </HeaderMobileNavContainer>
                        </HeaderMobileContainer>
                    )}
                </Toolbar>
            </AppBar>
            <Main
                theme={theme}
                sx={{
                    marginTop: { md: '60px', xs: '0' },
                }}
            >
                <Outlet />
            </Main>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropIsOpen}
                onClick={handleBackdropClose}
            />
        </Container>
    );
};

export default MainLayout;
