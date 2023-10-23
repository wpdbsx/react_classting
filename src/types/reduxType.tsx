import { category, difficulty } from '../components/Header/selectData';

export type RequestQuizType = {
    amount: string,  // 퀴즈 개수
    category: string, // 카테고리
    difficulty: string // 난이도
}

export type ChangeInputType = {
    content: string,    // 퀴즈 내용
    id: number,         // 퀴즈 번호
    isCorrect: boolean  // 정답 유무
}
export type quizType = {
    category: string,      // 종류
    correct_answer: string, // 정답
    difficulty: string,      // 난이도
    incorrect_answers: string[],  // 틀린 정답
    question: string,  // 질문
    type: string, // 유형 multiple 고정
    input_answer?: string // 입력한 정답
    isCorrect: boolean; // 정답 유무 (true/false)
}
export type SuccessQuizType = {
    quizs: quizType[] // 퀴즈 리스트
    time: number;   // 전체 퀴즈 푼 시간
    correctCount: number, // 정답수
    incorrectCount: number //오답수
}
export type SuccessPostType = {
    response_code: string,   // 응답 코드
    results: quizType[]   // api호출 불러온 퀴즈 리스트 값
}
export type InitialStateQuizType = {
    mainQuizs: {
        id: number,
        content: SuccessQuizType,  // 퀴즈 리스트

    }[];
    selectedQuiz: SuccessQuizType; // 현재 선택된 퀴즈리스트
    addQuizLoading: boolean, // 퀴즈 생성 api 호출 로딩상태
    addQuizDone: boolean,  // 퀴즈 생성 api 완료 유무
    addQuizError: string | null, // 퀴즈 생성 api 에러 유무
};

