import { Grid, IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import data from 'data/resume.json';
import { 
    BodyToolbarPicPadding,
    BodyToolbarPicWrapper,
    Container, 
    GridBodyContainer, 
    GridBodyToolbarContainer, 
    GridBodyToolbarPicContainer, 
    GridHeaderContainer, 
    HeaderImageContainer, 
    HeaderImagePadding, 
    HeaderImageWrap, 
    HeaderImageWrapper, 
    MainGrid,
    Avatar,
    GridBodyTitle,
    GridBodyWrapper,
    BodyTitle,
    BodySubtitle,
    GridBodyToolbarActionsContainer,
    GridBodySkills
} from "./styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import { useState } from "react";
import Chip from "ui-component/Resume/Chip";
import { IconMailUp } from '@tabler/icons-react';
import IntlMessageFormat from 'intl-messageformat';
import { messages } from 'i18n';
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDevice } from "hooks/useDevice";
import ShareContent from "ui-component/Share/Content";
import settings from 'data/settings.json';
import ActionSheetOrModal from "ui-component/ActionSheetOrModal";

const general = data?.general;

const SocialHeaderCard = () => {
    const theme = useTheme();
    const [isMobile] = useDevice();
    const lang = useSelector((state: RootState) => state.site.lang);

    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const moreOpen = Boolean(moreAnchorEl);    

    const handleMoreMenuClose = () => {
        setMoreAnchorEl(null);
    };

    const handleMoreClick = (event) => {        
        setMoreAnchorEl(event.currentTarget);       
    };    
    
    const handleContactEmailClick = () => {
        const subject = new IntlMessageFormat(messages[lang][data.contact.email.subject], lang);
        const body = new IntlMessageFormat(messages[lang][data.contact.email.body], lang);
        window.open(`mailto:${data.me.email}?subject=${subject.format()}&body=${body.format()}`);
    };

    const handleContactWhatsAppClick = () => {
        const message = new IntlMessageFormat(messages[lang][data.contact.whatsapp.message], lang);
        let url = `https://api.whatsapp.com/send?phone=${data.me.whatsapp.number}`;
        url += `&text=${encodeURI(message.format() as string)}&app_absent=0`;
        window.open(url);
    };

    const [shareActionSheetOpen, setShareActionSheetOpen] = useState(false);

    const handleShareClick = () => {
        setShareActionSheetOpen(true);
    };

    const handleShareActionSheetClose = () => {
        setShareActionSheetOpen(false);
    };

    return (
        <Container>
            <MainGrid
                container
                direction="column"
                alignItems="stretch"
            >
                <GridHeaderContainer
                    container
                    direction="column"
                    alignItems="stretch"
                    flexBasis="auto"
                >
                    <HeaderImagePadding />
                    <HeaderImageContainer>
                        <HeaderImageWrapper>
                            <HeaderImageWrap />
                        </HeaderImageWrapper>
                    </HeaderImageContainer>
                </GridHeaderContainer>
                <GridBodyContainer>
                    <GridBodyToolbarContainer
                        container
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <GridBodyToolbarPicContainer>
                            <BodyToolbarPicPadding />
                            <BodyToolbarPicWrapper>
                                <Avatar alt={data.me.name} src={data.me.pic.url} sx={{ borderColor: theme.palette.background.default }} />
                            </BodyToolbarPicWrapper>
                        </GridBodyToolbarPicContainer>
                        <GridBodyToolbarActionsContainer>
                            <Stack direction="row" spacing={0}>
                                <IconButton aria-label="contact-me-email" color="primary" onClick={handleContactEmailClick}>
                                    <IconMailUp />
                                </IconButton>
                                <IconButton
                                    aria-label="social-more-button"
                                    aria-controls={moreOpen ? 'translation-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={moreOpen ? 'true' : undefined}
                                    onClick={handleMoreClick}
                                    color="primary"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="translation-menu"
                                    anchorEl={moreAnchorEl}
                                    open={moreOpen}
                                    onClose={handleMoreMenuClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'translate-button',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: isMobile ? 'right' : 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: isMobile ? 'right' : 'left',
                                    }}
                                >
                                    <MenuItem onClick={() => { console.log('clicked'); }}>
                                        <ListItemText>Enviar uma proposta</ListItemText>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { handleMoreMenuClose(); handleContactEmailClick(); }}>
                                        <ListItemText>Contato por e-mail</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleMoreMenuClose(); handleContactWhatsAppClick(); }}>
                                        <ListItemText>Contato por WhatsApp</ListItemText>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { handleMoreMenuClose(); handleShareClick(); }}>
                                        <ListItemText>Compartilhar</ListItemText>
                                    </MenuItem>                                    
                                    <Divider />
                                    <MenuItem onClick={() => { handleMoreMenuClose(); window.open(data.me.github.link); }}>
                                        <ListItemText>Meu Github</ListItemText>
                                    </MenuItem>
                                    {/* <MenuItem onClick={() => { console.log('clicked'); }}>
                                        <ListItemText>Download em PDF</ListItemText>
                                    </MenuItem> */}
                                    <MenuItem onClick={() => { console.log('clicked'); }}>
                                        <ListItemText>Translate my résumé</ListItemText>
                                    </MenuItem>
                                </Menu>                                
                            </Stack>
                        </GridBodyToolbarActionsContainer>
                    </GridBodyToolbarContainer>
                    <GridBodyTitle
                        container
                        direction="column"
                        alignItems="stretch"
                        justifyContent="space-between"
                    >
                        <GridBodyWrapper>
                            <GridBodyWrapper>
                                <Grid item>
                                    <Grid container>
                                        <Grid item>
                                            <BodyTitle variant="h4">Edicleo Oliveira</BodyTitle>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <BodySubtitle variant="body2" color={theme.palette.primary.light}>Desenvolvedor Full Stack</BodySubtitle>
                                </Grid>
                                <GridBodySkills item sx={{ mt: 1 }}>
                                    <Stack direction="row" spacing={0.8}>
                                        {general?.skills?.map((skill, index) => (
                                            <Chip 
                                                key={index} 
                                                label={<FormattedMessage id={`app.skill.${skill}`} />} 
                                                color="primary" 
                                                size="small" 
                                            />    
                                        ))}
                                    </Stack>
                                </GridBodySkills>
                            </GridBodyWrapper>
                        </GridBodyWrapper>
                    </GridBodyTitle>
                </GridBodyContainer>
            </MainGrid>
            <ActionSheetOrModal
                open={shareActionSheetOpen}
                onClose={handleShareActionSheetClose}
                actionSheet={{
                    height: 176
                }}
            >
                <ShareContent
                    url={settings.site.url}
                    title={data.me.name}
                    whatsAppText={new IntlMessageFormat(messages[lang][data.share.message], lang).format() as string}
                    telegramText={new IntlMessageFormat(messages[lang][data.share.message], lang).format() as string}
                    smsText={new IntlMessageFormat(messages[lang][data.share.sms.message], lang).format() as string}
                    emailSubject={new IntlMessageFormat(messages[lang][data.share.email.subject], lang).format() as string}
                    emailBody={new IntlMessageFormat(messages[lang][data.share.sms.message], lang).format() as string}
                />
            </ActionSheetOrModal>
        </Container>
    );
};

export default SocialHeaderCard;
