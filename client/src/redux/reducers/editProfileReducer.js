import { GLOBALTYPES } from "../actions/globalTypes";

const editProfileReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.EDIT_PROFILE:
            return action.payload;

        default:
            return state;
    }
};

export default editProfileReducer;