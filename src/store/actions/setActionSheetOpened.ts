import { SET_ACTION_SHEET_OPENED } from './types';

const setActionSheetOpened = (opened: boolean) => {
    return {
        type: SET_ACTION_SHEET_OPENED,
        opened: opened
    };
};

export default setActionSheetOpened;
