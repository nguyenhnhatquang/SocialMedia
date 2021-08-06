import { GLOBALTYPES } from "../actions/globalTypes";


const changePasswordReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.CHANGE_PASSWORD:
            return action.payload;

        default:
            return state;
    }
};

export default changePasswordReducer;