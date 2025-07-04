import React, { useState, useEffect } from 'react';

const AISafetyCompanion
 = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [tipsIndex, setTipsIndex] = useState(0);
  const [hazards, setHazards] = useState([]);
  const tips = [
    "🛑 Always wear a helmet or seatbelt.",
    "🚦 Don't use mobile phones while driving.",
    "🚫 Avoid overspeeding.",
    "🧯 Keep a fire extinguisher in your car.",
    "🛣️ Follow lane discipline.",
  ];

  const findLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(loc);
        setError('');
      },
      () => {
        setError("Location access denied.");
      }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTipsIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleHazardReport = () => {
    if (location) {
      const newHazards = [...hazards, location];
      setHazards(newHazards);
      localStorage.setItem('hazards', JSON.stringify(newHazards));
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('hazards');
    if (stored) {
      setHazards(JSON.parse(stored));
    }
  }, []);

  const generateGoogleSearch = (type) => {
    if (!location) return "#";
    return `https://www.google.com/maps/search/${type}/@${location.lat},${location.lng},14z`;
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-black text-white rounded-xl border border-red-600 shadow-2xl space-y-6">
      <h1 className="text-3xl text-center text-red-500 font-bold">🚨 Public Safety Partner Hub</h1>

      <button
        onClick={findLocation}
        className="w-full bg-red-600 hover:bg-red-700 font-bold py-2 rounded-xl"
      >
        📍 Get My Location
      </button>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {location && (
        <>
          <div className="space-y-3 text-center">
            <a href={generateGoogleSearch('hospital')} target="_blank" rel="noreferrer"
              className="block bg-zinc-900 border border-red-500 py-2 rounded hover:bg-red-700">
              🏥 Nearest Hospital
            </a>
            <a href={generateGoogleSearch('police station')} target="_blank" rel="noreferrer"
              className="block bg-zinc-900 border border-red-500 py-2 rounded hover:bg-red-700">
              👮 Police Station
            </a>
            <a href={generateGoogleSearch('fuel station')} target="_blank" rel="noreferrer"
              className="block bg-zinc-900 border border-red-500 py-2 rounded hover:bg-red-700">
              ⛽ Fuel Station
            </a>
          </div>

          <div className="mt-4 text-center space-y-3">
            <a
              href={`https://wa.me/?text=SOS! I need help. My location: https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noreferrer"
              className="block bg-red-700 hover:bg-red-800 py-2 rounded font-semibold"
            >
              🆘 Send SOS via WhatsApp
            </a>

            <button
              onClick={handleHazardReport}
              className="block w-full bg-zinc-800 border border-red-500 py-2 rounded hover:bg-red-700"
            >
              🚧 Report a Hazard at this Location
            </button>

            <div className="text-left mt-4">
              <p className="text-red-400 font-semibold">⚠️ Reported Hazards:</p>
              {hazards.length === 0 ? (
                <p className="text-gray-400">No hazards reported yet.</p>
              ) : (
                hazards.map((h, i) => (
                  <p key={i} className="text-sm">
                    {i + 1}. {h.lat.toFixed(3)}, {h.lng.toFixed(3)}
                  </p>
                ))
              )}
            </div>
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-zinc-800 border border-red-500 rounded-lg text-center">
        <p className="text-red-400 font-bold">💡 Road Safety Tip:</p>
        <p className="italic text-lg">{tips[tipsIndex]}</p>
      </div>

      <div className="mt-6 text-sm text-center border-t border-red-700 pt-4 text-red-400">
        <p>📞 Emergency Numbers: 112 | 100 | 101 | 102</p>
      </div>
    </div>
  );
};

export default AISafetyCompanion;
