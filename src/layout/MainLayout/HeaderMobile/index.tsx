import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import LogoSection from '../LogoSection';
import HeaderRightSide from './RightSide';

const HeaderMobile = () => {
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
                <Box component="span" sx={{ flexGrow: 1, position: 'relative', top: '4px' }}>
                    <LogoSection />
                </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            <HeaderRightSide />
        </>
    );
};

export default HeaderMobile;
