import React, { useState, useRef, useEffect } from "react";

const PromptInput = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSend(prompt);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-end border-t pt-4"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Ask your question in Hinglish..."
          rows={1}
          disabled={loading}
        />
        {prompt && (
          <button
            type="button"
            onClick={() => setPrompt("")}
            className="absolute right-14 bottom-3 text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
        disabled={loading || !prompt.trim()}
      >
        {loading ? (
          <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <>
            <span className="mr-2">Send</span>
            <span>↩️</span>
          </>
        )}
      </button>
    </form>
  );
};

export default PromptInput;
