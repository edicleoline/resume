import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const useDevice = () => {
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up('md'));

    return [isMobile];
};