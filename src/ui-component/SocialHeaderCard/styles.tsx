import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Avatar as MaterialAvatar } from "@mui/material";

export const Container = styled(Box)({
    position: 'relative'
});

export const Title = styled(Typography)({
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: 'calc(1rem)',
    fontWeight: 600,
    marginBottom: '16px'
});

export const GridHeaderContainer = styled(Grid)({
    overflow: 'hidden',
    display: 'block',
    position: 'relative'
});

export const MainGrid = styled(Grid)({
    position: 'relative'
});

export const HeaderImageContainer = styled('div')({
    bottom: 0,
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
});

export const HeaderImageWrapper = styled('div')({
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden'
});

export const HeaderImageWrap = styled('div')({
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: 1,
    borderRadius: '6px',
    backgroundImage: 'url("https://images.wallpaperscraft.com/image/single/rocket_smoke_space_153323_2560x1080.jpg")'
});

export const HeaderImagePadding = styled('div')({
    display: 'block',
    width: '100%',
    paddingBottom: '33.3333%'
});

export const GridBodyContainer = styled(Grid)({
    position: 'relative',
    paddingLeft: '16px',
    paddingRight: '0',
    paddingTop: '12px',
    marginBottom: '16px'
});

export const GridBodyToolbarContainer = styled(Grid)({
    position: 'relative'    
});

export const GridBodyToolbarPicContainer = styled(Grid)({
    position: 'relative',
    display: 'block',
    overflow: 'visible',
    marginBottom: '12px',
    height: 'auto',
    marginTop: '-15%',
    minWidth: '48px',
    width: '25%',
    zIndex: 2
});

export const BodyToolbarPicPadding = styled('div')({
    display: 'block',
    width: '100%',
    paddingBottom: '100%'
});

export const BodyToolbarPicWrapper = styled('div')({
    bottom: 0,
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
});

export const Avatar = styled(MaterialAvatar)({
    width: '100%', 
    height: '100%',
    position: 'absolute',
    border: 'solid 3px #fff'
});

export const GridBodyTitle = styled(Grid)({
    marginTop: '4px',
    marginBottom: '12px',
    position: 'relative'
});

export const GridBodyWrapper = styled(Grid)({
    flexShrink: 1,
    maxWidth: '100%'
});

export const BodyTitle = styled(Typography)({
    fontSize: '1.1rem'
});

export const BodySubtitle = styled(Typography)({
    position: 'relative'
});

export const GridBodyToolbarActionsContainer = styled(Grid)({
    position: 'relative',
    top: '-4px'
});

export const GridBodySkills = styled(Grid)({
    marginTop: '6px',
    position: 'relative'
});