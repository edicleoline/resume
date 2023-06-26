
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

export interface ProfileBodyProps {
    overlines?: string[];
    about: string;
}
const ProfileBody = (props: ProfileBodyProps) => {
    return (
        <>
            <Grid item>
                <Grid container direction="row">
                    {props.overlines?.map((overline, index) => (
                        <Grid key={index} item sx={{ mr: 1.2 }}>
                            <Grid container direction="row">
                                <Grid item>
                                    <Typography variant="overline" sx={{ lineHeight: 'initial' }}>
                                        <FormattedMessage id={overline} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>              
            </Grid>
            <Grid item>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    <FormattedMessage id={props.about} />
                </Typography>
            </Grid>
        </>
    );
};

export default ProfileBody;
