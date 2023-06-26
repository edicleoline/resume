import { styled } from '@mui/material/styles';

export const Main = styled('main')({
    width: '100%'
});

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
});

export const HeaderContainer = styled('div')({    
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '32px',
    paddingRight: '32px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '60px'
});

export const HeaderMobileContainer = styled('div')({    
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '15px',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

export const HeaderMobileToolbarContainer = styled('div')({    
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
});

export const HeaderMobileNavContainer = styled('div')({    
    width: '100%',
    paddingTop: '30px'
});