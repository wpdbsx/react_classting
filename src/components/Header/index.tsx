import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Select, InputNumber, Button } from 'antd';
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
    const { addQuizLoading } = useSelector((state: RootState) => state.quiz)
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        getValues
    } = useForm<FormValue>({
        mode: "onSubmit",
        defaultValues: {
            amount: '10',
            category: 'any',
            difficulty: 'any'
        }
    });
    const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
        dispatch({
            type: ADD_QUIZ_REQUEST,
            payload: data
        });
    };
    return (
        <HeaderForm onFinish={handleSubmit(onSubmitHandler)}>
            <HeaderItem>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field, fieldState }) => {

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
                    render={({ field, fieldState }) => {

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
                    render={({ field, fieldState }) => {

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
            </HeaderQuizStart>
        </HeaderForm >

    )
}

export default Header;