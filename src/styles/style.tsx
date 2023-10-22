import styled from "styled-components";
import { Form } from 'antd';


export const FlexContainer = styled.div`
  display: flex;
  min-width: 0;
  width:100%;
  height: 100vh;
  align-items: center;
  background-color: #f0f0f0;
  flex-direction:column;
  flex-wrap: wrap;
`;
// Flex 아이템 스타일
export const FlexHeader = styled.div`
  flex: 0.8; // 아이템이 남은 공간을 골고루 차지하도록 설정
  text-align: center;
  width:100%;
  padding-top: 10px;
`;

export const HeaderForm = styled(Form)`
    background-color:white;
    border:"1px solid black";
    display: flex;
    width:95%;
    height: 90%;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    
    
`
export const HeaderItem = styled.div`
    width: 20%;
`
export const HeaderQuizStart = styled.div`
    width: 15%;
`

export const HeaderDiv = styled.div`
    padding-bottom: 10px;
`

export const FlexMain = styled.div`
  width:100%;
  display:flex;
  flex-wrap: nowrap;
  flex-direction: row;
  flex:9;
  
`

export const FlexMainItem = styled.div`
        flex:8;
    background-color: #dbdbef;
`;
export const FlexAsideItem = styled.div`
    flex:2;
  
    background-color: gray;
`
export const ContentMainBox = styled.div`
   background-color: gray;
   height: 95%;
   width: 98%;
   margin : 0 auto;
`
