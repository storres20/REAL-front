import styled from "styled-components"
import { paleteOfColors } from "../theme"

export const StyledLi = styled.li`

background-color: ${paleteOfColors.white};
border: 1px solid ${paleteOfColors.black};
padding: 20px;
text-align: center;

list-style: none;
font-size: 1rem;
border-radius: 10px;

&:hover{
  opacity: 0.8;
}
`