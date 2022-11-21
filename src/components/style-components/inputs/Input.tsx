import React, { useState } from 'react'
import styled from 'styled-components';


export type ButtonProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode; // make the component able to receive children elements
  color?: "primary" | "secondary"; // two styling options
  disabled?: boolean; // make the button disabled or not
  primary?: string;
  mt?: string;
  width?: string;
  value?:any;
  padding?: string;
};

const StyleInp = styled.input<ButtonProps>`
color: ${(props) => (props.primary ? props.primary : "black")};
margin-top:${(props) => props.mt};
width:${(props) => props.width};
text-align: center;
display: block;
padding: ${(props) => props.padding};
border: none;
background-color: transparent;
border-radius: 4px;
font-weight: 700;
font-size: inherit;
&:focus {
    outline: none;

  }
::placeholder {
    font-size: large;
    color: palevioletred;
  }
`;


const StyleInput = ({
  children,
  onChange,
  primary,
  mt,
  width,
  value,
  padding
}: ButtonProps) => {


  return (
    <StyleInp value={value} width={width} padding={padding} placeholder='-' type='text' onChange={onChange} primary={primary} mt={mt}>
      {children}
    </StyleInp>
  )
}

export default StyleInput