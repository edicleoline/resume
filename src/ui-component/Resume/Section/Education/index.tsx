import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import SchoolIcon from '@mui/icons-material/School';
import moment from 'moment';
import { RootState } from 'store';

export interface ResumeSectionEducationProps {
    title: string;
    label: string;
    overline: string;
    startAt: string;
    endAt: string;
}
const ResumeSectionEducation = (props: ResumeSectionEducationProps) => {
    const momentStartAt = useRef(moment(props.startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(props.endAt ? moment(props.endAt, 'YYYY-MM-DD') : null);

    const [_startAt, _setStartAt] = useState({
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
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
        <Grid container direction="column" sx={{ maxHeight: '76px' }}>
            <Grid container direction="row">
                <Grid item sx={{ width: '28px', position: 'relative', ml: '4px' }}>
                    <Box>
                        <SchoolIcon fontSize="small" color="primary" />
                    </Box>                
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 60px)' }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography color="primary" component="h6" sx={{ mt: '-1px' }}>
                                <FormattedMessage id={props.title} />                                                
                            </Typography> 
                            <Typography variant="caption" color="primary" sx={{ mt: '0px', lineHeight: '1', position: 'relative', display: 'block' }}>
                                <FormattedMessage id={props.label} />
                            </Typography>                                       
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" color="primary" sx={{ mt: '3px', lineHeight: '1' }}>
                                <FormattedMessage id={props.overline} />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="overline" sx={{ top: '-5px', mb: '4px', position: 'relative' }}>
                                <FormattedMessage 
                                    id={_endAt.year ? 'app.date.year.interval' : 'app.date.year.interval_open'} 
                                    values={{ 
                                        start_at_year: _startAt.year,
                                        end_at_year: _endAt.year
                                    }} 
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>  
    );
};

export default ResumeSectionEducation;
