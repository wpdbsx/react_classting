
import { combineReducers } from "redux";
import quiz from "./quiz";

const rootReducer = combineReducers({
  quiz
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
