import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import LogoSection from '../LogoSection';
import HeaderNav from './Nav';
import HeaderRightSide from './RightSide';

const Header = () => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    width: 90,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </Box>

            <HeaderNav />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />            
            <HeaderRightSide />
        </>
    );
};

export default Header;
