import styled from "styled-components"
import { paleteOfColors } from "../theme"

export const StyledImg = styled.img`

border-radius: 10px;

`;

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
`;

export const StyledUl = styled.ul`

display: grid;
grid-template-columns: repeat(auto-fill, 240px);
gap: 20px;
padding: 20px;
justify-content: center;

`;