import { Container, GridContainer } from "./styles";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import { IconRss } from '@tabler/icons-react';
import { useAppDispatch } from "hooks/useAppDispatch";
import setTheme from "store/actions/setTheme";
import { useState } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { RootState } from "store";
import { useTheme } from "@mui/material/styles";
import setHeaderOpened from "store/actions/setHeaderOpened";

const HeaderRightSide = () => {
    const theme = useTheme();
    const themeName = useAppSelector((state: RootState) => state.site.theme);
    const dispatch = useAppDispatch();

    const [isToggled, setToggle] = useState(themeName === 'dark');
    
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
                        toggled={isToggled}
                        toggle={setToggle}
                        className="header-btn--theme-toggle"
                        onToggle={handleThemeOnToggle}
                    />
                    <IconButton
                        aria-label="rss"
                        color="secondary"
                        sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        <IconRss size={22} />
                    </IconButton>
                </Stack>
            </GridContainer>
        </Container>
    );
};

export default HeaderRightSide;
