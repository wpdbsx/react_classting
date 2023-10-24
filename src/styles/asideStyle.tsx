import styled from "styled-components";
import { StyledType } from "../types/styled";


export const AsideBoxItem = styled.div<StyledType>`
   border:${props => props.$color && `5px solid ${props.$color}`};
   background-color: white;
   height: 10%;
   width: 95%;
   display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: column;
   margin : 5px auto;
`
export const AsideBoxItemButton = styled.div`
   background-color: white;
   height: 10%;
   width: 100%;
   margin-top: 5px;
   margin-bottom: 10px;
   display: flex;
   justify-content: space-evenly;
   align-items: space-around;
    & Button{
    width: 30%;
   }
`
