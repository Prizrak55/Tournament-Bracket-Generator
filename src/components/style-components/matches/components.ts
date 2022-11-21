import styled from "styled-components";

type Div = {
  color?: string;
  padding?:string;
}

export const CenterContainer = styled.div`
display: 'flex';
align-items: center;
justify-content: center;
`;

export const Box = styled.div<any>`
font-size: ${(props) => props.fontSize};
font-weight:  ${(props) => props.fontWeight};
background-color: ${(props) => props.bgcolor};
color: ${(props) => props.color};
display: ${(props) => props.display};
position: ${(props) => props.position};
flex-direction: ${(props)=> props.flexDirection};
justify-content: ${(props)=> props.justifyContent};
box-shadow: ${(props)=> props.boxShadow};
text-align: ${(props)=> props.textAlign};
align-items: ${(props)=> props.alignItems};
width: ${(props)=> props.width};
height: ${(props)=> props.height};
margin-top:  ${(props)=> props.mt};
margin-bottom:  ${(props)=> props.mb};
margin-right:  ${(props)=> props.mr};
margin-left:  ${(props)=> props.ml};
padding-top:  ${(props)=> props.pt};
padding-bottom:  ${(props)=> props.pb};
padding-right:  ${(props)=> props.pr};
padding-left:  ${(props)=> props.pl};
padding: ${(props)=> props.p};
margin: ${(props)=> props.m};
left: ${(props)=> props.left};
right: ${(props)=> props.right};
border-bottom: ${(props)=> props.borderBottom};
border: ${(props)=> props.border};
border-left: ${(props)=> props.borderLeft};
border-radius: ${(props)=> props.borderRadius};
z-index: ${(props)=> props.zIndex};
`;

export const Text = styled(Box)<any>`

`;