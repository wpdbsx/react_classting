import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContentMainBox } from "../../styles/contentStyle";
import QuizViewer from "./QuizView";
import QuizResultViewer from "./QuizResultView";
import { RootState } from "../../reduxSaga/reducers";


const Content: React.FC = () => {
    const { isResultView } = useSelector((state: RootState) => state.quiz.selectedQuiz.content)


    return <ContentMainBox>
        {isResultView ? (
            <QuizResultViewer />
        ) : (
            <QuizViewer />
        )}
    </ContentMainBox >

}

export default Content;