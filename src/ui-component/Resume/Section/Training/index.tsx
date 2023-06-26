import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from 'store';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useTheme } from '@mui/material/styles';

const Icons = { 
    'StorageIcon': StorageIcon,
    'SecurityIcon': SecurityIcon,
    'DataObjectIcon': DataObjectIcon,
    'CodeIcon': CodeIcon
};

const LoadableIcon = ({ icon, props }) => {
    const Icon = Icons[icon];
    return <Icon {...props} />;
};

export interface ResumeSectionTrainingProps {
    inline: boolean;
    title: string;
    label: string;
    overline: string;
    startAt: string;
    endAt: string;
    icon: any;
    description: string;
    sx?: any;
    contentSX: any;
    last: boolean;    
}
const ResumeSectionTraining = (props: ResumeSectionTrainingProps) => {
    const theme = useTheme();    
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
        <Grid 
            container 
            direction="row"
            sx={{...props.sx}}
        >
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
                            height: !props.inline ? 'calc(100% - 22px)' : 'calc(100% - 20px)',
                            display: 'block',
                            position: 'absolute',
                            left: '9px',
                            bottom: !props.inline ? '-6px' : '-8px',
                            borderRadius: '32px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <LoadableIcon icon={props.icon} props={{ fontSize: 'small', color: 'primary' }} />
                </Box>                
            </Grid>
            <Grid 
                item
                sx={{ 
                    width: props.inline ? 'calc(100% - 160px)' : 'calc(100% - 60px)',
                    ...props.contentSX
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <Typography color="primary" component="h6" sx={{ mt: '-1px' }}>
                            <FormattedMessage id={props.title} />                    
                        </Typography> 
                        <Typography variant="caption" color="primary" sx={{ mt: '4px', lineHeight: '1', position: 'relative', display: 'block' }}>
                            {props.label}
                        </Typography>                                       
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" component="div" sx={{ pt: '6px', lineHeight: '1', position: 'relative' }}>
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
                        <Typography variant="body1" sx={{ mt: '8px', whiteSpace: 'pre-line' }}>
                            <FormattedMessage id={props.description} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeSectionTraining;
