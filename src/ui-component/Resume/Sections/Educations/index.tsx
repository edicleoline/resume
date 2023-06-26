import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import data from 'data/resume.json';
import ResumeSectionEducation from 'ui-component/Resume/Section/Education';
import { SxProps } from '@mui/system';

const educations = data?.education?.items;

export interface ResumeSectionEducationsProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionEducations = (props: ResumeSectionEducationsProps) => {
    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <ResumeSectionTitle style={{}}>                            
                            <FormattedMessage id="app.resume.education.title" />
                        </ResumeSectionTitle>
                    </Grid>                    
                    <Grid item>
                        {educations.map((education, index) => (
                            <ResumeSectionEducation
                                key={index}
                                title={education.title}
                                label={education.label}
                                overline={education.overline}
                                startAt={education.start_at}
                                endAt={education.end_at}
                            />  
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeSectionEducations;
