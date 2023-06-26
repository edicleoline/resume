import { SxProps, useTheme } from "@mui/material/styles";
import { NavContainer, NavLi, NavLiActiveIndicator, NavLiWrapper, NavLink, NavUl } from "./styles";

export interface HeaderNavProps {
    sx?: SxProps
}
const HeaderNav = (props: HeaderNavProps) => {
    const theme = useTheme();
    const items = [
        { text: 'Últimas', active: false, href: '/latest' },
        { text: 'Posts', active: false, href: '/posts' },
        { text: 'Currículo', active: true, href: '/resume' },
        { text: 'Cursos', active: false, href: '/courses' }
    ];
    return (
        <NavContainer sx={props.sx!}>
            <NavUl>
                {items.map((item, index) => (
                    <NavLi key={index}>
                        <NavLiWrapper>
                            <NavLink href={item.href} color="secondary">{item.text}</NavLink>
                            {item.active && (
                                <NavLiActiveIndicator theme={theme} />
                            )}
                        </NavLiWrapper>
                    </NavLi>
                ))}
            </NavUl>
        </NavContainer>
    );
};

export default HeaderNav;
