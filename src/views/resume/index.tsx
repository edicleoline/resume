import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IntlMessageFormat from 'intl-messageformat';
import { messages } from '../../i18n';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ProfileRowContainer, ProfileRowWrapper } from './styles';
import ResumeSectionSkills from 'ui-component/Resume/Sections/Skills';
import ResumeSectionExpertises from 'ui-component/Resume/Sections/Expertises';
import ResumeSectionEducations from 'ui-component/Resume/Sections/Educations';
import ResumeSectionProjects from 'ui-component/Resume/Sections/Projects';
import ResumeSectionWorkExperiences from 'ui-component/Resume/Sections/WorkExperiences';
import ResumeSectionTrainings from 'ui-component/Resume/Sections/Trainings';
import ResumeSectionGeneral from 'ui-component/Resume/Sections/General';
import ResumeFooter from 'ui-component/Resume/Footer';
import StickySide from 'ui-component/StickySide';
import StickySideNav from 'ui-component/StickySide/Nav';
import SocialHeaderCard from 'ui-component/SocialHeaderCard';
import StickySideNavButton from 'ui-component/StickySide/Nav/Button/StickySideNavButton';

const sectionSx = {
    paddingTop: '30px',
    paddingBottom: '30px'
};

const Resume = () => {
    const theme = useTheme();
    const mobile = !useMediaQuery(theme.breakpoints.up('md'));

    const lang = useSelector((state: RootState) => state.site.lang);

    useEffect(() => {
        const title = new IntlMessageFormat(messages[lang]['app.site.resume.title'], lang);
        document.title = title.format() as string;
    }, [lang]);

    return (
        <Box style={{ width: '100%' }}>
            <Container maxWidth="lg">
                <Grid container spacing={5} sx={{ marginTop: 0 }}>
                    <Grid 
                        item 
                        md={9} 
                        xs={12} 
                        sx={{ order: { xs: 2, md: 1 }, paddingTop: { xs: '0 !important', md: '36px !important' } }}
                    >
                        <Grid 
                            container
                            direction="column"
                        >
                            <ProfileRowContainer item>
                                <ProfileRowWrapper>
                                    <ResumeSectionGeneral inline={!mobile} />
                                </ProfileRowWrapper>
                            </ProfileRowContainer>

                            <ProfileRowContainer item>
                                <ProfileRowWrapper>
                                    <ResumeSectionExpertises inline={!mobile} sx={[sectionSx]} />
                                    <ResumeSectionWorkExperiences inline={!mobile} sx={[sectionSx]} />
                                    <ResumeSectionProjects inline={!mobile} sx={sectionSx} />
                                    <ResumeSectionEducations inline={!mobile} sx={[sectionSx]} />
                                    <ResumeSectionTrainings inline={!mobile} sx={sectionSx} />
                                    <ResumeSectionSkills inline={!mobile} sx={[sectionSx]} />
                                </ProfileRowWrapper>
                            </ProfileRowContainer>
                            <ResumeFooter />
                        </Grid> 
                    </Grid>
                    <Grid 
                        item 
                        md={3} 
                        xs={12} 
                        sx={{ marginTop: { xs: '16px', md: '0' }, paddingTop: '0 !important' }}
                    >
                        <StickySide>
                            <StickySideNav>
                                <>
                                    <SocialHeaderCard />
                                    {!mobile && (
                                        <Grid container direction="column">
                                            <Grid item>
                                                <StickySideNavButton>Enviar uma proposta</StickySideNavButton>
                                            </Grid>
                                            <Grid item>
                                                <StickySideNavButton>Compartilhar</StickySideNavButton>
                                            </Grid>
                                            <Grid item>
                                                <StickySideNavButton>Translate my résumé</StickySideNavButton>
                                            </Grid>
                                        </Grid>
                                    )}
                                </>
                            </StickySideNav>
                        </StickySide>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Resume;
