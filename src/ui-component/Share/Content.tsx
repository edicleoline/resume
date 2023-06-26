import Grid from '@mui/material/Grid';
import data from '../../data/resume.json';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { ShareButtonBase, ShareButtonGrid } from './styles';
import TelegramIcon from '@mui/icons-material/Telegram';
import MessageIcon from '@mui/icons-material/Message';
import { useTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';

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
                            fontSize: '12px',
                            border: 'none 0 !important'
                        }}
                        color="primary"
                    >
                        {text}                    
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

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

export interface ShareContentProps {
    title: string;
    url: string;
    whatsAppText: string;
    telegramText: string;
    smsText: string;
    emailSubject: string;
    emailBody: string;
};

const ShareContent = (props: ShareContentProps) => {
    const theme = useTheme();
    const handleShareWhatsappClick = () => {
        window.open(`https://api.whatsapp.com/send?text=${props.whatsAppText}`);
    };

    const handleShareTelegramClick = () => {
        window.open(`https://telegram.me/share/url?url=${props.url}&text=${props.telegramText}`);
    };

    const handleShareSmsClick = () => {
        window.open(`sms:?body=${props.smsText}`);
    };

    const handleShareEmailClick = () => {
        window.open(`mailto:?subject=${props.emailSubject}&body=${props.emailBody}`);
    };

    return (
        <Grid container direction="column">
            <Grid item>
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
                        <Typography variant="body1" component="div" sx={{ mb: 0 }}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mb: 0, mt: '-2px' }}>
                            {props.url}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
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
                    <ShareButtonGrid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <WhatsAppIcon 
                                    sx={{ fontSize: '28px' }}                                                                 
                                />
                            } 
                            text="WhatsApp" 
                            onClick={handleShareWhatsappClick}
                        />
                    </ShareButtonGrid>
                    <ShareButtonGrid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <TelegramIcon 
                                    sx={{ fontSize: '28px' }} />
                            } 
                            text="Telegram" 
                            onClick={handleShareTelegramClick}
                        />
                    </ShareButtonGrid>
                    <ShareButtonGrid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <MessageIcon sx={{ fontSize: '28px' }} />
                            } 
                            text="SMS" 
                            onClick={handleShareSmsClick}
                        />
                    </ShareButtonGrid>
                    <ShareButtonGrid item sx={{ flex: 1 }}>
                        <ShareButton 
                            icon={
                                <EmailIcon sx={{ fontSize: '28px' }} />
                            } 
                            text="E-mail" 
                            onClick={handleShareEmailClick}
                        />
                    </ShareButtonGrid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ShareContent;
