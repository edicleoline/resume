import { SET_HEADER_VISIBILITY } from './types';

const setHeaderVisibility = (visible: boolean) => {
    return {
        type: SET_HEADER_VISIBILITY,
        visible: visible
    };
};

export default setHeaderVisibility;
