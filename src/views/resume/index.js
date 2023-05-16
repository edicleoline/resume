import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinearProgress from '@mui/material/LinearProgress';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import { isIOS } from 'react-device-detect';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSpring, a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Backdrop from '@mui/material/Backdrop';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import MessageIcon from '@mui/icons-material/Message';
import { FormattedMessage } from 'react-intl';
import IntlMessageFormat from 'intl-messageformat';
import { locale, messages } from './../../i18n';
import TranslateIcon from '@mui/icons-material/Translate';
import { keyframes } from "@emotion/react";
import CheckIcon from '@mui/icons-material/Check';
import Link from '@mui/material/Link';
import { store } from './../../store';
import setLang from './../../store/actions/setLang';
import { useSelector } from 'react-redux';
import data from './../../data/resume.json';
import _settings from './../../data/settings.json';
import moment from 'moment';

//Desculpe, SOLID

const ProfileRowContainer = styled(Grid)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const ProfileRowWrapper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.04), 0 2px 2px 0 rgba(0,0,0,0.04)',
    position: 'relative',
    borderRadius: '4px',
    color: theme.palette.text.secondary,
    border: 'solid 1px rgba(0,0,0,.15)',
    borderBottomColor: 'rgba(0,0,0,.18)',
}));

const MyChip = styled(Chip)(({ theme }) => ({
    padding: theme.spacing(0),
    borderRadius: 3
}));

const indeterminate1Keyframes = keyframes({    
    "0%": {
        opacity: 1,
        backgroundPosition: "0 -23px"
    },
    "100%": {
        opacity: 1,
        backgroundPosition: "-200px -23px"
    }
});

const MyLinearProgress = styled(LinearProgress)(({ theme }) => ({
    borderRadius: 3,
    "& .MuiLinearProgress-dashed": {
        animation: `${indeterminate1Keyframes} 3s infinite linear`,
        backgroundImage: 'radial-gradient(rgb(177, 177, 177) 0%, rgb(177, 177, 177) 26%, transparent 26%)'
    }
}));

const MyH7 = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '400'
}));

const transformGraphSkill = ({ map, time }) => {
    const p = map.find((x) => x.time == time);

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

//Solução porca, eu sei
const Icons = { 
    'StorageIcon': StorageIcon,
    'SecurityIcon': SecurityIcon,
    'DataObjectIcon': DataObjectIcon,
    'CodeIcon': CodeIcon
};

const LoadableIcon = ({ icon, props }) => {
    const Icon = Icons[icon];
    return <Icon {...props} />;
};

const ShareButtonBases = ({ icon, text }) => {
    return (
        <Box>
            <Grid container direction="column">
                <Grid item>
                    {icon}
                </Grid>
                <Grid item sx={{ pt: '12px', paddingLeft: '12px', paddingRight: '12px' }}>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: '#333',
                            fontSize: '12px',
                            border: 'none 0 !important'
                        }}
                    >
                        {text}                    
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const ShareButtonBase = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
           border: '4px solid currentColor',
        },
    },
}));

const ShareButton = ({ icon, text, onClick }) => {
    return (
        <ShareButtonBase
            focusRipple
            onClick={onClick}
        >
            <ShareButtonBases icon={icon} text={text} />
        </ShareButtonBase>
    );
};

const ActionSheetContainer = styled(a.div)(({ theme }) => ({
    zIndex: 9999,
    position: 'fixed',
    left: 0,
    height: 'calc(100vh + 100px)',
    width: '100%',
    borderRadius: '12px 12px 0px',
    background: '#fff',
    touchAction: 'none',
    marginLeft: '0 !important'
}));

const ActionSheetMenuItem = styled(MenuItem)(({ theme }) => ({
    borderBottom: 'solid 1px #ddd'
}));

const SectionTitle = ({ children }) => {
    return (
        <Typography 
            variant="h2" 
            color="primary"
            sx={{ 
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04rem',
                marginBottom: '24px'
            }}
        >
            {children}                    
        </Typography>
    );
};

const ActionSheet = ({ open, onClose, children, height, sx }) => {
    const [opened, setOpened] = useState(false);
    const [{ y }, set] = useSpring(() => ({ y: height }));
  
    const handleOpen = ({ canceled }) => {
        setOpened(true);
        set({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
    };

    const handleClose = (velocity = 0) => {
        setOpened(false);
        set({ y: height, immediate: false, config: { ...config.stiff, velocity } });
        onClose();
    };
  
    const bind = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
            if (my < -70) cancel()
            if (last) {
                my > height * 0.5 || vy > 0.5 ? handleClose(vy) : handleOpen({ canceled })
            } else set({ y: my, immediate: true });
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    );
  
    const display = y.to((py) => (py < height ? 'block' : 'none'));

    useEffect(() => {
        if (open) {
            handleOpen({ canceled: undefined });
        } else {
            handleClose()
        }
    }, [open]);

    return (
      <>
        <Backdrop
            sx={{ 
                color: '#fff', 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                left: 0,
                marginLeft: '0 !important'
            }}
            open={opened}
            onClick={() => {handleClose()}}
        />
        <ActionSheetContainer
            {...bind()} 
            sx={sx}
            style={{ 
                display, 
                bottom: `calc(-100vh + ${height - 100}px)`, 
                y 
            }}
        >
            {children}
        </ActionSheetContainer>
      </>
    );
};

const ShareActionSheet = () => {
    const site = useSelector((state) => state.site);

    const handleShareWhatsappClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        window.open(`https://api.whatsapp.com/send?text=${text.format()}`);
    };

    const handleShareTelegramClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        window.open(`https://telegram.me/share/url?url=${_settings.site.url}&text=${text.format()}`);
    };

    const handleShareSmsClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.sms.message], site.lang);
        window.open(`sms:?body=${text.format()}`);
    };

    const handleShareEmailClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        const subject = new IntlMessageFormat(messages[site.lang][data.share.email.subject], site.lang);
        window.open(`mailto:?subject=${subject.format()}&body=${text.format()}`);
    };

    return (
        <Grid 
            container 
            direction="column"
        >
            <Grid 
                item
                sx={{
                    borderBottom: 'solid 1px #ddd'
                }}
            >
                <Grid
                    container 
                    direction="row"
                    alignItems="center"
                    sx={{
                        padding: '16px'
                    }}
                >
                    <Grid item>
                        <Avatar
                            alt={data.me.name}
                            src={data.me.pic.url}
                            sx={[
                                { width: 42, height: 42, marginRight: '12px', borderRadius: '4px' }
                            ]}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" component="div" sx={{ mb: 0, fontWeight: 500, color: '#333' }}>
                            {data.me.name}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 0, mt: '-2px' }}>
                            {_settings.site.url}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid
                    container 
                    direction="row"
                    alignItems="stretch"
                    sx={{
                        minHeight: '120px'
                    }}
                >
                    <Grid item sx={{ flex: 1, paddingLeft: '0px' }}>
                        <ShareButton 
                            icon={
                                <WhatsAppIcon 
                                    sx={{ fontSize: '28px', color: '#333' }}                                                                 
                                />
                            } 
                            text="WhatsApp" 
                            onClick={handleShareWhatsappClick}
                        />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <TelegramIcon 
                                    sx={{ fontSize: '28px', color: '#333' }} />
                            } 
                            text="Telegram" 
                            onClick={handleShareTelegramClick}
                        />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <MessageIcon sx={{ fontSize: '28px', color: '#333' }} />
                            } 
                            text="SMS" 
                            onClick={handleShareSmsClick}
                        />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <EmailIcon sx={{ fontSize: '28px', color: '#333' }} />
                            } 
                            text="E-mail" 
                            onClick={handleShareEmailClick}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const TranslationActionSheet = () => {
    const [langs, setLangs] = useState(_settings.site.i18n.langs);
    const site = useSelector((state) => state.site);

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

const SectionGeneral = ({ mobile }) => {
    const _general = data?.general;
    const [general] = useState(_general);

    const site = useSelector((state) => state.site);

    const handleContactMeWhatsAppClick = () => {
        const message = new IntlMessageFormat(messages[site.lang][data.contact.whatsapp.message], site.lang);
        let url = `https://api.whatsapp.com/send?phone=${data.me.whatsapp.number}`;
        url += `&text=${encodeURI(message.format())}&app_absent=0`;
        window.open(url);
    };

    const [shareAnchorEl, setShareAnchorEl] = useState(null);
    const shareOpen = Boolean(shareAnchorEl);
    const [shareActionSheetOpen, setShareActionSheetOpen] = useState(false);

    const [langs, setLangs] = useState(_settings.site.i18n.langs);
    const [selectedLang, setSelectedLang] = useState(site.lang);

    const handleShareMenuClose = () => {
        setShareAnchorEl(null);
    };

    const handleShareClick = (event) => {        
        // setActionSheetOpen(true);
        if (mobile) {
            setShareActionSheetOpen(true);
        } else {
            setShareAnchorEl(event.currentTarget);
        }
    };    

    const handleShareActionSheetClose = () => {
        setShareActionSheetOpen(false);
    };

    const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
    const translateOpen = Boolean(translateAnchorEl);
    const [translateActionSheetOpen, setTranslateActionSheetOpen] = useState(false);

    const handleTranslateMenuClose = () => {
        setTranslateAnchorEl(null);
    };

    const handleTranslateClick = (event) => {        
        // setTranslateActionSheetOpen(true);
        if (mobile) {
            setTranslateActionSheetOpen(true);
        } else {
            setTranslateAnchorEl(event.currentTarget);
        }
    };    

    const handleTranslateActionSheetClose = () => {
        setTranslateActionSheetOpen(false);
    };

    const handleContactEmailClick = () => {
        const subject = new IntlMessageFormat(messages[site.lang][data.contact.email.subject], site.lang);
        const body = new IntlMessageFormat(messages[site.lang][data.contact.email.body], site.lang);
        window.open(`mailto:${data.me.email}?subject=${subject.format()}&body=${body.format()}`);
    };

    const handleDownloadClick = () => {
        const fileUrl = new IntlMessageFormat(messages[site.lang]['app.resume.static_file.url'], site.lang);
        window.open(fileUrl.format());
    };

    const handleShareWhatsappClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        window.open(`https://api.whatsapp.com/send?text=${text.format()}`);
        handleShareMenuClose();
    };

    const handleShareTelegramClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        window.open(`https://telegram.me/share/url?url=${_settings.site.url}&text=${text.format()}`);
        handleShareMenuClose();
    };

    const handleShareEmailClick = () => {
        const text = new IntlMessageFormat(messages[site.lang][data.share.message], site.lang);
        const subject = new IntlMessageFormat(messages[site.lang][data.share.email.subject], site.lang);
        window.open(`mailto:?subject=${subject.format()}&body=${text.format()}`);
        handleShareMenuClose();
    };

    const handleLangClick = (lang) => {
        setSelectedLang(lang.locale);
        handleTranslateMenuClose();
    };

    useEffect(() => {
        window.setTimeout(() => {
            store.dispatch(setLang(selectedLang));
        }, 200);    
    }, [selectedLang]);

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        sx={{ 
                            padding: mobile ? '16px' : '30px 64px'
                        }}
                    >
                        <Grid
                            item 
                            sx={
                                mobile ? { flexBasis: '100%' } : { mr: 3 }
                            }
                        >
                            <Avatar
                                alt={data.me.name}
                                src={data.me.pic.url}
                                sx={[
                                    { 
                                        width: 120, 
                                        height: 120, 
                                        margin: 'auto', 
                                        marginBottom: '16px', 
                                        position: 'relative', 
                                        border: mobile ? 'solid 5px #F0F1F2' : 'none 0',
                                        boxShadow: mobile ? '0px 1px 1px rgba(0,0,0,.15)' : 'none',
                                    },
                                    mobile && { top: '-70px', marginBottom: '-60px' }
                                ]}
                            />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h6" sx={{ mb: 0 }} color="primary">
                                        {data.me.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography 
                                        variant="body2"
                                        sx={{ 
                                            mt: '-4px',
                                            mb: '8px', 
                                            fontWeight: 400
                                        }}
                                    >
                                        <FormattedMessage id={general.caption} />
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={0.8}>
                                        {general.skills.map((skill, index) => (
                                            <MyChip 
                                                key={index} 
                                                label={<FormattedMessage id={`app.skill.${skill}`} />} 
                                                color="primary" 
                                                size="small" 
                                            />    
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid item sx={{ height: '40px' }}>
                                    <Divider 
                                        sx={{ 
                                            mt: 3, 
                                            mb: 3, 
                                            position: 'absolute', 
                                            width: mobile ? '100%' : 'calc(100% - 208px)',
                                            left: mobile ? '0' : 'auto'
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                        {general.overlines.map((overline, index) => (
                                            <Grid key={index} item sx={{ mr: 1.2 }}>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <Typography variant="overline" sx={{ lineHeight: 'initial' }}>
                                                            <FormattedMessage id={overline} />
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>              
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <FormattedMessage id={data.me.about} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    sx={{ 
                        backgroundColor: '#f8f8f8', 
                        padding: '8px 12px', 
                        borderTop: '1px solid #eeeeee',
                        borderRadius: '0 0 6px 6px'
                    }}>
                        <Grid container direction="row" justifyContent="start" alignItems="center">
                            <Grid item sx={{ flex: 1 }}>
                                <Stack direction="row" spacing={0}>                            
                                    <IconButton 
                                        id="translate-button"
                                        aria-label="translate-button" 
                                        color="primary" 
                                        aria-controls={translateOpen ? 'translation-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={translateOpen ? 'true' : undefined}
                                        onClick={handleTranslateClick}
                                    >
                                        <TranslateIcon />
                                    </IconButton>
                                    <Menu
                                        id="translation-menu"
                                        anchorEl={translateAnchorEl}
                                        open={translateOpen}
                                        onClose={handleTranslateMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'translate-button',
                                        }}
                                    >
                                        {langs.map((lang, index) => (
                                            <MenuItem key={index} onClick={() => { handleLangClick(lang); }}>
                                                <ListItemIcon
                                                    sx={{
                                                        position: 'relative',
                                                        top: '3px',
                                                        visibility: selectedLang && selectedLang === lang.locale ? 'visible' : 'hidden'
                                                    }}
                                                >
                                                    <CheckIcon fontSize="small" />
                                                </ListItemIcon> 
                                                <ListItemText>{lang.label}</ListItemText>                                        
                                            </MenuItem>
                                        ))}                                                                            
                                    </Menu>
                                    <IconButton aria-label="download" color="primary" onClick={handleDownloadClick}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Stack>                            
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={0}>
                                    <IconButton aria-label="contact-me-whatsapp" color="primary" onClick={handleContactMeWhatsAppClick}>
                                        <WhatsAppIcon />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="contact-me-email" 
                                        color="primary" 
                                        onClick={handleContactEmailClick}
                                    >
                                        <EmailIcon />
                                    </IconButton>
                                    <IconButton 
                                        id="share-button"
                                        aria-label="share" 
                                        color="primary"
                                        aria-controls={shareOpen ? 'share-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={shareOpen ? 'true' : undefined}
                                        onClick={handleShareClick}
                                    >
                                        {isIOS ? (
                                            <IosShareIcon />
                                        ) : (
                                            <ShareIcon />
                                        )}                                    
                                    </IconButton>
                                    <Menu
                                        id="share-menu"
                                        anchorEl={shareAnchorEl}
                                        open={shareOpen}
                                        onClose={handleShareMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'share-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleShareWhatsappClick}>
                                            <ListItemIcon>
                                                <WhatsAppIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>WhatsApp</ListItemText>                                        
                                        </MenuItem>
                                        <MenuItem onClick={handleShareTelegramClick}>
                                            <ListItemIcon>
                                                <TelegramIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Telegram</ListItemText> 
                                        </MenuItem>
                                        <MenuItem onClick={handleShareEmailClick}>
                                            <ListItemIcon>
                                                <MailOutlineIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>E-mail</ListItemText>
                                        </MenuItem>
                                    </Menu>
                                    <IconButton 
                                        aria-label="my-github" 
                                        color="primary" 
                                        onClick={() => { window.open(data.me.github.link); }}
                                    >
                                        <GitHubIcon />
                                    </IconButton>                                
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>                    
            </Grid>
            <ActionSheet open={shareActionSheetOpen} onClose={handleShareActionSheetClose} height={176}>                                    
                <ShareActionSheet />
            </ActionSheet>
            <ActionSheet 
                open={translateActionSheetOpen} 
                onClose={handleTranslateActionSheetClose} 
                height={114}
            >
                <TranslationActionSheet />
            </ActionSheet>            
        </>        
    );
};

const GraphSkill = ({ mobile, title, label, progressValue, last = false, progressVariant = 'determinate' }) => {    
    return (
        <Box sx={{ maxHeight: !mobile ? '30px' : 'initial' }}>
            <Grid 
                container 
                direction="row" 
                alignItems="center" 
                alignContent="flex-start" 
                sx={{ 
                    mb: !last ? '6px' : 0
                }}
            >
                <Grid item xs={12} md={4}>
                    <Grid container direction="row" alignItems="center" alignContent="flex-start">
                        <Grid item>
                            <MyChip label={title} color="primary" size="small" sx={{ mr: '12px' }} />
                        </Grid>
                        <Grid item sx={{ position: 'relative' }}>
                            <Typography variant="body2" sx={{ m: 0, opacity: '0.6' }} component="span">
                                {label}                                
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8} sx={[ mobile && { mb: '6px', mt: '4px' }]}>
                    <MyLinearProgress 
                        variant={progressVariant} 
                        value={progressValue} 
                        valueBuffer={progressValue + 3}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const GraphSkillsHeader = ({ mobile, labels }) => {
    return (
        <Grid item>
            <Grid container direction="row">
                <Grid item xs={4}>
                    <Typography variant="overline" sx={{ mt: 1, opacity: '0.6' }}>
                        <FormattedMessage id="app.resume.graph_skills.header.main" />
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container direction="column">
                        <Grid item sx={{ alignSelf: 'center' }}>
                            <Typography variant="overline" sx={{ mt: 1, opacity: '0.6' }}>
                                <FormattedMessage id="app.resume.graph_skills.header.experience_time" />
                            </Typography>
                        </Grid>
                        {!mobile && (
                            <Grid item>
                                <Grid container direction="row" justifyContent="space-between" sx={{ fontSize: '12px' }}>
                                    {labels.map((label, index) => (
                                        <Grid item key={index}>{label}</Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                {mobile && (
                    <Grid item sx={{ flex: 1, mb: '8px' }}>
                        <Grid container direction="row" justifyContent="space-between" sx={{ fontSize: '12px' }}>
                            {labels.map((label, index) => (
                                <Grid item key={index}>{label}</Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>                        
        </Grid>
    );
};

const SectionSkills = ({ mobile }) => {
    const _skills = data?.skills?.items?.map((skill) => {
        skill.transformedGraph = transformGraphSkill({ map: data?.skills?.graph?.map, time: skill.graph.time });
        return skill;
    });

    const sortedSkills = _skills.sort((a, b) => a.title.localeCompare(b.title));

    const [skills] = useState({
        items: sortedSkills,
        header: {
            timeline: data?.skills?.header?.timeline
        }
    });
    const [expanded, setExpanded] = useState(true);

    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                        >
                            <Grid item sx={{ flex: 1 }}>
                                <SectionTitle style={{ marginBottom: '0 !important' }}>
                                    <FormattedMessage id="app.resume.skills.title" />
                                </SectionTitle>
                            </Grid>
                        </Grid>                        
                    </Grid>
                    <GraphSkillsHeader mobile={mobile} labels={skills.header.timeline} />
                    <Grid 
                        item
                        sx={{ 
                            transition: 'max-height 1s ease-in-out',
                            maxHeight: !mobile ? !expanded ? '146px' : '10000px' : !expanded ? '168px' : '10000px',
                            overflow: 'hidden'                            
                        }}
                    >
                        <Grid container direction="column">
                            {skills?.items?.map((skill, index) => (                                
                                <GraphSkill 
                                    key={index}
                                    mobile={mobile} 
                                    title={<FormattedMessage id={`app.skill.${skill.title}`} />} 
                                    label={<FormattedMessage id={skill.transformedGraph.label.text} values={skill.transformedGraph.label.values} />} 
                                    progressValue={skill.transformedGraph.progress.value} 
                                    progressVariant={'progressVariant' in skill ? skill.progressVariant : 'determinate'}
                                />                                
                            ))}   
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

const SectionExpertise = ({ mobile }) => {    
    const _skills = data?.expertise?.skills?.items?.map((skill) => {
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
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <SectionTitle>
                            <FormattedMessage id="app.resume.expertise.title" />
                        </SectionTitle>
                    </Grid>
                    <GraphSkillsHeader mobile={mobile} labels={skills.header.timeline} />
                    <Grid item>
                        <Grid container direction="column">
                            {skills?.items?.map((skill, index) => (                                
                                <GraphSkill 
                                    key={index} 
                                    mobile={mobile} 
                                    title={<FormattedMessage id={skill.title} />} 
                                    label={<FormattedMessage id={skill.graph.label.text} values={skill.graph.label.values} />} 
                                    progressValue={skill.graph.progress.value} 
                                    progressVariant={
                                        'progress' in skill && 'variant' in skill.progress ? skill.progress.variant : 'determinate'
                                    }
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

const WorkExperience = ({ mobile, position, company, startAt, endAt, description, skills, last = false }) => {
    const [sortedSkills] = useState(skills.sort());

    const momentStartAt = useRef(moment(startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(moment(endAt, 'YYYY-MM-DD'));

    const [_startAt, _setStartAt] = useState({
        month: momentStartAt.current.format('MMM'),
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        month: momentEndAt.current.format('MMM'),
        year: momentEndAt.current.format('YYYY')
    });

    const site = useSelector((state) => state.site);

    useEffect(() => {
        moment.locale(site.lang);
        momentStartAt.current = moment(startAt, 'YYYY-MM-DD');
        momentEndAt.current = moment(endAt, 'YYYY-MM-DD');

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current.format('MMM')
            }
        });
    }, [site.lang]);

    return (
        <Grid container direction="row">
            <Grid item sx={{ width: '28px', position: 'relative', ml: '30px' }}>
                <Typography
                    variant="caption" 
                    sx={{ 
                        position: 'absolute',
                        left: '-34px',
                        marginTop: '2px'
                    }}
                >
                    {_endAt.year}
                </Typography>
                <Box
                    sx={{
                        "&.MuiBox-root::after": {
                            content: '""',
                            backgroundColor: !last ? 'rgb(177, 177, 177)' : 'transparent',
                            width: '3px',
                            height: mobile ? 'calc(100% - 40px)' : 'calc(100% - 40px)',
                            display: 'block',
                            position: 'absolute',
                            left: '9px',
                            bottom: mobile ? '10px' : '8px',
                            borderRadius: '32px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <BusinessCenterIcon 
                        fontSize="small" 
                        color="primary" 
                    />
                </Box>                
            </Grid>
            <Grid 
                item 
                sx={{ 
                    width: 'calc(100% - 76px)', 
                    pb: !last ? '24px' : '6px'
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <MyH7 variant="h7" color="primary" component="h3" sx={{ mt: '1px' }}>
                            {position.title}
                        </MyH7>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="primary" sx={{ mt: '3px', lineHeight: '1' }}>
                            {company.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" component="div" sx={{ top: '4px', mb: '14px', position: 'relative', lineHeight: '1' }}>
                            <FormattedMessage 
                                id={'app.date.month_year.interval'} 
                                values={{ 
                                    start_at_month: _startAt.month,
                                    start_at_year: _startAt.year,
                                    end_at_month: _endAt.month,
                                    end_at_year: _endAt.year
                                }} 
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" sx={{ mt: '3px', whiteSpace: 'pre-line' }}>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ mt: '10px' }}>                        
                        {sortedSkills.map((skill, index) => (                                
                            <MyChip 
                                key={index} 
                                label={<FormattedMessage id={`app.skill.${skill}`} />} 
                                color="primary" 
                                size="small" 
                                sx={{ 
                                    marginRight: '3px', 
                                    marginBottom: '3px' 
                                }} 
                            />
                        ))}                                                      
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const SectionWorkExperiences = ({ mobile }) => {    
    const _experiences = data?.experiences?.items;

    const [experiences] = useState({
        items: _experiences
    });   

    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid item>
                                <SectionTitle>
                                    <FormattedMessage id="app.resume.work_experiences.title" />
                                </SectionTitle>
                            </Grid>
                        </Grid>
                    </Grid>                    
                    <Grid item>
                        <Grid container direction="column">
                            {experiences.items.map((experience, index) => (
                                <Grid item key={index}>
                                    <WorkExperience
                                        mobile={mobile}
                                        position={{ ...experience.position, title: <FormattedMessage id={experience.position.title} /> }}
                                        company={experience.company} 
                                        startAt={experience.start_at}
                                        endAt={experience.end_at}
                                        description={<FormattedMessage id={experience.description} />}
                                        last={index >= experiences.items.length - 1}
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

const Project = ({ mobile, title, startAt, endAt, description, github, skills, children, sx = {} }) => {
    const [sortedSkills] = useState(skills.sort());

    const momentStartAt = useRef(moment(startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(endAt ? moment(endAt, 'YYYY-MM-DD') : null);

    const [_startAt, _setStartAt] = useState({
        month: momentStartAt.current.format('MMM'),
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        month: momentEndAt.current ? momentEndAt.current.format('MMM') : null,
        year: momentEndAt.current ? momentEndAt.current.format('YYYY') : null
    });

    const site = useSelector((state) => state.site);

    useEffect(() => {
        moment.locale(site.lang);
        momentStartAt.current = moment(startAt, 'YYYY-MM-DD');
        momentEndAt.current = endAt ? moment(endAt, 'YYYY-MM-DD') : null;

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current ? momentEndAt.current.format('MMM') : null
            }
        });
    }, [site.lang]);

    return (
        <Grid container direction="row">
            <Grid 
                item 
                sx={{                     
                    position: 'relative',
                    ...sx                    
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <MyH7 variant="h7" color="primary" component="h3" sx={{ mt: '1px' }}>
                            {title}
                        </MyH7>
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" sx={{ top: '-5px', mb: '0px', position: 'relative' }}>
                            <FormattedMessage 
                                id={_endAt.year ? 'app.date.month_year.interval' : 'app.date.month_year.interval_open'} 
                                values={{ 
                                    start_at_month: _startAt.month,
                                    start_at_year: _startAt.year,
                                    end_at_month: _endAt.month,
                                    end_at_year: _endAt.year
                                }} 
                            />
                        </Typography>
                    </Grid>
                    <Grid item sx={{ mb: '6px', mt: '-8px' }}>
                        <Link href={github.link} target="_blank">{github.link}</Link>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" sx={{ mt: '3px', whiteSpace: 'pre-line' }}>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ mt: '10px' }}>                        
                        {sortedSkills.map((skill, index) => (      
                            <MyChip 
                                key={index} 
                                label={<FormattedMessage id={`app.skill.${skill}`} />} 
                                color="primary" 
                                size="small" 
                                sx={{ 
                                    marginRight: '3px', 
                                    marginBottom: '3px' 
                                }} 
                            />
                        ))}                                                      
                    </Grid>
                </Grid>
            </Grid>
            {children}
        </Grid>
    );
};

const SectionProjects = ({ mobile }) => {  
    const _projects = data?.projects?.items;

    const [projects] = useState({
        items: _projects
    });   
    
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <SectionTitle>
                            <FormattedMessage id="app.resume.projects.title" />
                        </SectionTitle>
                    </Grid>                    
                    <Grid item>
                        <Grid container direction="column">
                            {projects?.items?.map((project, index) => (
                                <Grid 
                                    item
                                    key={index}
                                    sx={{
                                        marginBottom: '0'
                                    }}
                                >
                                    <Project 
                                        key={index} 
                                        mobile={mobile}
                                        title={<FormattedMessage id={project.title} />}
                                        startAt={project.start_at}
                                        endAt={project.end_at}
                                        description={<FormattedMessage id={project.description} />}
                                        skills={project.skills}
                                        github={project.github}
                                        sx={{   
                                            width: '100%',
                                            mb: !mobile ? '24px' : 0
                                        }}                                        
                                    >
                                        {mobile && mobile && index < projects.items.length - 1 && (
                                            <Divider 
                                                sx={{ 
                                                    mt: 2, 
                                                    mb: 2, 
                                                    position: 'relative', 
                                                    width: 'calc(100% + 32px)',
                                                    left: '-16px'
                                                }}
                                            />
                                        )}
                                    </Project>
                                </Grid>
                            ))}
                        </Grid>                                            
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Education = ({ title, label, overline, startAt, endAt }) => {
    const momentStartAt = useRef(moment(startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(endAt ? moment(endAt, 'YYYY-MM-DD') : null);

    const [_startAt, _setStartAt] = useState({
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        year: momentEndAt.current ? momentEndAt.current.format('YYYY') : null
    });

    const site = useSelector((state) => state.site);

    useEffect(() => {
        moment.locale(site.lang);
        momentStartAt.current = moment(startAt, 'YYYY-MM-DD');
        momentEndAt.current = endAt ? moment(endAt, 'YYYY-MM-DD') : null;

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current ? momentEndAt.current.format('MMM') : null
            }
        });
    }, [site.lang]);

    return (
        <Grid container direction="column" sx={{ maxHeight: '76px' }}>
            <Grid container direction="row">
                <Grid item sx={{ width: '28px', position: 'relative', ml: '4px' }}>
                    <Box>
                        <SchoolIcon 
                            fontSize="small" 
                            color="primary" 
                        />
                    </Box>                
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 60px)' }}>
                    <Grid container direction="column">
                        <Grid item>
                            <MyH7 variant="h7" color="primary" component="h3" sx={{ mt: '-1px' }}>
                                <FormattedMessage id={title} />                                                
                            </MyH7> 
                            <Typography variant="caption" color="primary" sx={{ mt: '0px', lineHeight: '1', position: 'relative', display: 'block' }}>
                                <FormattedMessage id={label} />
                            </Typography>                                       
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" color="primary" sx={{ mt: '3px', lineHeight: '1' }}>
                                <FormattedMessage id={overline} />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="overline" sx={{ top: '-5px', mb: '4px', position: 'relative' }}>
                                <FormattedMessage 
                                    id={_endAt.year ? 'app.date.year.interval' : 'app.date.year.interval_open'} 
                                    values={{ 
                                        start_at_year: _startAt.year,
                                        end_at_year: _endAt.year
                                    }} 
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>  
    );
};

const SectionEducation = ({ mobile }) => {
    const _educations = data?.education?.items;
    const [education] = useState({
        items: _educations
    });

    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <SectionTitle>                            
                            <FormattedMessage id="app.resume.education.title" />
                        </SectionTitle>
                    </Grid>                    
                    <Grid item>
                        {education.items?.map((education, index) => (
                            <Education
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

const Training = ({ mobile, title, label, overline, startAt, endAt, icon, description, sx, contentSX, last = false }) => {
    const momentStartAt = useRef(moment(startAt, 'YYYY-MM-DD'));
    const momentEndAt = useRef(moment(endAt, 'YYYY-MM-DD'));

    const [_startAt, _setStartAt] = useState({
        month: momentStartAt.current.format('MMM'),
        year: momentStartAt.current.format('YYYY')
    });

    const [_endAt, _setEndAt] = useState({
        month: momentEndAt.current.format('MMM'),
        year: momentEndAt.current.format('YYYY')
    });

    const site = useSelector((state) => state.site);

    useEffect(() => {
        moment.locale(site.lang);
        momentStartAt.current = moment(startAt, 'YYYY-MM-DD');
        momentEndAt.current = moment(endAt, 'YYYY-MM-DD');

        _setStartAt(prevState => {
            return {
                ...prevState,
                month: momentStartAt.current.format('MMM')
            }
        });

        _setEndAt(prevState => {
            return {
                ...prevState,
                month: momentEndAt.current.format('MMM')
            }
        });
    }, [site.lang]);

    return (
        <Grid 
            container 
            direction="row"
            sx={{...sx}}
        >
            <Grid item sx={{ width: '28px', position: 'relative', ml: '30px' }}>
                <Typography
                    variant="caption" 
                    sx={{ 
                        position: 'absolute',
                        left: '-34px',
                        marginTop: '2px'
                    }}
                >
                    {_endAt.year}
                </Typography>
                <Box
                    sx={{
                        "&.MuiBox-root::after": {
                            content: '""',
                            backgroundColor: !last ? 'rgb(177, 177, 177)' : 'transparent',
                            width: '3px',
                            height: mobile ? 'calc(100% - 22px)' : 'calc(100% - 20px)',
                            display: 'block',
                            position: 'absolute',
                            left: '9px',
                            bottom: mobile ? '-6px' : '-8px',
                            borderRadius: '32px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <LoadableIcon icon={icon} props={{fontSize: 'small'}} />
                </Box>                
            </Grid>
            <Grid 
                item
                sx={{ 
                    width: !mobile ? 'calc(100% - 160px)' : 'calc(100% - 60px)',
                    ...contentSX
                }}
            >
                <Grid container direction="column">
                    <Grid item>
                        <MyH7 variant="h7" color="primary" component="h3" sx={{ mt: '-1px' }}>
                            {title}                                             
                        </MyH7> 
                        <Typography variant="caption" color="primary" sx={{ mt: '4px', lineHeight: '1', position: 'relative', display: 'block' }}>
                            {label}
                        </Typography>                                       
                    </Grid>
                    <Grid item>
                        <Typography variant="overline" component="div" sx={{ pt: '6px', lineHeight: '1', position: 'relative' }}>
                            <FormattedMessage 
                                id={'app.date.month_year.interval'} 
                                values={{ 
                                    start_at_month: _startAt.month,
                                    start_at_year: _startAt.year,
                                    end_at_month: _endAt.month,
                                    end_at_year: _endAt.year
                                }} 
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" sx={{ mt: '8px', whiteSpace: 'pre-line' }}>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const SectionTrainings = ({ mobile }) => {
    const _trainings = data?.training?.items;

    const [training] = useState({
        items: _trainings
    });
    
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    sx={{ 
                        padding: mobile ? '16px' : '30px 64px'
                    }}
                >
                    <Grid item>
                        <SectionTitle>
                            <FormattedMessage id="app.resume.trainings.title" />
                        </SectionTitle>
                    </Grid>                    
                    <Grid item>
                        <Grid 
                            container 
                            direction="column"
                            alignItems="start"
                        >
                            {training?.items?.map((t, index) => (
                                <Grid 
                                    item key={index} 
                                    sx={{ 
                                        mb: index + 1 < training?.items?.length ? '16px' : '0',
                                        width: '100%'
                                    }}
                                >
                                    <Training 
                                        mobile={mobile}
                                        title={<FormattedMessage id={t.title} />} 
                                        label={t.label} 
                                        overline={t.overline} 
                                        startAt={t.start_at} 
                                        endAt={t.end_at}
                                        icon={t.icon} 
                                        description={<FormattedMessage id={t.description} />}
                                        last={index >= training?.items?.length - 1}
                                        contentSX={{
                                            pb: index < training?.items?.length - 1 ? '10px' : '0'
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

const Footer = () => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    sx={{
                        paddingTop: '20px',
                        paddingBottom: '30px'
                    }}
                >
                    <Grid item sx={{ opacity: '0.4' }}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography 
                                    variant="caption" 
                                    component="div" 
                                    sx={{ mb: '-5px', whiteSpace: 'pre-line' }}
                                >
                                    <FormattedMessage id={'app.resume.footer.caption'} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link 
                                    href={_settings.site.resume.github.url}
                                    target="_blank"
                                    color="primary"
                                    sx={{
                                        fontSize: '12px',
                                    }}
                                >
                                    {_settings.site.resume.github.url}
                                </Link>
                            </Grid>
                        </Grid>    
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Resume = () => {
    const theme = useTheme();
    const mobile = !useMediaQuery(theme.breakpoints.up('md'));

    const site = useSelector((state) => state.site);

    useEffect(() => {
        const title = new IntlMessageFormat(messages[site.lang]['app.site.resume.title'], site.lang);
        document.title = title.format();
    }, [site.lang]);

    return (
        <Box style={{ backgroundColor: '#F0F1F2', width: '100%' }}>
            <Container 
                maxWidth="lg"
                sx={{ 
                    pt: 5,
                    paddingLeft: '4px',
                    paddingRight: '4px'
                }}
            >
                <Grid 
                    container
                    direction="column"
                    sx={{ paddingTop: mobile ? '30px' : '0' }}
                >
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionGeneral mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionExpertise mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionWorkExperiences mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionProjects mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionEducation mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionTrainings mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <ProfileRowContainer item>
                        <ProfileRowWrapper>
                            <SectionSkills mobile={mobile} />
                        </ProfileRowWrapper>
                    </ProfileRowContainer>
                    <Footer />                                    
                </Grid>
            </Container>
        </Box>
    );
};

export default Resume;
