import React from 'react'
import styled from 'styled-components';


export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  children?: React.ReactNode; // make the component able to receive children elements
  color?: "primary" | "secondary"; // two styling options
  disabled?: boolean; // make the button disabled or not
  primary?: string;
};

const StyleButn = styled.button<{ primary?: string }>`
font-size: 2em;
background-color: black;
color: ${(props) => (props.primary ? props.primary : "white")};
cursor: pointer;
`;


const StyleButton = ({
  onClick,
  children,
  primary,
}: ButtonProps) => {

  return (
    <StyleButn onClick={onClick} primary={primary}>
      {children}
    </StyleButn>
  )
}

export default StyleButton