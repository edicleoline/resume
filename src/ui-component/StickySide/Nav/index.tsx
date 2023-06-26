import { Typography } from "@mui/material";
import { Nav, Title } from "./styles";

export interface StickySideNavProps {
    children?: JSX.Element,
    title?: JSX.Element | string;
}
const StickySideNav = (props: StickySideNavProps) => {
    return (
        <Nav>
            {props.title && (<Title>{props.title}</Title>)}
            {props.children!}
        </Nav>
    );
};

export default StickySideNav;
