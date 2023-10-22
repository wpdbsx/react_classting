import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError, AxiosResponse } from "axios";
import { ADD_QUIZ_REQUEST, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAILURE } from '../actionType/quiz';
import { RequestQuizType, SuccessPostType } from '../../types/reduxType';



export const getQuiz = createAsyncAction(
    ADD_QUIZ_REQUEST,
    ADD_QUIZ_SUCCESS,
    ADD_QUIZ_FAILURE
)<RequestQuizType, SuccessPostType, AxiosError>();