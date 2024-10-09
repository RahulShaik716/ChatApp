import { FaUserFriends } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { theme } from "../theme";
const SidebarContainer = styled.aside`
  width: 15vw;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1vw;
  box-sizing: border-box;
  overflow-y: auto;
  margin-top: 1vh;
  @media (max-width: 768px) {
    width: 100vw;
    height: 200px;
  }
  z-index: 2;
  box-shadow: 2px 0px 0px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UsersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const UserName = styled.span`
  margin-left: 10px;
  font-weight: bold;
  padding: 10px;
  text-transform: capitalize;
`;
const Users_label = styled.h2`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;
const Sidebar = ({ users, setSelectedUser }) => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <FaUserFriends size={20} color={theme.colors.primary} />
        <Users_label>Friends </Users_label>
      </SidebarHeader>
      <UsersList>
        {users.map((user) => (
          <UserItem key={user._id} onClick={() => setSelectedUser(user)}>
            <LazyLoad height={30} offset={100}>
              <img
                src={user.photo || "https://i.pravatar.cc/150?img=1"}
                alt={user.name}
                style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              />
            </LazyLoad>
            <UserName>{user.name}</UserName>
          </UserItem>
        ))}
      </UsersList>
    </SidebarContainer>
  );
};
export default Sidebar;
