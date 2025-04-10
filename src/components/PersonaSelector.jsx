import React from "react";

const PersonaSelector = ({ selected, setSelected }) => {
  const buttonClasses = (persona) =>
    `px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-sm ${
      selected === persona
        ? persona === "hitesh"
          ? "bg-blue-600 text-white shadow-md"
          : persona === "piyush"
          ? "bg-green-600 text-white shadow-md"
          : "bg-purple-600 text-white shadow-md"
        : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 hover:shadow-md"
    }`;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setSelected("hitesh")}
        className={buttonClasses("hitesh")}
      >
        <span className="mr-2">🧑‍🏫</span> Hitesh Sir
      </button>
      <button
        onClick={() => setSelected("piyush")}
        className={buttonClasses("piyush")}
      >
        <span className="mr-2">👨‍🏫</span> Piyush Sir
      </button>
      <button
        onClick={() => setSelected("both")}
        className={buttonClasses("both")}
      >
        <span className="mr-2">🤝</span> Both
      </button>
    </div>
  );
};

export default PersonaSelector;
