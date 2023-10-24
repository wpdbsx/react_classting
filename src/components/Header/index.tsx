import React from "react";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Select, InputNumber, Button, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { HeaderForm, HeaderDiv, HeaderItem, HeaderQuizStart } from '../../styles/headerStyle';
import { category, difficulty } from './selectData';
import { ADD_QUIZ_REQUEST } from "../../reduxSaga/actionType/quiz";
import { RootState } from "../../reduxSaga/reducers";



type FormValue = {
    amount: string,
    category: string,
    difficulty: string,
}
const Header: React.FC = () => {
    const { id } = useSelector((state: RootState) => state.quiz.selectedQuiz)
    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
    } = useForm<FormValue>({
        mode: "onSubmit",
        defaultValues: {
            amount: '10',
            category: 'any',
            difficulty: 'any'
        }
    });
    const onSubmitHandler: SubmitHandler<FormValue> = (data) => {

        if (id === -1) { // 현재 진행중인 퀴즈가 있다면 모달창 open

            modal.confirm({
                icon: null,
                title: '퀴즈 타이틀 등록',
                content: "진행중인 퀴즈가 있습니다. 새롭게 진행하시겠습니까?",
                okText: '확인',
                cancelText: '취소',
                onOk: (close) => {
                    dispatch({
                        type: ADD_QUIZ_REQUEST,
                        payload: data
                    });
                    close();
                }

            });
        } else {
            dispatch({
                type: ADD_QUIZ_REQUEST,
                payload: data
            });
        }
    };
    return (
        <HeaderForm onFinish={handleSubmit(onSubmitHandler)}>
            <HeaderItem>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => {

                        return (
                            <>
                                <HeaderDiv>문제 수</HeaderDiv>
                                <InputNumber onChange={field.onChange} min={1} max={50} defaultValue={10} />
                            </>
                        )
                    }}
                />
            </HeaderItem >
            <HeaderItem>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => {

                        return (
                            <>
                                <HeaderDiv>카테고리</HeaderDiv>
                                <Select
                                    defaultValue="Any Category"
                                    onChange={field.onChange}
                                    style={{ width: "100%" }}
                                    options={category}
                                />     </>
                        )
                    }}
                />
            </HeaderItem>
            <HeaderItem>
                <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => {
                        return (
                            <>
                                <HeaderDiv>난이도</HeaderDiv>
                                <Select
                                    defaultValue="Any difficulty"
                                    onChange={field.onChange}
                                    style={{ width: "100%" }}
                                    options={difficulty}
                                />     </>
                        )
                    }}
                />
            </HeaderItem>
            <HeaderQuizStart>
                <Button loading={addQuizLoading} htmlType="submit" size="large">퀴즈 시작</Button>
                {contextHolder}
            </HeaderQuizStart>
        </HeaderForm >

    )
}

export default Header;