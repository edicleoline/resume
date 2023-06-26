import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import data from 'data/resume.json';
import ResumeSectionProject from 'ui-component/Resume/Section/Project';
import { SxProps } from '@mui/system';

const _data: any = data;
const projects = _data?.projects?.items;

export interface ResumeSectionProjectsProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionProjects = (props: ResumeSectionProjectsProps) => {
    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <ResumeSectionTitle style={{}}>
                            <FormattedMessage id="app.resume.projects.title" />
                        </ResumeSectionTitle>
                    </Grid>                    
                    <Grid item>
                        <Grid container direction="column">
                            {projects?.map((project, index) => (
                                <Grid 
                                    item
                                    key={index}
                                    sx={{
                                        marginBottom: '0'
                                    }}
                                >
                                    <ResumeSectionProject 
                                        key={index} 
                                        title={project.title}
                                        startAt={project.start_at}
                                        endAt={project.end_at}
                                        description={project.description}
                                        skills={project.skills}
                                        github={project.github.link}
                                        sx={{   
                                            width: '100%',
                                            mb: props.inline ? '24px' : 0
                                        }}                                        
                                    >
                                        {index < projects.length - 1 ? (
                                            <Divider 
                                                sx={{ 
                                                    mt: 2, 
                                                    mb: 2, 
                                                    position: 'relative', 
                                                    width: 'calc(100% + 32px)',
                                                    left: '-16px',
                                                    opacity: '0.3'
                                                }}
                                            />
                                        ) : <></>}
                                    </ResumeSectionProject>
                                </Grid>
                            ))}
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeSectionProjects;
