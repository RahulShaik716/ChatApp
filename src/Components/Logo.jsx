import styled from "styled-components";
const StyledLogo = styled.img`
  width: auto;
  height: 40px;
`;
import logoImage from "../assets/logo.png";
function Logo() {
  return <StyledLogo src={logoImage} alt="Nature Chat Logo" />;
}
export default Logo;
