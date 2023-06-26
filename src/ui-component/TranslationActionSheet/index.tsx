import { useEffect, useState } from 'react';
import settings from 'data/settings.json';
import { useSelector } from 'react-redux';
import { RootState, store } from 'store';
import setLang from 'store/actions/setLang';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import ListItemText from '@mui/material/ListItemText';
import { ActionSheetMenuItem } from './styles';

const TranslationActionSheet = () => {
    const [langs] = useState(settings.site.i18n.langs);
    const site = useSelector((state: RootState) => state.site);

    const [selectedLang, setSelectedLang] = useState(site.lang);

    const handleLangClick = (lang) => {
        setSelectedLang(lang.locale);
    };

    useEffect(() => {
        window.setTimeout(() => {
            store.dispatch(setLang(selectedLang));
        }, 200);    
    }, [selectedLang]);

    return (
        <Grid 
            container 
            direction="column"
        >            
            <Grid item>
                <Paper elevation={0} sx={{ width: '100%', maxWidth: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
                    <MenuList>
                        {langs.map((lang, index) => (
                            <ActionSheetMenuItem 
                                key={index}
                                sx={{ borderBottom: langs.length - 1 > index ? 'solid 1px #ddd' : 'none 0' }}
                                onClick={() => { handleLangClick(lang); }}
                            >
                                <Grid container direction="row" alignItems="center" justifyContent="center">
                                    <Grid item sx={{ marginLeft: '-40px' }}>
                                        <ListItemIcon
                                            sx={{
                                                position: 'relative',
                                                top: '3px',
                                                visibility: selectedLang && selectedLang === lang.locale ? 'visible' : 'hidden'
                                            }}
                                        >
                                            <CheckIcon fontSize="small" />
                                        </ListItemIcon>                                     
                                    </Grid>
                                    <Grid item>
                                        <ListItemText>{lang.label}</ListItemText>
                                    </Grid>
                                </Grid>                                                                
                            </ActionSheetMenuItem>
                        ))}
                    </MenuList>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default TranslationActionSheet;
