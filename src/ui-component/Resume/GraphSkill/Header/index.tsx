import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

export interface GraphSkillItemProps {
    inline: boolean;
    labels: string[];
}
const GraphSkillsHeader = (props: GraphSkillItemProps /*{ mobile, title, label, progressValue, last = false, progressVariant = 'determinate' }*/) => {    
    return (
        <Grid container direction="row">
            <Grid item xs={4}>
                <Typography variant="overline" sx={{ mt: 1 }}>
                    <FormattedMessage id="app.resume.graph_skills.header.main" />
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container direction="column">
                    <Grid item sx={{ alignSelf: 'center' }}>
                        <Typography variant="overline" sx={{ mt: 1 }}>
                            <FormattedMessage id="app.resume.graph_skills.header.experience_time" />
                        </Typography>
                    </Grid>
                    {props.inline && (
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" sx={{ fontSize: '12px' }}>
                                {props.labels.map((label, index) => (
                                    <Grid item key={index}>                                        
                                        <Typography variant="overline">
                                            {label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            {!props.inline && (
                <Grid item sx={{ flex: 1, mb: '8px' }}>
                    <Grid container direction="row" justifyContent="space-between" sx={{ fontSize: '12px' }}>
                        {props.labels.map((label, index) => (
                            <Grid item key={index}>
                                <Typography variant="overline">
                                    {label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default GraphSkillsHeader;
