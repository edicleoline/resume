import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { store, RootState } from 'store';
import setLang from 'store/actions/setLang';
import { useSelector } from 'react-redux';
import data from 'data/resume.json';
import settings from 'data/settings.json';
import ProfileHeader from 'ui-component/Resume/Profile/Header';
import ProfileBody from 'ui-component/Resume/Profile/Body';
import ActionSheet from 'ui-component/ActionSheet';
import TranslationActionSheet from 'ui-component/TranslationActionSheet';

const general = data?.general;

export interface ResumeSectionGeneralProps {
    inline: boolean;
}
const ResumeSectionGeneral = (props: ResumeSectionGeneralProps) => {
    const lang = useSelector((state: RootState) => state.site.lang);
    
    // const [langs] = useState(settings.site.i18n.langs);
    const [selectedLang, setSelectedLang] = useState(lang);    

    const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
    // const translateOpen = Boolean(translateAnchorEl);
    const [translateActionSheetOpen, setTranslateActionSheetOpen] = useState(false);

    // const handleTranslateMenuClose = () => {
    //     setTranslateAnchorEl(null);
    // };

    // const handleTranslateClick = (event) => {        
    //     // setTranslateActionSheetOpen(true);
    //     if (!props.inline) {
    //         setTranslateActionSheetOpen(true);
    //     } else {
    //         setTranslateAnchorEl(event.currentTarget);
    //     }
    // };    

    const handleTranslateActionSheetClose = () => {
        setTranslateActionSheetOpen(false);
    };    

    // const handleLangClick = (lang) => {
    //     setSelectedLang(lang.locale);
    //     handleTranslateMenuClose();
    // };

    useEffect(() => {
        window.setTimeout(() => {
            store.dispatch(setLang(selectedLang));
        }, 200);    
    }, [selectedLang]);

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container>
                        <Grid
                            item 
                            sx={{
                                mr: !props.inline ? 2 : 3,
                                display: 'none'
                            }}
                        >
                            <Avatar
                                alt={data.me.name}
                                src={data.me.pic.url}
                                sx={[
                                    { 
                                        width: !props.inline ? 64 : 120, 
                                        height: !props.inline ? 64 : 120, 
                                        margin: 'auto', 
                                        marginBottom: '16px', 
                                        position: 'relative'                                        
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                            <Grid container direction="column">
                                <Grid item sx={{ marginBottom: '32px' }}>
                                    <ProfileHeader name={data.me.name} caption={general.caption} skills={general.skills} />
                                </Grid>
                                <Grid item>
                                    <ProfileBody overlines={general.overlines} about={data.me.about} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ActionSheet 
                open={translateActionSheetOpen} 
                onClose={handleTranslateActionSheetClose} 
                height={114}
                sx={{}}
            >
                <TranslationActionSheet />
            </ActionSheet>            
        </>        
    );
};

export default ResumeSectionGeneral;
