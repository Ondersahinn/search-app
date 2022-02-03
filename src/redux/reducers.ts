import { combineReducers } from "redux";

import mockData from "redux/slices/mockData";

const rootReducer = combineReducers({ mockData });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
