import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface ProfileHeaderProps {
    name: string;
    caption: string;
    skills?: string[];
}

const ProfileHeader = (props: ProfileHeaderProps) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h3" sx={{ mb: 0 }} color="primary">
                    Há mais de 17 anos focado <br></br>em desenvolvimento
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProfileHeader;
