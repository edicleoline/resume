import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import moment from 'moment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Chip from 'ui-component/Resume/Chip';
import { RootState } from 'store';
import { useTheme } from '@mui/material/styles';

export interface ResumeSectionWorkExperienceCompany {
    name: string;
}
export interface ResumeSectionWorkExperiencePosition {
    title: string;
}
export interface ResumeSectionWorkExperienceProps {
    inline: boolean;
    position: ResumeSectionWorkExperiencePosition;
    company: ResumeSectionWorkExperienceCompany;
    startAt: string;
    endAt: string;
    skills: string[];
    description: string;
    last: boolean;    
}
const ResumeSectionWorkExperience = (props: ResumeSectionWorkExperienceProps) => {
    const theme = useTheme();
    const sortedSkills = props.skills.sort();

    const momentStartAt = useRef(moment(props.startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(moment(props.endAt, 'YYYY-MM-DD'));

    const [_startAt, _setStartAt] = useState({
        month: momentStartAt.current.format('MMM'),
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        month: momentEndAt.current.format('MMM'),
        year: momentEndAt.current.format('YYYY')
    });

    const lang = useSelector((state: RootState) => state.site.lang);

    useEffect(() => {
        moment.locale(lang);
        momentStartAt.current = moment(props.startAt, 'YYYY-MM-DD');
        momentEndAt.current = moment(props.endAt, 'YYYY-MM-DD');

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current.format('MMM')
            }
        });
    }, [lang]);

    return (
        <Grid container direction="row">
            <Grid item sx={{ width: '28px', position: 'relative', ml: '30px' }}>
                <Typography
                    variant="caption" 
                    sx={{ 
                        position: 'absolute',
                        left: '-34px',
                        marginTop: '2px'
                    }}
                >
                    {_endAt.year}
                </Typography>
                <Box
                    sx={{
                        "&.MuiBox-root::after": {
                            content: '""',
                            backgroundColor: !props.last ? theme.palette.primary[200] : 'transparent',
                            width: '3px',
                            height: !props.inline ? 'calc(100% - 40px)' : 'calc(100% - 40px)',
                            display: 'block',
                            position: 'absolute',
                            left: '9px',
                            bottom: !props.inline ? '10px' : '8px',
                            borderRadius: '32px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <BusinessCenterIcon 
                        fontSize="small" 
                        color="primary" 
                    />
                </Box>                
            </Grid>
            <Grid 
                item 
                sx={{ 
                    width: 'calc(100% - 76px)', 
                    pb: !props.last ? '24px' : '6px'
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <Typography color="primary" component="h6" sx={{ mt: '1px' }}>                            
                            <FormattedMessage id={props.position.title} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="primary" sx={{ mt: '3px', lineHeight: '1' }}>
                            {props.company.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" component="div" sx={{ top: '4px', mb: '14px', position: 'relative', lineHeight: '1' }}>
                            <FormattedMessage 
                                id={'app.date.month_year.interval'} 
                                values={{ 
                                    start_at_month: _startAt.month,
                                    start_at_year: _startAt.year,
                                    end_at_month: _endAt.month,
                                    end_at_year: _endAt.year
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" sx={{ mt: '3px', whiteSpace: 'pre-line' }}>                            
                            <FormattedMessage id={props.description} />
                        </Typography>
                    </Grid>
                    <Grid item sx={{ mt: '10px' }}>                        
                        {sortedSkills.map((skill, index) => (                                
                            <Chip 
                                key={index} 
                                label={<FormattedMessage id={`app.skill.${skill}`} />} 
                                color="primary" 
                                size="small" 
                                sx={{ 
                                    marginRight: '3px', 
                                    marginBottom: '3px' 
                                }} 
                            />
                        ))}                                                      
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeSectionWorkExperience;
