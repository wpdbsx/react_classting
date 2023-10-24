import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxSaga/reducers";
import AsideItem from "./AsideItem";


const Aside: React.FC = () => {

    const mainQuizs = useSelector((state: RootState) => state.quiz.mainQuizs)

    const { id } = useSelector((state: RootState) => state.quiz.selectedQuiz)

    return <>
        {mainQuizs.map((quiz) => {

            return <AsideItem
                key={quiz.id}
                id={quiz.id}
                selectId={id}
                title={quiz.content.title}
            />
        })}
    </>
}


export default Aside;