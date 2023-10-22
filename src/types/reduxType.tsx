import { category, difficulty } from '../components/Header/selectData';

export type RequestQuizType = {
    amount: string,
    category: string,
    difficulty: string
}
export type SuccessQuizType = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answer: string[],
    question: string,
    type: string,
    input_answer?: string
}[]
export type SuccessPostType = {
    response_code: string,
    results: SuccessQuizType
}
export type InitialStateQuizType = {
    mainQuizs: {
        id: number,
        Quizs: SuccessQuizType
    }[];
    selectedQuiz: SuccessQuizType | null;
    addQuizLoading: boolean,
    addQuizDone: boolean,
    addQuizError: string | null,
};

