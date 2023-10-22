import React, { useCallback, useMemo, useState } from "react";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../reduxSaga/reducers";
import { ContentMainBox, ContentQustion, QuestionContent, ContentInput, QuestionLabel, ContentInputBox, ContentInputText, ContentInputCheckBox, ContnetButtonBox, ContnetButtonText, ContnetButton } from "../styles/contentStyle";
import { CHANGE_INPUT_ANSWER } from "../reduxSaga/actionType/quiz";


const Content: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedQuiz } = useSelector((state: RootState) => state.quiz)
    const [page, setPage] = useState(0);
    const shuffleArray = useCallback((array: string[]) => {
        return array?.sort(() => Math.random() - 0.5);
    }, [])


    const array = useMemo(() => shuffleArray(
        selectedQuiz[page]?.incorrect_answers?.concat(selectedQuiz[page]?.correct_answer)
    ), [page, selectedQuiz[page]?.correct_answer])


    const handleChange = useCallback((e: CheckboxChangeEvent) => {
        dispatch({
            type: CHANGE_INPUT_ANSWER,
            payload: {
                content: e.target.value,
                id: page,
                isCorrect: e.target.value === selectedQuiz[page].correct_answer
            }
        });

    }, [page, selectedQuiz])
    const handlePageChange = useCallback((data: "+" | "-") => () => {
        if (data === "+") {
            setPage((prev) => prev + 1);
        } else {
            setPage((prev) => prev - 1);
        }
    }, [])

    return <ContentMainBox>
        {selectedQuiz.length > 0 &&
            <>
                <ContentQustion>
                    <QuestionLabel>문제 {page + 1} 객관식 문제({selectedQuiz[page].category})[<span>{selectedQuiz[page].difficulty}</span>]</QuestionLabel>
                    <QuestionContent>{selectedQuiz[page].question}</QuestionContent>
                </ContentQustion>
                <ContentInputBox>
                    {array?.map((question, index) => {
                        return <ContentInput key={question} $color={selectedQuiz[page].isCorrect ? "green" : selectedQuiz[page].input_answer && "red"}>
                            <ContentInputCheckBox disabled={selectedQuiz[page].input_answer !== ''} checked={question === selectedQuiz[page].input_answer} value={question} onChange={handleChange} />
                            <ContentInputText>{question}</ContentInputText>
                        </ContentInput>
                    })}

                </ContentInputBox>
                <ContnetButtonBox>
                    {selectedQuiz[page].input_answer ? (
                        <>
                            {page === 0 ? (
                                <ContnetButtonText />
                            ) : (
                                <ContnetButton onClick={handlePageChange("-")}>이전문제</ContnetButton>
                            )}
                            <ContnetButtonText>{page + 1}/{selectedQuiz.length}</ContnetButtonText>
                            {page === selectedQuiz.length - 1 ? (
                                <ContnetButton>퀴즈완료</ContnetButton>
                            ) : (
                                <ContnetButton onClick={handlePageChange("+")}>다음문제</ContnetButton>
                            )}
                        </>
                    ) : (<>
                        <ContnetButtonText />
                        <ContnetButtonText>{page + 1}/{selectedQuiz.length}</ContnetButtonText>
                        <ContnetButtonText />
                    </>
                    )}

                </ContnetButtonBox>
            </>
        }
    </ContentMainBox>

}

export default Content;