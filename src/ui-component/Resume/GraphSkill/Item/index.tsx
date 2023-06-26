import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from 'ui-component/Resume/Chip';
import LinearProgress from 'ui-component/LinearProgress';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';

export interface GraphSkillTranslator {
    text: string;
    values?: any;
}

export type GraphSkillProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface GraphSkillProgress {
    value: number;
    variant: GraphSkillProgressVariant;
}

export interface GraphSkillItemProps {
    inline: boolean;
    title: string;
    label: GraphSkillTranslator;
    progress: GraphSkillProgress;
    last: boolean;
}
const GraphSkillItem = (props: GraphSkillItemProps) => {  
    const theme = useTheme();  
    return (
        <Box sx={{ maxHeight: props.inline ? '30px' : 'initial' }}>
            <Grid 
                container 
                direction="row" 
                alignItems="center" 
                alignContent="flex-start" 
                sx={{ 
                    mb: !props.last ? '6px' : 0
                }}
            >
                <Grid item xs={12} md={4}>
                    <Grid container direction="row" alignItems="center" alignContent="flex-start">
                        <Grid item>
                            <Chip label={<FormattedMessage id={props.title} />} color="primary" size="small" sx={{ mr: '12px' }} />
                        </Grid>
                        <Grid item sx={{ position: 'relative' }}>
                            <Typography variant="body2" sx={{ m: 0 }} component="span">
                                <FormattedMessage id={props.label.text} values={props.label.values} />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8} sx={[ !props.inline && { mb: '6px', mt: '4px' }]}>
                    <LinearProgress 
                        variant={props.progress.variant} 
                        value={props.progress.value} 
                        valueBuffer={props.progress.value + 3}
                        color="primary"
                        theme={theme}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default GraphSkillItem;
