import styled from "styled-components"
import { paleteOfColors } from "../theme"
import {Link} from 'react-router-dom';


export const StyledLink = styled(Link)`

color: ${paleteOfColors.white};
margin-right: 20px;

&:hover{
  color: ${paleteOfColors.whitehover};
  text-decoration:none;
  border-bottom: 2px solid ${paleteOfColors.whitehover};
}

`