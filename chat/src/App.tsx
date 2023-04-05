import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('message', text);
    setText('');
  };

  return (
    <div>
      <h1>Random Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
