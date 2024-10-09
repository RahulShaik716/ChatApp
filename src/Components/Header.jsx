import styled from "styled-components";
import Logo from "./Logo";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 4;
  height: 10vh;
`;

const AppName = styled.h1`
  margin-left: 15px;
  font-size: 1.5em;
  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Header = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <HeaderContainer>
      {user?.photo ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Logo />
          <AppName> Eagle </AppName>
        </div>
      ) : (
        <>
          {" "}
          <Logo />
          <AppName> Eagle </AppName>
        </>
      )}

      {user?.photo && (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            marginRight: "1vw",
            cursor: "pointer",
          }}
          onClick={() => toggleModal()}
        >
          <img
            width="40px"
            height="40px"
            src={user?.photo}
            style={{ borderRadius: "50px" }}
          />
          {isModalOpen && <ProfileModal user={user} closeModal={toggleModal} />}
        </div>
      )}
    </HeaderContainer>
  );
};
export default Header;
