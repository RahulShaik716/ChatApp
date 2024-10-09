import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
  position: sticky; /* Sticky positioning */
  bottom: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputField = styled.textarea`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  outline: none;
  font-size: 1em;
  margin-right: 20px;
  min-height: 1em;
  max-height: 4em;
  overflow-y: auto;
  word-wrap: break-word;
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.white}; 
  border-radius : 50%; 
  cursor : pointer; 
  display : flex; 
  align-items-center; 
  justify-content : center; 
  padding : 10px;
  &:hover{
  background-color : ${({ theme }) => theme.colors.accent};
  }
`;

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    console.log("handleSend called");
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <InputContainer>
      <InputField
        placeholder=" Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(event) => handleKeyPress(event)}
      />
      <SendButton onClick={handleSend} disabled={!message.trim()}>
        <FaPaperPlane size={20} style={{ alignSelf: "center" }} />
      </SendButton>
    </InputContainer>
  );
};
export default MessageInput;
