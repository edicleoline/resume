import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FormattedMessage } from 'react-intl';
import settings from 'data/settings.json';

const ResumeFooter = () => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    sx={{
                        paddingTop: '20px',
                        paddingBottom: '30px'
                    }}
                >
                    <Grid item sx={{ opacity: '0.4' }}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography 
                                    variant="caption" 
                                    component="div" 
                                    sx={{ mb: '-5px', whiteSpace: 'pre-line' }}
                                >
                                    <FormattedMessage id={'app.resume.footer.caption'} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link 
                                    href={settings.site.resume.github.url}
                                    target="_blank"
                                    color="primary"
                                    sx={{
                                        fontSize: '12px',
                                    }}
                                >
                                    {settings.site.resume.github.url}
                                </Link>
                            </Grid>
                        </Grid>    
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeFooter;
