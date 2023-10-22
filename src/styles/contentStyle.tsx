import styled from "styled-components"
import { Checkbox, Button } from 'antd';
import { StyledType } from "../types/styled";

export const ContentMainBox = styled.div`
   background-color: gray;
   height: 98%;
   width: 98%;
   background-color: white;
   
`

export const ContentQustion = styled.div`
   
   border-bottom: 1px solid gray;
   height: 10%;
   width: 100%;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   align-content: space-around;
   justify-content: center;
   align-items: center;
`

export const QuestionLabel = styled.div`
  
   height: 30%;
   & span {
    color:red; 
    font-weight: bold;
   } 
  
`
export const QuestionContent = styled.div`
 font-size: 20px;
`
export const ContentInputBox = styled.div`
height:85%;
display:flex;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
    
`

export const ContentInput = styled.div<StyledType>`
border : 1px solid gray;
width:90%;
height:20%;
text-align: center;
display:flex;
align-items: center;
justify-content: flex-start;
border:${props => props.$color && `2px solid ${props.$color}`};
`

export const ContentInputCheckBox = styled(Checkbox)`

margin-left: 40px;
`

export const ContentInputText = styled.div`
font-size: 25px;
margin-left: 30px;
`
export const ContnetButtonBox = styled.div`

width:100%;
height:5%;
display:flex;
justify-content: center;
align-items: center;
`
export const ContnetButtonText = styled.div`
color: gray;
text-align: center;
flex:1;
`

export const ContnetButton = styled(Button)`
color: gray;
text-align: center;
flex:1;
`
