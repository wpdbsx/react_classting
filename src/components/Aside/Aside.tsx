import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxSaga/reducers";
import AsideItem from "./AsideItem";


const Aside: React.FC = () => {

    const mainQuizs = useSelector((state: RootState) => state.quiz.mainQuizs)

    return <>
        {mainQuizs.map(() => {
            return <AsideItem />
        })}
    </>
}


export default Aside;