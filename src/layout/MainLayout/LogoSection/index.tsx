import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from 'ui-component/Logo';

const LogoSection = () => {
    return (
        <ButtonBase disableRipple onClick={() => {console.log('test-click-logo');}} component={Link} to={''}>
            <Logo props={{ style: { width: 38, height: 38 } }} />
        </ButtonBase>
    );
};

export default LogoSection;
