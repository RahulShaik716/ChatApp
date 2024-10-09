import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import Sidebar from "./Sidebar";
import styled from "styled-components";
const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh-60px);
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function MainLayout({
  users,
  messages,
  currentUser,
  onSendMessage,
  setSelectedUser,
  selectedUser,
}) {
  console.log(messages);
  return (
    <LayoutContainer>
      <Sidebar users={users} setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <ChatSection>
          <ChatWindow
            messages={messages}
            currentUser={currentUser}
            selectUser={selectedUser}
          />
          <MessageInput onSend={onSendMessage} />
        </ChatSection>
      ) : (
        <p style={{ margin: "auto" }}> No friends selected to chat</p>
      )}
    </LayoutContainer>
  );
}
export default MainLayout;
