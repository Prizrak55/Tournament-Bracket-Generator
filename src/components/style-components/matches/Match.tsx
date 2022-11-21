import React from 'react'
import styled from 'styled-components';


export type ButtonProps = {
  children?: React.ReactNode; // make the component able to receive children elements
};

const StyleMatch = styled.button<{ primary?: string }>`
display: 'flex';
justify-content: center;
`;


const Match = ({
  children,
}: ButtonProps) => {

  return (
    <StyleMatch>
      {children}
    </StyleMatch>
  )
}

export default Match