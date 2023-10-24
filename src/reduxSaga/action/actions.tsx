import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from "axios";
import { ADD_QUIZ_REQUEST, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAILURE, CHANGE_INPUT_ANSWER, COMPLETE_QUIZ } from '../actionType/quiz';
import { ChangeInputType, CompleteQuizType, RequestQuizType, SuccessPostType } from '../../types/reduxType';



export const completeQuiz = createAction(COMPLETE_QUIZ)<CompleteQuizType>();

export const changeInputAnswer = createAction(CHANGE_INPUT_ANSWER)<ChangeInputType>();

export const getQuiz = createAsyncAction(
    ADD_QUIZ_REQUEST,
    ADD_QUIZ_SUCCESS,
    ADD_QUIZ_FAILURE
)<RequestQuizType, SuccessPostType, AxiosError>();