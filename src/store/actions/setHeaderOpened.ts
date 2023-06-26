import { SET_HEADER_OPENED } from './types';

const setHeaderOpened = (opened: boolean) => {
    return {
        type: SET_HEADER_OPENED,
        opened: opened
    };
};

export default setHeaderOpened;
