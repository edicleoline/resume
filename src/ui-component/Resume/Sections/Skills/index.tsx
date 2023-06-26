import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FormattedMessage } from 'react-intl';
import ResumeSectionTitle from 'ui-component/Resume/Section/Title';
import GraphSkillItem from 'ui-component/Resume/GraphSkill/Item';
import GraphSkillsHeader from 'ui-component/Resume/GraphSkill/Header';
import data from 'data/resume.json';
import { SxProps } from '@mui/system';

const _data: any = data;

export const transformGraphSkill = ({ map, time }) => {
    const p = map.find((x) => x.time === time);

    return {
        label: {
            text: time > 1 ? 'app.date.more_than.x_years' : 'app.date.more_than.x_year',
            values: { years: time }
        },
        progress: {
            value: p ? p.value : 100
        }
    };
};

const _skills = _data?.skills?.items?.map((skill) => {
    skill.transformedGraph = transformGraphSkill({ map: data?.skills?.graph?.map, time: skill.graph.time });
    return skill;
});
const sortedSkills = _skills.sort((a, b) => a.title.localeCompare(b.title));

export interface SectionSkillsProps {
    inline: boolean;
    sx: SxProps;
}
const ResumeSectionSkills = (props: SectionSkillsProps) => {
    const skills = {
        items: sortedSkills,
        header: {
            timeline: data?.skills?.header?.timeline
        }
    };
    const [expanded] = useState(true);

    return (
        <Grid container direction="column" sx={props.sx}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid item sx={{ flex: 1 }}>
                                <ResumeSectionTitle style={{ marginBottom: '0 !important' }}>
                                    <FormattedMessage id="app.resume.skills.title" />
                                </ResumeSectionTitle>
                            </Grid>
                        </Grid>                        
                    </Grid>
                    <GraphSkillsHeader inline={props.inline} labels={skills.header.timeline} />
                    <Grid 
                        item
                        sx={{ 
                            transition: 'max-height 1s ease-in-out',
                            maxHeight: props.inline ? !expanded ? '146px' : '10000px' : !expanded ? '168px' : '10000px',
                            overflow: 'hidden'                            
                        }}
                    >
                        <Grid container direction="column">
                            {skills?.items?.map((skill: any, index: number) => (
                                <GraphSkillItem 
                                    key={index}
                                    inline={props.inline}
                                    title={`app.skill.${skill.title}`}
                                    label={{
                                        text: skill.transformedGraph.label.text,
                                        values: skill.transformedGraph.label.values
                                    }}
                                    progress={{
                                        value: skill.transformedGraph.progress.value,
                                        variant: 'progressVariant' in skill ? skill.progressVariant : 'determinate'
                                    }}
                                    last={false}
                                />
                            ))}   
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ResumeSectionSkills;
