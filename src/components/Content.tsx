import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../reduxSaga/reducers";
import { ContentMainBox } from "../styles/style";


const Content: React.FC = () => {
    const { selectedQuiz } = useSelector((state: RootState) => state.quiz)
    const [page, setPage] = useState(0);
    return <ContentMainBox>
        1234
    </ContentMainBox>

}

export default Content;