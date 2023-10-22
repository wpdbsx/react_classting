
import { produce } from "immer";
import { createReducer, getType } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { InitialStateQuizType, RequestQuizType, SuccessQuizType } from '../../types/reduxType';
import { getQuiz } from '../action/actions';
import { quizActionType } from "../action";



export type QuizState = ReturnType<typeof reducer>;


const initialState: InitialStateQuizType = {
  mainQuizs: [
  ],
  selectedQuiz: null,
  addQuizLoading: false,
  addQuizDone: false,
  addQuizError: null,
};



const reducer = (state = initialState, action: quizActionType) => {
  switch (action.type) {
    case getType(getQuiz.request):
      return produce(state, (draft) => {
        draft.addQuizLoading = true;
        draft.addQuizDone = false;
        draft.addQuizError = null;
      });

    case getType(getQuiz.success):
      console.log(action)
      return produce(state, (draft) => {
        draft.addQuizLoading = false;
        draft.addQuizDone = true;
        draft.addQuizError = null;
        draft.selectedQuiz = action.payload.results;
        // draft.mainQuizs = [{
        //   id: draft.mainQuizs.length + 1,
        //   Quizs: action.payload.results, 
        // }, ...draft.mainQuizs];
      });

    case getType(getQuiz.failure):
      return produce(state, (draft) => {
        draft.addQuizLoading = false;
        draft.addQuizDone = false;
        draft.addQuizError = action.payload.response?.data as string;
      });

    default:
      return state;
  }
};



export default reducer;
