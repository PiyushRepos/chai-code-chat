import React from "react";
import Markdown from "react-markdown";

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <div className="text-center p-6 max-w-md">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-xl font-medium mb-2">Prompt Guru Playground</h3>
            <p className="text-sm">
              Select a mentor and start chatting in Hinglish!
            </p>
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-3 rounded-xl whitespace-pre-wrap max-w-[90%] w-fit ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : msg.persona === "hitesh"
                ? "bg-blue-100 text-blue-900 border-l-4 border-blue-500"
                : msg.persona === "piyush"
                ? "bg-green-100 text-green-900 border-l-4 border-green-500"
                : "bg-purple-100 text-purple-900 border-l-4 border-purple-500"
            }`}
          >
            <p className="font-medium mb-1 flex items-center">
              {msg.role === "user"
                ? "You"
                : msg.persona === "hitesh"
                ? "Hitesh Sir"
                : msg.persona === "piyush"
                ? "Piyush Sir"
                : "Hitesh & Piyush"}
            </p>
            <p className="text-sm md:text-base">
              <Markdown>{msg.text}</Markdown>
            </p>
          </div>
        ))
      )}
      {loading && (
        <div className="flex items-center justify-start space-x-2 px-4 py-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
          <span className="text-sm text-gray-500 ml-2">Typing...</span>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
