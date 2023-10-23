import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContentMainBox } from "../styles/contentStyle";
import QuizViewer from "./QuizView";
import QuizResultViewer from "./QuizResultView";
import { RootState } from "../reduxSaga/reducers";


const Content: React.FC = () => {
    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const [isViewResult, setIsViewResult] = useState<boolean>(false); // 결과 화면 

    const handleChangeView = useCallback((value: boolean) => {
        setIsViewResult(value);
    }, [])

    useEffect(() => {
        if (!addQuizLoading) { // 로딩이 끝나면 초기화
            setIsViewResult(false);
        }
    }, [addQuizLoading])
    return <ContentMainBox>
        {isViewResult ? (
            <QuizResultViewer />
        ) : (
            <QuizViewer handleChangeView={handleChangeView} />
        )}
    </ContentMainBox >

}

export default Content;