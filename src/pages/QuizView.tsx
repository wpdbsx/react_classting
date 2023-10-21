import React from "react"
import AppLayOut from "../components/AppLayOut"
import Aside from "../components/Aside"
import Content from "../components/Content"
import Header from "../components/Header"

const QuizView: React.FC = () =>
    <AppLayOut>
        <Header />
        <Aside />
        <Content />
    </AppLayOut>
export default QuizView