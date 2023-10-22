import { category, difficulty } from '../components/Header/selectData';

export type RequestQuizType = {
    amount: string,
    category: string,
    difficulty: string
}
export type ChangeInputType = {
    content: string,
    id: number,
    isCorrect: boolean
}
export type SuccessQuizType = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
    input_answer?: string
    isCorrect: boolean;
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
    selectedQuiz: SuccessQuizType;
    addQuizLoading: boolean,
    addQuizDone: boolean,
    addQuizError: string | null,
};

