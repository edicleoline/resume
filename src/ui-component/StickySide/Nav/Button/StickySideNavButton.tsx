import Button, { ButtonProps } from '@mui/material/Button';

const StickySideNavButton = (props: ButtonProps) => {
    return (
        <Button
            sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                paddingLeft: '16px',
                paddingRight: '16px'
            }}
            {...props}
        >
            {props.children!}
        </Button>
    );
};

export default StickySideNavButton;