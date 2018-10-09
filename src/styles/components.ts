import styled from "react-emotion";
import { fontFamily } from "src/styles/base";

export const Panel = styled('div')`
  width: ${(props:any) => props.w}%;
  height: 99vh;
  overflow-y: auto;
  float: left;
  padding: 1%
`;

export const BlockTitle = styled('h3')`
    ${fontFamily};
    font-size: 16px;
    margin: 30px 0px 20px 0px;
    text-transform: capitalize;
`

export const Li = styled('li')`
    ${fontFamily};
    font-size: 12px;
    margin: 0px 0px 0px 10px;
`

export const Input =  styled('input')`
  border: none;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
`;

export const Button = styled('button')`
  border: none;
  padding: 10px;
  margin: 5px;
  background: none;
  border: 2px inset black;
  color: black;
  pointer: cursor;
  transition: all .3s cubic-bezier(.55,0,.1,1);
  &:hover {
    background: black;
    color: white;
  }
`;