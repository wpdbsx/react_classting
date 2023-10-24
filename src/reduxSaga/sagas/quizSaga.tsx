import {
    all,
    fork,
    takeEvery,
    call,
    put
} from "redux-saga/effects";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ADD_QUIZ_FAILURE, ADD_QUIZ_REQUEST, ADD_QUIZ_SUCCESS } from "../actionType/quiz";
import { quizActionType } from "../action";
import { RequestQuizType, SuccessQuizType } from "../../types/reduxType";
import { difficulty } from '../../components/Header/selectData';



function addQuizAPI(action: quizActionType): Promise<AxiosResponse<any>> {
    const { amount, category, difficulty } = action.payload as RequestQuizType

    let apiUrl = `https://opentdb.com/api.php?amount=${amount}&type=multiple&encode=url3986`;

    // category 값이 존재하면 URL에 추가
    if (category !== "any") {
        apiUrl += `&category=${category}`;
    }

    // difficulty 값이 존재하면 URL에 추가
    if (difficulty !== "any") {
        apiUrl += `&difficulty=${difficulty}`;
    }
    return axios.post<SuccessQuizType>(
        apiUrl
    );
}


function* addQuiz(action: quizActionType): Generator<any, void, AxiosResponse<any>> {
    try {
        const result: AxiosResponse<any> = yield call(addQuizAPI, action);

        yield put({
            type: ADD_QUIZ_SUCCESS,
            payload: result.data
        });


    } catch (err: any) {
        console.log(err)
        yield put({
            type: ADD_QUIZ_FAILURE,
            payload: err.response?.data
        });
    }
}

function* watchAddQuiz() {
    yield takeEvery(ADD_QUIZ_REQUEST, addQuiz);
}

export default function* quizSaga() {
    yield all(
        [fork(watchAddQuiz)]
    );
}