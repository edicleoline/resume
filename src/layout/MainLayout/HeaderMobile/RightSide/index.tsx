import { Container, GridContainer } from "./styles";
import Stack from '@mui/material/Stack';
import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import { useAppDispatch } from "hooks/useAppDispatch";
import setTheme from "store/actions/setTheme";
import { useState } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { RootState } from "store";
import { Pivot as Hamburger } from 'hamburger-react';
import { useTheme } from "@mui/material/styles";
import setHeaderOpened from "store/actions/setHeaderOpened";

const HeaderRightSide = () => {
    const theme = useTheme();
    const themeName = useAppSelector((state: RootState) => state.site.theme);
    const headerState = useAppSelector((state: RootState) => state.site.header);
    const dispatch = useAppDispatch();

    const [themeIsToggled, setThemeIsToggle] = useState(themeName === 'dark');
    
    const handleThemeOnToggle = (dark: boolean) => {
        const toggleTheme = async () => {
            dispatch(setTheme(dark ? 'dark' : 'light'));
        };
        toggleTheme();
    };

    const onHamburgerToggle = (toggled: boolean) => {
        dispatch(setHeaderOpened(toggled));
    };

    return (
        <Container>
            <GridContainer
                container
                direction="row"
            >                
                <Stack direction="row" spacing={1}>
                    <Around
                        duration={750}
                        toggled={themeIsToggled}
                        toggle={setThemeIsToggle}
                        className="header-btn--theme-toggle"
                        onToggle={handleThemeOnToggle}
                    />
                    <Hamburger
                        color={theme.palette.secondary.main}
                        size={22}
                        toggled={headerState.opened}
                        onToggle={onHamburgerToggle}
                    />
                </Stack>
            </GridContainer>
        </Container>
    );
};

export default HeaderRightSide;
