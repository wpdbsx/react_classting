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
export const ContentButtonBox = styled.div`

width:100%;
height:5%;
display:flex;
justify-content: center;
align-items: center;
`
export const ContentButtonText = styled.div`
color: gray;
text-align: center;
flex:1;
`

export const ContentButton = styled(Button)`
color: gray;
text-align: center;
flex:1;
`

export const ContentResultBox = styled.div`
   border-bottom: 1px solid gray;
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: space-around;
   justify-content: space-evenly;
   align-items: center;
`
export const ContentResultChartBox = styled.div`
  border: 1px solid gray;
  height:100%;
  flex:1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const ContentResultDataBox = styled.div`
   border: 1px solid gray;
   flex-direction: column;
   height:100%;
   flex:1;
   display:flex;
   justify-content: space-around;
   align-items: center;
`
export const ContentResultDataBoxInput = styled.div<StyledType>`
border : 1px solid gray;
width:90%;
height:20%;
text-align: center;
display:flex;
align-items: center;
justify-content: flex-start;
border:${props => props.$color && `2px solid ${props.$color}`};
font-size:30px;
& span{
   font-size:20px;
   color:gray;
   width:20%;
   margin-left:20px;
   text-align:left;
}

`