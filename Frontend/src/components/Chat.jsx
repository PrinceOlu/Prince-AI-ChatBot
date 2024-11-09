import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';

// Function to send message to the API
const sendMessageToAPI = async (message) => {
  const res = await axios.post('http://localhost:5000/ask', { message });
  return res.data;
};

function Chat() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([
    {
      role: 'assistant',
      content: 'Hello! How can I assist you today?',
    },
  ]);

  // Mutation for handling API request
  const mutation = useMutation({
    mutationFn: sendMessageToAPI,
    mutationKey: ['mykey'],
    onSuccess: (data) => {
      setIsTyping(false);
      setConversations((prevConversation) => [
        ...prevConversation,
        {
          role: 'assistant',
          content: data.content,
        },
      ]);
    },
  });

  // Handle message submit
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const currentMessage = message.trim();
    if (!currentMessage) {
      alert('Please, provide a message!');
      return;
    }
    setConversations((prevConversation) => [
      ...prevConversation,
      {
        role: 'user',
        content: currentMessage,
      },
    ]);
    setIsTyping(true);
    mutation.mutate(currentMessage);
    setMessage('');
  };

  return (
    <div className="chatContainer">
      <h2 className="header">Chat Assistant</h2>
      <div className="chatBox">
        {conversations.map((conv, index) => (
          <div key={index} className={conv.role === 'user' ? 'userMessage' : 'assistantMessage'}>
            <strong>{conv.role === 'user' ? 'You: ' : 'Assistant: '}</strong> {conv.content}
          </div>
        ))}
        {isTyping && <p className="typingIndicator">Assistant is typing...</p>}
      </div>
      <form onSubmit={handleSubmitMessage} className="form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input"
        />
        <button type="submit" className="button">Send</button>
      </form>
    </div>
  );
}

export default Chat;
