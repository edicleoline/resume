import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import data from 'data/resume.json';
import ResumeSectionWorkTraining from 'ui-component/Resume/Section/Training';
import { SxProps } from '@mui/system';

const _data: any = data;
const trainings = _data?.training?.items;

export interface ResumeSectionTrainingsProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionTrainings = (props: ResumeSectionTrainingsProps) => {
    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <ResumeSectionTitle style={{}}>
                            <FormattedMessage id="app.resume.trainings.title" />
                        </ResumeSectionTitle>
                    </Grid>
                    <Grid item>
                        <Grid 
                            container 
                            direction="column"
                            alignItems="start"
                        >
                            {trainings?.map((t, index) => (
                                <Grid 
                                    item key={index} 
                                    sx={{ 
                                        mb: index + 1 < trainings?.length ? '16px' : '0',
                                        width: '100%'
                                    }}
                                >
                                    <ResumeSectionWorkTraining 
                                        inline={props.inline}
                                        title={t.title} 
                                        label={t.label} 
                                        overline={t.overline} 
                                        startAt={t.start_at} 
                                        endAt={t.end_at}
                                        icon={t.icon} 
                                        description={t.description}
                                        last={index >= trainings?.length - 1}
                                        contentSX={{
                                            pb: index < trainings?.length - 1 ? '10px' : '0'
                                        }}
                                    />
                                </Grid>                                
                            ))}
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeSectionTrainings;
