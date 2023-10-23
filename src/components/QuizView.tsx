import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { RootState } from "../reduxSaga/reducers";
import { ContentQustion, QuestionContent, ContentInput, QuestionLabel, ContentInputBox, ContentInputText, ContentInputCheckBox, ContentButtonBox, ContentButtonText, ContentButton } from "../styles/contentStyle";
import { CHANGE_INPUT_ANSWER, COMPLETE_QUIZ } from "../reduxSaga/actionType/quiz";
import { QuizViewerType } from "../types/pageType";




const QuizViewer: React.FC<QuizViewerType> = ({ handleChangeView }) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(0);
    const { quizs } = useSelector((state: RootState) => state.quiz.selectedQuiz)

    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const correctCount = useRef<number>(0); // 정답수 카운트
    const incorrectCount = useRef<number>(0); // 오답수 카운트

    useEffect(() => {
        if (!addQuizLoading) {
            // 퀴즈가 다시 시작되면 값 초기화
            setPage(0);
            correctCount.current = 0;
            incorrectCount.current = 0;
        }
    }, [addQuizLoading]);

    const shuffleArray = useCallback((array: string[]) => {
        // 배열을 랜덤하게 섞기 위한 함수
        return array?.sort(() => Math.random() - 0.5);
    }, [])

    const array = useMemo(() => shuffleArray(
        quizs[page]?.incorrect_answers?.concat(quizs[page]?.correct_answer)
    ), [page, quizs[page]?.correct_answer])


    const handleChange = useCallback((e: CheckboxChangeEvent) => {
        const isCorrect = e.target.value === quizs[page].correct_answer;
        if (isCorrect) {
            correctCount.current += 1
        } else {
            incorrectCount.current += 1
        }
        dispatch({
            type: CHANGE_INPUT_ANSWER,
            payload: {
                content: e.target.value,
                id: page,
                isCorrect,
            }
        });

    }, [page, quizs])

    const handlePageChange = useCallback((data: "+" | "-") => () => {
        if (data === "+") {
            setPage((prev) => prev + 1);
        } else {
            setPage((prev) => prev - 1);
        }
    }, [])
    const handleComplete = useCallback(() => {
        dispatch({
            type: COMPLETE_QUIZ,
            payload: {
                correctCount: correctCount.current,
                incorrectCount: incorrectCount.current,
            }
        });
        handleChangeView(true);
    }, [])
    return (
        <>
            {quizs.length > 0 && (
                <>
                    <ContentQustion>
                        <QuestionLabel>문제 {page + 1} 객관식 문제({quizs[page].category})[<span>{quizs[page].difficulty}</span>]</QuestionLabel>
                        <QuestionContent>{quizs[page].question}</QuestionContent>
                    </ContentQustion>
                    <ContentInputBox>
                        {array?.map((question, index) => (
                            <ContentInput key={question} $color={quizs[page].isCorrect ? "green" : quizs[page].input_answer && "red"}>
                                <ContentInputCheckBox
                                    disabled={quizs[page].input_answer !== ''}
                                    checked={question === quizs[page].input_answer}
                                    value={question}
                                    onChange={handleChange}
                                />
                                <ContentInputText>{question}</ContentInputText>
                            </ContentInput>
                        ))}
                    </ContentInputBox>
                    <ContentButtonBox>
                        {quizs[page].input_answer ? (
                            <>
                                {page === 0 ? (
                                    <ContentButtonText />
                                ) : (
                                    <ContentButton onClick={handlePageChange("-")}>이전문제</ContentButton>
                                )}
                                <ContentButtonText>{page + 1}/{quizs.length}</ContentButtonText>
                                {page === quizs.length - 1 ? (
                                    <ContentButton onClick={handleComplete}>퀴즈완료</ContentButton>
                                ) : (
                                    <ContentButton onClick={handlePageChange("+")}>다음문제</ContentButton>
                                )}
                            </>
                        ) : (
                            <>
                                <ContentButtonText />
                                <ContentButtonText>{page + 1}/{quizs.length}</ContentButtonText>
                                <ContentButtonText />
                            </>
                        )}
                    </ContentButtonBox>
                </>
            )}
        </>
    );

}

export default QuizViewer;