import { SxProps, useTheme } from "@mui/material/styles";
import { NavContainer, NavLi, NavLiActiveIndicator, NavLiWrapper, NavLink, NavUl } from "./styles";
import { motion, Variants } from "framer-motion";
import { IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export interface HeaderNavProps {
    sx?: SxProps
}
const HeaderMobileNav = (props: HeaderNavProps) => {
    const theme = useTheme();
    const items = [
        { text: 'Últimas', active: false, href: '/latest' },
        { text: 'Posts', active: false, href: '/posts' },
        { text: 'Currículo', active: true, href: '/resume' },
        { text: 'Cursos', active: false, href: '/courses' }
    ];

    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <NavContainer initial={false} animate={isOpen ? "open" : "closed"} sx={props.sx!}>
            <NavUl 
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
            >
                {items.map((item, index) => (
                    <NavLi key={index} variants={itemVariants}>
                        <NavLiWrapper>
                            <NavLink href={item.href} color="secondary">
                                <Grid container direction="row" alignItems="center" sx={{ height: '29px' }}>
                                    {item.active && (
                                        <Grid item>
                                            <IconArrowRight 
                                                style={{ 
                                                    marginLeft: '-3px', 
                                                    marginRight: '4px', 
                                                    position: 'relative', 
                                                    top: '3px' 
                                                }} />
                                        </Grid>
                                    )}
                                    <Grid item>{item.text}</Grid>
                                </Grid>
                            </NavLink>
                        </NavLiWrapper>
                    </NavLi>
                ))}
            </NavUl>
        </NavContainer>
    );
};

export default HeaderMobileNav;
