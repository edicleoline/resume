import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormattedMessage } from 'react-intl';
import IntlMessageFormat from 'intl-messageformat';
import { locale, messages } from './../../i18n';
import { useSelector } from 'react-redux';
import { MainContainer, Wrapper, bigTextStyle, BigTextWrapper } from './styles';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import happyJson from './../../assets/animation/rocket.json';

const Final = ({ onDone, mobile }) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
        >
            <BigTextWrapper sx={{ textAlign: 'center' }}>
                <Lottie animationData={happyJson} loop={true} autoplay={true} style={{ maxWidth: '50%', margin: 'auto', marginBottom: '60px' }} />
                <TypeAnimation
                    sequence={[
                        1000 * 1,
                        'Claro que aceito a proposta!',
                        1000 * 1,      
                        'Claro que aceito a proposta! A partir do dia 1º iremos trabalhar juntos!',               
                        1000 * 3,      
                        () => {
                        }
                    ]}
                    wrapper="span"
                    omitDeletionAnimation={false}
                    cursor={true}
                    style={{ ...bigTextStyle(mobile) }}
                    speed={{ type: "keyStrokeDelayInMs", value: 40 }}
                    deletionSpeed={{ type: "keyStrokeDelayInMs", value: 50 }}
                    repeat={0}
                />          
            </BigTextWrapper>
        </motion.div>              
    );
};

const LastMessage = ({ onDone, mobile }) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
        >
            <BigTextWrapper>
                <TypeAnimation
                    sequence={[
                        1000 * 2,
                        'Sendo assim...',
                        1000 * 2,      
                        'Sendo assim, espero que não fiquem chateados.',               
                        1000 * 3,      
                        () => {
                            onDone();
                        }
                    ]}
                    wrapper="span"
                    omitDeletionAnimation={false}
                    cursor={true}
                    style={{ ...bigTextStyle(mobile) }}
                    speed={{ type: "keyStrokeDelayInMs", value: 40 }}
                    deletionSpeed={{ type: "keyStrokeDelayInMs", value: 50 }}
                    repeat={0}
                />                
            </BigTextWrapper>            
        </motion.div>              
    );
};

const Message = ({ onDone, mobile }) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
        >
            <BigTextWrapper>
                <TypeAnimation
                    sequence={[
                        1000 * 2,
                        'Agradeço demais a oportunidade.\n',
                        1000 * 2,
                        'Agradeço demais a oportunidade.\nPorém,',
                        1000 * 3,
                        'Agradeço demais a oportunidade.\nPorém, quem manda em casa é a esposa',
                        1000 * 2,
                        'Agradeço demais a oportunidade.\nPorém, quem manda dentro e fora de casa é a esposa.',
                        1000 * 3,
                        () => {
                            onDone();
                        }
                    ]}
                    wrapper="span"
                    omitDeletionAnimation={false}
                    cursor={true}
                    style={{ ...bigTextStyle(mobile) }}
                    speed={{ type: "keyStrokeDelayInMs", value: 40 }}
                    deletionSpeed={{ type: "keyStrokeDelayInMs", value: 50 }}
                    repeat={0}
                />
            </BigTextWrapper>
        </motion.div>              
    );
};

const Welcome = ({ onDone, mobile }) => {
    return (
        <motion.div
            transition={{ duration: 0.5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
        >
            <BigTextWrapper>
                <TypeAnimation
                    sequence={[
                        1000 * 2,
                        'Olá!\n',
                        1000 * 1,
                        'Olá!\nEsta é uma forma estranha de responder',
                        1000 * 2,
                        'Olá!\nEsta é uma forma singela de agradecer a toda equipe de recrutamento da Imagem.',
                        1000 * 3,
                        () => {
                            onDone();
                        }
                    ]}
                    wrapper="span"
                    omitDeletionAnimation={false}
                    cursor={true}
                    style={{ ...bigTextStyle(mobile) }}
                    speed={{ type: "keyStrokeDelayInMs", value: 40 }}
                    deletionSpeed={{ type: "keyStrokeDelayInMs", value: 50 }}
                    repeat={0}
                />
            </BigTextWrapper>
        </motion.div>              
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

    const [welcomeIsVisible, setWelcomeIsVisible] = useState(true);
    const [messageIsVisible, setMessageIsVisible] = useState(false);
    const [lastMessageIsVisible, setLastMessageIsVisible] = useState(false);
    const [finalIsVisible, setFinalIsVisible] = useState(false);
    
    const welcomeOnDone = () => {
        setWelcomeIsVisible(false);
    };    

    const welcomeOnExitComplete = () => {
        setMessageIsVisible(true);
    };

    const messageOnDone = () => {
        setMessageIsVisible(false);
    };    

    const messageOnExitComplete = () => {
        setLastMessageIsVisible(true);
    };

    const lastMessageOnDone = () => {
        setLastMessageIsVisible(false);
    };    

    const lastMessageOnExitComplete = () => {
        setFinalIsVisible(true);
    };

    return (
        <MainContainer>
            <Wrapper  maxWidth="lg">
                <Grid
                    container
                    alignContent="stretch"                    
                    sx={{ 
                        height: '100%'                        
                    }}            
                >
                    <Grid 
                        item
                        sx={{
                            flex: 1,
                            alignSelf: 'end',
                            // textAlign: 'center',
                            paddingBottom: '240px'
                        }}
                    >
                        {/* <Final mobile={mobile} /> */}
                        <AnimatePresence
                            initial={false}
                            onExitComplete={welcomeOnExitComplete}
                            mode="wait"
                        >
                            {welcomeIsVisible && (
                                <Welcome onDone={welcomeOnDone} mobile={mobile} />
                            )}
                        </AnimatePresence> 

                        <AnimatePresence
                            initial={false}
                            onExitComplete={messageOnExitComplete}
                            mode="wait"
                        >
                            {messageIsVisible && (
                                <Message onDone={messageOnDone} mobile={mobile} />
                            )}
                        </AnimatePresence>

                        <AnimatePresence
                            initial={false}
                            onExitComplete={lastMessageOnExitComplete}
                            mode="wait"
                        >
                            {lastMessageIsVisible && (
                                <LastMessage onDone={lastMessageOnDone} mobile={mobile} />
                            )}
                        </AnimatePresence>

                        <AnimatePresence
                            initial={false}
                            // onExitComplete={lastMessageOnExitComplete}
                            mode="wait"
                        >
                            {finalIsVisible && (
                                <Final mobile={mobile} />
                            )}
                        </AnimatePresence>  

                    </Grid>
                </Grid>
            </Wrapper>
        </MainContainer>
    );
};

export default Resume;