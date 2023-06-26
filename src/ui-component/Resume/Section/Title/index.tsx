
import Typography from '@mui/material/Typography';

const ResumeSectionTitle = ({ children, style }) => {
    return (
        <Typography 
            variant="h2" 
            color="primary"
            sx={{ 
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04rem',
                marginBottom: '24px'
            }}
            style={style}
        >
            {children}                    
        </Typography>
    );
};

export default ResumeSectionTitle;
