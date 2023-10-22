import React from "react"
import { FlexAsideItem, FlexContainer, FlexHeader, FlexMain, FlexMainItem } from "../styles/style";



// type AppLayOutType = {
//     Header: React.ReactNode,
//     Aside: React.ReactNode,
//     Content: React.ReactNode
// }
interface ComponentProps {
    children: React.ReactNode[];
}

const AppLayOut: React.FC<ComponentProps> = ({ children }) =>
(
    <FlexContainer>
        <FlexHeader>{children[0]}</FlexHeader>
        <FlexMain>
            <FlexAsideItem>{children[1]} </FlexAsideItem>
            <FlexMainItem>{children[2]}</FlexMainItem>
        </FlexMain>
    </FlexContainer>
)



export default AppLayOut;