import React from 'react'
import styled from 'styled-components';



const StyleButton = styled.button<{ primary?: string }>`
font-size: 2em;
background-color: black;
color: ${(props) => (props.primary ? props.primary : "white")};
`;


const Button = ({ children, primary }: any) => {

  return (
    <StyleButton primary={primary}>
      {children}
    </StyleButton>
  )
}

export default Button