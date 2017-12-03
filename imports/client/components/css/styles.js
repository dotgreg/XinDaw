import styled from 'styled-components';

//
// VARS
//
export const vars = {
  colors: {
    orange: '#f8981d',
    grey3: '#ababab'
  }
}

//
// LAYOUT
//

export const Panel = styled.div`
  width: ${props => props.w}%;
  height: 99vh;
  overflow-y: auto;
  float: left;
  padding: 1%
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
`;


//
// INTERFACE
//

// FORMS
export const FieldWrapper = styled.div`
  padding: 10px;
`;

export const Label = styled.div`
  display: inline-block;
`;

export const Input = styled.input`
  border: none;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
`;

export const Number = Input.extend`
  width: ${props => props.width};
`;

export const Button = styled.button`
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
