import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from "../../reduxSaga/reducers";
import { ContentQustion, QuestionContent, ContentInput, QuestionLabel, ContentInputBox, ContentInputText, ContentInputCheckBox, ContentButtonBox, ContentButtonText, ContentButton } from "../../styles/contentStyle";
import { CHANGE_INPUT_ANSWER, COMPLETE_QUIZ } from "../../reduxSaga/actionType/quiz";
import { QuizViewerType } from "../../types/pageType";
import { titleYup } from "./titleYup";
import { ErrorMessage } from "../../styles/mainStyle";




type FormValue = {
    title: string
}


const QuizViewer: React.FC<QuizViewerType> = ({ handleChangeView }) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(0);
    const { quizs } = useSelector((state: RootState) => state.quiz.selectedQuiz.content)

    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const correctCount = useRef<number>(0); // 정답수 카운트
    const incorrectCount = useRef<number>(0); // 오답수 카운트
    const [modal, contextHolder] = Modal.useModal();

    const {
        control,
        setValue,
        handleSubmit
    } = useForm<FormValue>({
        mode: "onSubmit",
        resolver: yupResolver(titleYup),
        defaultValues: {
            title: '',
        }
    });
    useEffect(() => {

        return () => {
            if (!addQuizLoading) {

                handleChangeView(false);
                setPage(0);
                correctCount.current = 0;
                incorrectCount.current = 0;
            }
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
    const handleComplete = () => {
        modal.confirm({
            icon: null,
            title: '퀴즈 타이틀 등록',
            content:
                <Controller
                    name={"title"}
                    control={control}
                    render={({ field, fieldState }) => {

                        return (
                            <>
                                <Input
                                    {...field}
                                    placeholder="20글자 이하로 입력해주세요."
                                    maxLength={20}

                                />
                                {fieldState.error?.message && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
                            </>
                        )
                    }}
                />
            ,
            okText: '퀴즈등록',
            cancelText: '취소',
            onOk: (close) => {
                handleSubmit(({ title }) => {
                    setValue('title', '');
                    dispatch({
                        type: COMPLETE_QUIZ,
                        payload: {
                            title
                        }
                    });
                    handleChangeView(true);
                    close();

                })();

            },
            onCancel: () => {
                setValue('title', '');
            }

        });
    }





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
                    {contextHolder}
                </>
            )}
        </>
    );

}

export default QuizViewer;