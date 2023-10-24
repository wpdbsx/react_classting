import { createAction, createAsyncAction } from 'typesafe-actions'
import { AxiosError } from 'axios'
import {
  ADD_QUIZ_REQUEST,
  ADD_QUIZ_SUCCESS,
  ADD_QUIZ_FAILURE,
  CHANGE_INPUT_ANSWER,
  COMPLETE_QUIZ,
  CHANGE_INCORRECT_NOTE_PAGE,
  CHANGE_IS_RESULT_VIEW,
} from '../actionType/quiz'
import {
  ChangeIncorrectNotePageType,
  ChangeInputType,
  CompleteQuizType,
  RequestQuizType,
  SuccessPostType,
  changeIsResultViewType,
} from '../../types/reduxType'

export const changeIsResultView = createAction(CHANGE_IS_RESULT_VIEW)<changeIsResultViewType>()

export const changeIncorrectNotePage = createAction(CHANGE_INCORRECT_NOTE_PAGE)<ChangeIncorrectNotePageType>()

export const completeQuiz = createAction(COMPLETE_QUIZ)<CompleteQuizType>()

export const changeInputAnswer = createAction(CHANGE_INPUT_ANSWER)<ChangeInputType>()

export const getQuiz = createAsyncAction(ADD_QUIZ_REQUEST, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAILURE)<
  RequestQuizType,
  SuccessPostType,
  AxiosError
>()
