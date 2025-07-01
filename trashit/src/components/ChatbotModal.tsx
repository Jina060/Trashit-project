import React, { useState, useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react'; // 🆕 Trash icon

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();
      const botMessage: Message = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot API error:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Oops! Something went wrong. Please try again later.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-bold">TrashBot</h2>
          <div className="flex items-center gap-2">
            <button onClick={clearChat} className="text-gray-500 hover:text-red-500" title="Clear chat">
              <Trash2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="text-trashBlue hover:text-gray-800" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-80 overflow-y-auto px-4 py-3 space-y-2 scroll-smooth">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 max-w-xs rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-trashGreen text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex border-t px-4 py-3">
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-grow border px-4 py-2 rounded-l-xl text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-trashBlue text-trashGreen px-4 py-2 rounded-r-xl hover:bg-trashGreen hover:text-trashBlue disabled:opacity-50 text-sm"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
