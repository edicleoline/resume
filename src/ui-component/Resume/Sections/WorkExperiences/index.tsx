import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import data from 'data/resume.json';
import ResumeSectionWorkExperience from 'ui-component/Resume/Section/WorkExperience';
import { SxProps } from '@mui/system';

const _data: any = data;
const experiences = _data?.experiences?.items;

export interface ResumeSectionWorkExperiencesProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionWorkExperiences = (props: ResumeSectionWorkExperiencesProps) => {
    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid item>
                                <ResumeSectionTitle style={{}}>
                                    <FormattedMessage id="app.resume.work_experiences.title" />
                                </ResumeSectionTitle>
                            </Grid>
                        </Grid>
                    </Grid>                    
                    <Grid item>
                        <Grid container direction="column">
                            {experiences.map((experience, index) => (
                                <Grid item key={index}>
                                    <ResumeSectionWorkExperience
                                        inline={props.inline}
                                        position={{ ...experience.position, title: experience.position.title }}
                                        company={experience.company} 
                                        startAt={experience.start_at}
                                        endAt={experience.end_at}
                                        description={experience.description}
                                        last={index >= experiences.length - 1}
                                        skills={experience.skills}
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

export default ResumeSectionWorkExperiences;
