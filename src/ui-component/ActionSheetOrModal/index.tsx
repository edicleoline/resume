import ActionSheet from 'ui-component/ActionSheet';
import { SxProps } from '@mui/material/styles';
import { useDevice } from 'hooks/useDevice';
import { ModalContainer } from './styles';
import Dialog from '@mui/material/Dialog';

export interface ActionSheetOrModalActionSheetProps {
    height: number;
};

export interface ActionSheetOrModalProps {
    open: boolean;
    onClose?(): void;
    children: React.ReactElement;
    sx?: SxProps;
    actionSheet: ActionSheetOrModalActionSheetProps;
};

const ActionSheetOrModal = (props: ActionSheetOrModalProps) => {
    const [isMobile] = useDevice();

    return (
        <>
            {isMobile ? (
                <ActionSheet open={props.open} onClose={props.onClose} height={props.actionSheet.height}>
                    {props.children}
                </ActionSheet>
            ) : (
                <Dialog onClose={props.onClose} open={props.open}>
                    <ModalContainer>
                        {props.children}
                    </ModalContainer>
                </Dialog>
            )}
        </>
    );
};

export default ActionSheetOrModal;