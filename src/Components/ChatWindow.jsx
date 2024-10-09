import { useEffect, useRef } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  height: calc(100vh-120px);
  @media (max-width: 768px) {
    height: calc(100vh-300px);
  }
`;
const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
  overflow-y: auto;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Message = styled.div`
  max-width: 40vw;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ isown, theme }) =>
    isown ? theme.colors.primary : theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  align-self: ${({ isown }) => (isown ? "self-end" : "start")};
  word-wrap: break-word;
`;
const UserItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 5px;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
`;
const UserName = styled.h4`
  margin-left: 2%;
  text-transform: capitalize;
`;
function ChatWindow({ messages, currentUser, selectUser }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <UserItem>
        <LazyLoad height={30} offset={100}>
          <img
            src={selectUser.photo || "https://i.pravatar.cc/150?img=1"}
            alt={selectUser}
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          />
        </LazyLoad>
        <UserName>{selectUser.name}</UserName>
      </UserItem>

      {messages.length != 0 && (
        <MessagesContainer>
          {messages.map((msg) => {
            return (
              <Message key={msg._id} isown={msg.sender == currentUser}>
                {msg.message}
              </Message>
            );
          })}
          <div ref={messagesEndRef} />
        </MessagesContainer>
      )}
    </ChatContainer>
  );
}
export default ChatWindow;
