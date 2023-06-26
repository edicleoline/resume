import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import GraphSkillItem from 'ui-component/Resume/GraphSkill/Item';
import GraphSkillsHeader from 'ui-component/Resume/GraphSkill/Header';
import data from 'data/resume.json';
import { transformGraphSkill } from 'ui-component/Resume/Sections/Skills';
import { SxProps } from '@mui/material';

const _data: any = data;

export interface ResumeSectionExpertisesProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionExpertises = (props: ResumeSectionExpertisesProps) => {
    const _skills = _data?.expertise?.skills?.items?.map((skill) => {
        skill.graph = transformGraphSkill({ map: data?.expertise?.skills?.graph?.map, time: skill.time });
        return skill;
    });

    const [skills] = useState({
        items: _skills,
        header: {
            timeline: data.expertise.skills.header.timeline
        }
    });

    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <ResumeSectionTitle style={{}}>
                            <FormattedMessage id="app.resume.expertise.title" />
                        </ResumeSectionTitle>
                    </Grid>
                    <GraphSkillsHeader inline={props.inline} labels={skills.header.timeline} />
                    <Grid item>
                        <Grid container direction="column">
                            {skills?.items?.map((skill, index) => (
                                <GraphSkillItem 
                                    key={index}
                                    inline={props.inline} 
                                    title={skill.title}
                                    label={{
                                        text: skill.graph.label.text,
                                        values: skill.graph.label.values
                                    }}
                                    progress={{
                                        value: skill.graph.progress.value,
                                        variant: 'progress' in skill && 'variant' in skill.progress ? skill.progress.variant : 'determinate'
                                    }}
                                    last={index >= skills?.items?.length - 1}
                                />                              
                            ))}   
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ResumeSectionExpertises;
