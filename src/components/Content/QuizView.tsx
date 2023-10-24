import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from "../../reduxSaga/reducers";
import { ErrorMessage, ContentQustion, QuestionContent, ContentInput, QuestionLabel, ContentInputBox, ContentInputText, ContentInputCheckBox, ContentButtonBox, ContentButtonText, ContentButton } from "../../styles";
import { CHANGE_INPUT_ANSWER, CHANGE_IS_RESULT_VIEW, COMPLETE_QUIZ } from "../../reduxSaga/actionType/quiz";
import { titleYup } from "./titleYup";





type FormValue = {
    title: string
}


const QuizViewer: React.FC = () => {

    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(0);
    const { content, id } = useSelector((state: RootState) => state.quiz.selectedQuiz)
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
        correctCount.current = 0;
        incorrectCount.current = 0;
    }, [content, id]);




    const handleChange = useCallback((e: CheckboxChangeEvent) => {
        const isCorrect = e.target.value === content.quizs[page]?.correct_answer;
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

    }, [page, content.quizs])

    const handlePageChange = useCallback((data: "+" | "-") => () => {
        if (data === "+") {
            setPage((prev) => prev + 1);
        } else {
            setPage((prev) => prev - 1);
        }
    }, [])
    const handleComplete = useCallback(() => {
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

                    close();

                })();

            },
            onCancel: () => {
                setValue('title', '');
            }

        });
    }, [])
    const handleResultView = useCallback(() => {
        dispatch({
            type: CHANGE_IS_RESULT_VIEW,
            payload: {
                isResultView: true
            }
        })

    }, []);


    return (
        <>
            {content.quizs.length > 0 && (
                <>
                    <ContentQustion>
                        <QuestionLabel>문제 {page + 1} 객관식 문제({content.quizs[page]?.category})[<span>{content.quizs[page]?.difficulty}</span>]</QuestionLabel>
                        <QuestionContent>{content.quizs[page]?.question}</QuestionContent>
                    </ContentQustion>
                    <ContentInputBox>
                        {content.quizs[page]?.answer_list?.map((question, index) => (
                            <ContentInput
                                key={question}
                                $color={(content.quizs[page]?.isCorrect ||
                                    content.quizs[page].correct_answer === question) && content.quizs[page].input_answer ? "green"
                                    : content.quizs[page]?.input_answer && "red"}>
                                <ContentInputCheckBox
                                    disabled={content.quizs[page]?.input_answer !== ''}
                                    checked={question === content.quizs[page]?.input_answer}
                                    value={question}
                                    onChange={handleChange}
                                />
                                <ContentInputText>{question}</ContentInputText>
                            </ContentInput>
                        ))}
                    </ContentInputBox>
                    <ContentButtonBox>
                        {content.quizs[page]?.input_answer ? (
                            <>
                                {page === 0 ? (
                                    <ContentButtonText />
                                ) : (
                                    <ContentButton onClick={handlePageChange("-")}>이전문제</ContentButton>
                                )}
                                <ContentButtonText>{page + 1}/{content.quizs.length}</ContentButtonText>
                                {page === content.quizs.length - 1 ? (
                                    (id === -1 ? (
                                        <ContentButton onClick={handleComplete}>퀴즈완료</ContentButton>
                                    ) :
                                        <ContentButton onClick={handleResultView}>결과보기</ContentButton>)
                                ) : (
                                    <ContentButton onClick={handlePageChange("+")}>다음문제</ContentButton>
                                )}
                            </>
                        ) : (
                            <>
                                <ContentButtonText />
                                <ContentButtonText>{page + 1}/{content.quizs.length}</ContentButtonText>
                                <ContentButtonText />
                            </>
                        )}
                    </ContentButtonBox>
                    {contextHolder}
                </>
            )
            }
        </>
    );

}

export default React.memo(QuizViewer);