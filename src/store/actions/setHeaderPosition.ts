import { SET_HEADER_POSITION } from './types';

import { HeaderPosition } from 'store/siteReducer';

const setHeaderPosition = (position: HeaderPosition) => {
    return {
        type: SET_HEADER_POSITION,
        position: position
    };
};

export default setHeaderPosition;
