import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Chip from 'ui-component/Resume/Chip';
import { RootState } from 'store';

export interface ResumeSectionProjectProps {
    title: string;
    startAt: string;
    endAt: string;
    description: string;
    github: string;
    skills: string[];
    children?: JSX.Element;
    sx: any;
}
const ResumeSectionProject = (props: ResumeSectionProjectProps) => {
    const sortedSkills = props.skills.sort();

    const momentStartAt = useRef(moment(props.startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(props.endAt ? moment(props.endAt, 'YYYY-MM-DD') : null);

    const [_startAt, _setStartAt] = useState({
        month: momentStartAt.current.format('MMM'),
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        month: momentEndAt.current ? momentEndAt.current.format('MMM') : null,
        year: momentEndAt.current ? momentEndAt.current.format('YYYY') : null
    });

    const lang = useSelector((state: RootState) => state.site.lang);

    useEffect(() => {
        moment.locale(lang);
        momentStartAt.current = moment(props.startAt, 'YYYY-MM-DD');
        momentEndAt.current = props.endAt ? moment(props.endAt, 'YYYY-MM-DD') : null;

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current ? momentEndAt.current.format('MMM') : null
            }
        });
    }, [lang]);

    return (
        <Grid container direction="row">
            <Grid 
                item 
                sx={{                     
                    position: 'relative',
                    ...props.sx
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <Typography color="primary" component="h6" sx={{ mt: '1px' }}>
                            <FormattedMessage id={props.title} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" sx={{ top: '-5px', mb: '0px', position: 'relative' }}>
                            <FormattedMessage 
                                id={_endAt.year ? 'app.date.month_year.interval' : 'app.date.month_year.interval_open'} 
                                values={{ 
                                    start_at_month: _startAt.month,
                                    start_at_year: _startAt.year,
                                    end_at_month: _endAt.month,
                                    end_at_year: _endAt.year
                                }} 
                            />
                        </Typography>
                    </Grid>
                    <Grid item sx={{ mb: '6px', mt: '-8px' }}>
                        <Link href={props.github} target="_blank">{props.github}</Link>
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
            {props.children!}
        </Grid>
    );
};

export default ResumeSectionProject;
