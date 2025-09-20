import React, { useState, useCallback } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState(()=>{
    return localStorage.getItem('password') || "";
  });
  const [range, setRange] = useState(12);
  const [characters, setCharacters] = useState(false);
  const [special, setSpecial] = useState(false);

  const generatePassword = useCallback(() => {
    let include = "1234567890";
    let password = "";

    if (characters) {
      include += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (special) {
      include += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    for (let i = 0; i < range; i++) {
      let randomNum = Math.floor(Math.random() * include.length);
      password += include[randomNum];
    }

    setText(password); 
    localStorage.setItem('password',password)
  }, [range, characters, special]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center pt-10">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px] border border-gray-200">
        {/* Row 1: Input + Copy button */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={text}
            readOnly
            placeholder="Generated password..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Copy
          </button>
        </div>

        {/* Range slider */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Length</label>
          <input
            type="range"
            min="8"
            max="50"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <p className="text-sm text-gray-600 mt-1 text-center">
            Selected: {range}
          </p>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
              checked={characters}
              onChange={(e) => setCharacters(e.target.checked)}
            />
            Characters (A-Z)
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
              checked={special}
              onChange={(e) => setSpecial(e.target.checked)}
            />
            Special (!@#$%)
          </label>
        </div>

        {/* ✅ Generate button */}
        <button
          onClick={generatePassword}
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
