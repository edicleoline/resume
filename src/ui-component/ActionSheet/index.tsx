import { useEffect, useState, useRef } from 'react';
import { useSpring, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Backdrop from '@mui/material/Backdrop';
import { ActionSheetContainer } from './styles';
import setActionSheetOpened from 'store/actions/setActionSheetOpened';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { SxProps, useTheme } from '@mui/material/styles';

export interface ActionSheetProps {
    open: boolean;
    onClose?(): void;
    children: React.ReactElement;
    height: number;
    sx?: SxProps;
}
const ActionSheet = (props: ActionSheetProps) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [opened, setOpened] = useState(false);
    const [{ y }, set] = useSpring(() => ({ y: props.height }));
  
    const handleOpen = ({ canceled }) => {
        setOpened(true);
        set({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
    };

    const handleClose = (velocity = 0) => {
        setOpened(false);
        set({ y: props.height, immediate: false, config: { ...config.stiff, velocity } });
        props.onClose?.();
    };
  
    const bind = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
            if (my < -70) cancel()
            if (last) {
                my > props.height * 0.5 || vy > 0.5 ? handleClose(vy) : handleOpen({ canceled })
            } else set({ y: my, immediate: true });
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    );
  
    const display = y.to((py) => (py < props.height ? 'block' : 'none'));

    useEffect(() => {
        if (props.open) {
            handleOpen({ canceled: undefined });
            dispatch(setActionSheetOpened(true));
        } else {            
            handleClose();
            dispatch(setActionSheetOpened(false));
        }
    }, [props.open]);

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
            sx={props.sx}
            theme={theme}
            style={{ 
                display, 
                bottom: `calc(-100vh + ${props.height - 100}px)`, 
                y 
            }}
        >
            {props.children}
        </ActionSheetContainer>
      </>
    );
};

export default ActionSheet;
