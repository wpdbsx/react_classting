import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContentMainBox } from "../../styles/contentStyle";
import QuizViewer from "./QuizView";
import QuizResultViewer from "./QuizResultView";
import { RootState } from "../../reduxSaga/reducers";


const Content: React.FC = () => {
    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const [isViewResult, setIsViewResult] = useState<boolean>(false); // 결과 화면 
    const { id } = useSelector((state: RootState) => state.quiz.selectedQuiz)

    const handleChangeView = useCallback((value: boolean) => {
        setIsViewResult(value);
    }, [])

    useEffect(() => {
        return () => {
            setIsViewResult(false);
        }
    }, [addQuizLoading, id])

    return <ContentMainBox>
        {isViewResult ? (
            <QuizResultViewer handleChangeView={handleChangeView} />
        ) : (
            <QuizViewer handleChangeView={handleChangeView} />
        )}
    </ContentMainBox >

}

export default Content;