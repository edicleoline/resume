import { styled } from '@mui/material/styles';
import { keyframes } from "@emotion/react";
import { default as MaterialLinearProgress } from '@mui/material/LinearProgress';

const indeterminate1Keyframes = keyframes({    
    "0%": {
        opacity: 1,
        backgroundPosition: "0 -23px"
    },
    "100%": {
        opacity: 1,
        backgroundPosition: "-200px -23px"
    }
});

const LinearProgress = styled(MaterialLinearProgress)(({ theme }) => ({
    borderRadius: 3,
    "& .MuiLinearProgress-dashed": {
        animation: `${indeterminate1Keyframes} 3s infinite linear`,
        backgroundImage: `radial-gradient(${theme.palette.primary[200]} 0%, ${theme.palette.primary[200]} 26%, transparent 26%)`
    },
    "& .MuiLinearProgress-bar2Buffer": {
        backgroundColor: theme.palette.primary.light
    }
}));

export default LinearProgress;
