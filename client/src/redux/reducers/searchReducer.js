import { GLOBALTYPES } from "../actions/globalTypes";

const searchReducer = (state = [], action) => {
    switch (action.type) {
        case GLOBALTYPES.SEARCH:
            return action.payload;

        default:
            return state;
    }
};

export default searchReducer;
