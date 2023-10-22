import React, { useMemo } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Select, InputNumber, Button, Form } from 'antd';
import { SubmitHandler } from 'react-hook-form';
import { HeaderForm, HeaderDiv, HeaderItem, HeaderQuizStart } from '../../styles/style';
import { category, difficulty } from './selectData';



type FormValue = {
    amount: string,
    category: string,
    difficulty: string,
}
const Header: React.FC = () => {

    const {
        control,
        handleSubmit,
        setError,
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

        console.log(data)
    };
    return (
        <HeaderForm onFinish={handleSubmit(onSubmitHandler)}>
            <HeaderItem>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field, fieldState }) => {
                        console.log(field)
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
                        console.log(field)
                        console.log(getValues('category'))
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
                        console.log(field)
                        console.log(getValues('category'))
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
                <Button htmlType="submit" size="large">퀴즈 시작</Button>
            </HeaderQuizStart>
        </HeaderForm >

    )
}

export default Header;