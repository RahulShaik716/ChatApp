import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
body{
margin : 0 ,
padding : 0, 
background-color : ${({ theme }) => theme.colors.background}};
font-family : ${({ theme }) => theme.fonts.main};
color : ${({ theme }) => theme.colors.text};


h1,h2,h3,h4,h5,h6{
font-family : ${({ theme }) => theme.fonts.heading};
color : ${({ theme }) => theme.colors.primary};
}
a{
color : ${({ theme }) => theme.colors.secondary};
text-decoration : none; 
}
a:hover{
color : ${({ theme }) => theme.colors.accent};
}

::-webkit-scrollbar{
width : 8px;
}

::-webkit-scrollbar-track {
background : ${({ theme }) => theme.colors.background};
}
::-webkit-scrollbar-thumb{
background-color : ${({ theme }) => theme.colors.border};
border-radius : 4px; 
border : 2px solid ${({ theme }) => theme.colors.background};
}
`;
