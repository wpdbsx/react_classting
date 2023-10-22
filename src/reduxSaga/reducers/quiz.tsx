
import { produce } from "immer";
import { getType } from 'typesafe-actions';
import { InitialStateQuizType } from '../../types/reduxType';
import { changeInputAnswerType, quizActionType } from "../action";
import { changeInputAnswer, getQuiz } from '../action/actions';




export type QuizState = ReturnType<typeof reducer>;


const initialState: InitialStateQuizType = {
  mainQuizs: [
  ],
  selectedQuiz: [],
  addQuizLoading: false,
  addQuizDone: false,
  addQuizError: null,
};



const reducer = (state = initialState, action: quizActionType | changeInputAnswerType) => {
  switch (action.type) {
    case getType(getQuiz.request):
      return produce(state, (draft) => {
        draft.addQuizLoading = true;
        draft.addQuizDone = false;
        draft.addQuizError = null;
      });

    case getType(getQuiz.success): {
      const decodeQuiz = action.payload.results?.map((quiz) => ({
        category: decodeURIComponent(quiz.category),
        correct_answer: decodeURIComponent(quiz.correct_answer),
        difficulty: quiz.difficulty,
        incorrect_answers: quiz.incorrect_answers.map((answer) => decodeURIComponent(answer)),
        question: decodeURIComponent(quiz.question),
        type: quiz.type,
        input_answer: "",
        isCorrect: false,
      })
      );
      return produce(state, (draft) => {
        draft.addQuizLoading = false;
        draft.addQuizDone = true;
        draft.addQuizError = null;
        draft.selectedQuiz = decodeQuiz;
        // draft.mainQuizs = [{
        //   id: draft.mainQuizs.length + 1,
        //   Quizs: action.payload.results, 
        // }, ...draft.mainQuizs];
      });
    }
    case getType(getQuiz.failure):
      return produce(state, (draft) => {
        draft.addQuizLoading = false;
        draft.addQuizDone = false;
        draft.addQuizError = action.payload.response?.data as string;
      });
    case getType(changeInputAnswer):
      return produce(state, (draft) => {
        const { id } = action.payload;
        draft.selectedQuiz[id].isCorrect = action.payload.isCorrect;
        draft.selectedQuiz[id].input_answer = action.payload.content;
      }

      );

    default:
      return state;
  }
};



export default reducer;
