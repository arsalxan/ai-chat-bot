
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);
  const [backendStatus, setBackendStatus] = useState('Connecting...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setBackendStatus(`Backend: ${response.data}`);
      } catch (error) {
        setBackendStatus(`Backend Error: ${error.message}`);
      }
    };
    checkBackend();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', { message: input });
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chatbot - {backendStatus}</div>
      <div className="chat-body">
        {[...messages].reverse().map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="sender">{msg.sender === 'user' ? 'You' : 'Bot'}</div>
            <div className="text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <div className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
