import React, { useState, useEffect, useRef } from "react";

const partners = [
  {
    name: "Police",
    icon: "🚓",
    color: "bg-blue-800",
    phone: "tel:100",
    location: "https://maps.google.com?q=police+station",
    available: true,
    replies: [
      "Officer dispatched to your location.",
      "We're looking into it. Stay calm.",
      "Patrolling unit is 5 mins away.",
    ],
  },
  {
    name: "Fire Dept.",
    icon: "🚒",
    color: "bg-red-700",
    phone: "tel:101",
    location: "https://maps.google.com?q=fire+station",
    available: true,
    replies: [
      "Fire unit dispatched immediately.",
      "Help is on the way!",
      "Evacuate the area if possible!",
    ],
  },
  {
    name: "Hospital",
    icon: "🏥",
    color: "bg-green-700",
    phone: "tel:102",
    location: "https://maps.google.com?q=hospital+near+me",
    available: false,
    replies: [
      "Ambulance sent to your location.",
      "Paramedics are on the way.",
      "Nearest emergency room alerted.",
    ],
  },
  {
    name: "Volunteers",
    icon: "👥",
    color: "bg-purple-700",
    phone: "tel:+918888888888",
    location: "https://maps.google.com?q=volunteer+base",
    available: true,
    replies: [
      "Volunteer heading to the location.",
      "We've received your request!",
      "Help squad is responding now.",
    ],
  },
];

const PartnerHub = () => {
  const [activeChat, setActiveChat] = useState("Police");
  const [messages, setMessages] = useState(
    Object.fromEntries(partners.map((p) => [p.name, []]))
  );
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const updated = { ...messages };
    updated[activeChat].push({ from: "You", text: trimmed });
    setMessages(updated);
    setNewMessage("");

    const partner = partners.find((p) => p.name === activeChat);
    const randomReply =
      partner.replies[Math.floor(Math.random() * partner.replies.length)];

    setTimeout(() => {
      const updatedWithReply = { ...updated };
      updatedWithReply[activeChat].push({
        from: partner.name,
        text: randomReply,
      });
      setMessages(updatedWithReply);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
        🤝 Emergency Partner Hub — Contact & Chat
      </h1>

      {/* Partner Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className={`rounded-xl p-4 ${partner.color} bg-opacity-90 shadow-lg`}
          >
            <div className="text-4xl mb-2">{partner.icon}</div>
            <h2 className="text-xl font-bold">{partner.name}</h2>
            <p className="text-sm text-gray-300 mb-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  partner.available ? "text-green-300" : "text-red-400"
                }`}
              >
                {partner.available ? "Available" : "Unavailable"}
              </span>
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={partner.phone}
                className="bg-black/20 p-2 rounded text-sm hover:bg-black/40"
              >
                📞 Call Now
              </a>
              <a
                href={partner.location}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/20 p-2 rounded text-sm hover:bg-black/40"
              >
                📍 View Location
              </a>
              <button
                className={`p-2 rounded text-sm transition ${
                  partner.name === activeChat
                    ? "bg-black/40"
                    : "bg-black/20 hover:bg-black/40"
                }`}
                onClick={() => setActiveChat(partner.name)}
              >
                💬 Chat Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Panel */}
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">
          💬 Live Chat — {activeChat}
        </h2>
        <div className="h-64 bg-zinc-700 rounded-xl p-4 overflow-y-auto space-y-2 text-sm">
          {messages[activeChat].map((msg, i) => (
            <div
              key={`${msg.from}-${i}`}
              className={`${
                msg.from === "You"
                  ? "text-green-300 text-right"
                  : "text-blue-300 text-left"
              }`}
            >
              <span className="block font-semibold">{msg.from}:</span>
              <span className="block">{msg.text}</span>
            </div>
          ))}
          {messages[activeChat].length === 0 && (
            <p className="text-gray-400">Start chatting with {activeChat}...</p>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex mt-3 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-md bg-zinc-600 text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`px-4 py-2 rounded font-bold ${
              newMessage.trim()
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-yellow-200 text-gray-600 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerHub;
