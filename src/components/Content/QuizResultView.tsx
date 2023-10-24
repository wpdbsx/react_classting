import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ContentResultBox, ContentResultChartBox, ContentResultDataBox, ContentResultDataBoxInput } from "../../styles";
import DoughnutChart from "./DoughnutChart";
import { RootState } from "../../reduxSaga/reducers";


const QuizResultViewer: React.FC = () => {
    const { time, correctCount, incorrectCount } = useSelector((state: RootState) => state.quiz.selectedQuiz.content)
    // 분 계산
    const minutes = Math.floor(time / 60);
    // 초 계산
    const seconds = Math.floor(time % 60);
    const rate = useMemo(() => correctCount / (correctCount + incorrectCount), []);


    return <ContentResultBox>
        <ContentResultChartBox>
            <DoughnutChart rate={rate} />
        </ContentResultChartBox>
        <ContentResultDataBox>
            <ContentResultDataBoxInput><span>소요된 시간</span>{minutes}분 {seconds}초</ContentResultDataBoxInput>
            <ContentResultDataBoxInput><span>전체문항수</span>{correctCount + incorrectCount} </ContentResultDataBoxInput>
            <ContentResultDataBoxInput><span>정답수</span>{correctCount}</ContentResultDataBoxInput>
            <ContentResultDataBoxInput><span>오답수</span>{incorrectCount}</ContentResultDataBoxInput>
        </ContentResultDataBox>
    </ContentResultBox>
}

export default QuizResultViewer;