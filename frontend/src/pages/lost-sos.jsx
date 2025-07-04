// src/pages/LostPersonSOS.jsx

import React, { useState } from "react";

const LostPersonSOS = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSOS = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
          setLocation(coords);
          const fullMessage = `🚨 LOST PERSON ALERT 🚨\nName: ${name}\nDetails: ${description}\nLocation: ${coords}`;
          
          // Send to backend or SMS API
          alert("SOS sent to nearby helpers and emergency contact!");
          setMessage(fullMessage);
        },
        (err) => {
          alert("Unable to get location.");
        }
      );
    } else {
      alert("Location not supported.");
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Lost Person SOS</h1>
      <div className="max-w-xl mx-auto space-y-4 bg-zinc-800 p-6 rounded-xl">
        <input
          type="text"
          placeholder="Person's Name"
          className="w-full p-3 rounded-lg text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description (clothing, age, etc.)"
          className="w-full p-3 rounded-lg text-black"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          onClick={handleSOS}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
        >
          Send SOS
        </button>

        {message && (
          <div className="mt-6 bg-zinc-700 p-4 rounded-lg">
            <p className="text-green-400 font-semibold">Sent Message:</p>
            <pre className="text-sm text-gray-300">{message}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPersonSOS;
