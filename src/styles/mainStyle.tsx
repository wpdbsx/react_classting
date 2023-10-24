import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  min-width: 1200px;
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
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const FlexAsideItem = styled.div`
    flex:2;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

export const ErrorMessage = styled.div`
  color:red;
  font-size: 12px;
`