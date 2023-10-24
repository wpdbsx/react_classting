import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from "axios";
import { ADD_QUIZ_REQUEST, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAILURE, CHANGE_INPUT_ANSWER, COMPLETE_QUIZ, CHANGE_INCORRECT_NOTE_PAGE } from '../actionType/quiz';
import { ChangeIncorrectNotePage, ChangeInputType, CompleteQuizType, RequestQuizType, SuccessPostType } from '../../types/reduxType';


export const changeIncorrectNotePage = createAction(CHANGE_INCORRECT_NOTE_PAGE)<ChangeIncorrectNotePage>();

export const completeQuiz = createAction(COMPLETE_QUIZ)<CompleteQuizType>();

export const changeInputAnswer = createAction(CHANGE_INPUT_ANSWER)<ChangeInputType>();

export const getQuiz = createAsyncAction(
    ADD_QUIZ_REQUEST,
    ADD_QUIZ_SUCCESS,
    ADD_QUIZ_FAILURE
)<RequestQuizType, SuccessPostType, AxiosError>();