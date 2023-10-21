import React from "react"
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  width:100%;
  height: 100vh;
  align-items: center;
  background-color: #f0f0f0;
  flex-direction:column;
`;
// Flex 아이템 스타일
const FlexHeader = styled.div`
  flex: 0.5; // 아이템이 남은 공간을 골고루 차지하도록 설정
  text-align: center;
  padding: 10px;
`;

const FlexMain = styled.div`

  width:100%;
  display:flex;
  flex-wrap: nowrap;
  flex-direction: row;
  flex:9;
  
`

const FlexMainItem = styled.div`
        flex:8;
    background-color: blue;
`;
const FlexAsideItem = styled.div`
    flex:2;
  
    background-color: red;
`

// type AppLayOutType = {
//     Header: React.ReactNode,
//     Aside: React.ReactNode,
//     Content: React.ReactNode
// }
interface ComponentProps {
    children: React.ReactNode[];
}

const AppLayOut: React.FC<ComponentProps> = ({ children }) => {

    console.log(children)
    return (
        <FlexContainer>
            <FlexHeader>{children[0]}</FlexHeader>
            <FlexMain>
                <FlexAsideItem>{children[1]} </FlexAsideItem>
                <FlexMainItem>{children[2]}</FlexMainItem>
            </FlexMain>
        </FlexContainer>
    )
}


export default AppLayOut;