import React, { useState, useEffect } from 'react';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        console.log('Attempting to send:', input);
        
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = { sender: 'gemini', text: `You said: "${input}"` };
            setMessages((prev) => [...prev, botResponse]);
        }, 500);

        setInput('');
    };

    return (
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            position: 'relative'
        }}>
            <h1>Gemini Chatbot</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    height: '300px',
                    overflowY: 'scroll',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === 'user' ? 'right' : 'left',
                            margin: '5px 0',
                        }}
                    >
                        <strong>{msg.sender === 'user' ? 'You' : 'Gemini'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        console.log('Input changed:', e.target.value);
                        setInput(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </form>

            {/* Debug overlay */}
            <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.9)',
                padding: '10px',
                border: '1px solid red',
                zIndex: 1000,
                fontSize: '14px'
            }}>
                <div>Input State: "{input}"</div>
                <div>Message Count: {messages.length}</div>
            </div>
        </div>
    );
};

export default Chatbot;