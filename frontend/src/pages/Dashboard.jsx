import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const features = [
  {
    title: "User Reports",
    icon: "📢",
    path: "/UserReports",
    points: [
      "Submit real-time incident reports",
      "Upload images/videos with location",
      "Categorize emergency type",
      "Track report status"
    ],
    color: "bg-red-500/10 text-red-400"
  },
  {
    title: "Live Emergency Map",
    icon: "🗺️",
    path: "/LiveEmergencyMap",
    points: [
      "Real-time incident visualization",
      "Color-coded emergency markers",
      "Customizable filters",
      "Heatmap analysis"
    ],
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Resource Network",
    icon: "🔄",
    path: "/ResourceRequests",
    points: [
      "Request essential supplies",
      "Connect donors with needs",
      "Inventory management",
      "Logistics coordination"
    ],
    color: "bg-green-500/10 text-green-400"
  },
  {
    title: "Partner Hub",
    icon: "🤝",
    path: "/PartnerHub",
    points: [
      "Agency collaboration portal",
      "Secure communication channels",
      "Team management",
      "Response coordination"
    ],
    color: "bg-purple-500/10 text-purple-400"
  },
  {
    title: "AI Safety Companion",
    icon: "🤖",
    path: "/AISafetyCompanion",
    points: [
      "Route risk assessment",
      "Real-time hazard alerts",
      "Personalized safety advice",
      "Emergency preparedness"
    ],
    color: "bg-yellow-500/10 text-yellow-400"
  },
  {
    title: "Relief Exchange",
    icon: "🛍️",
    path: "/ReliefMarketplace",
    points: [
      "Donation marketplace",
      "Needs matching system",
      "Volunteer coordination",
      "Inventory tracking"
    ],
    color: "bg-orange-500/10 text-orange-400"
  },
  {
    title: "Disaster Center (COMING SOON)",
    icon: "🌪️",
    path: "/DisasterHelpCenter",
    points: [
      "Crisis response hub",
      "Shelter location services",
      "Evacuation coordination",
      "Community alerts"
    ],
    color: "bg-pink-500/10 text-pink-400"
  },
  {
    title: "Verification System (COMING SOON)",
    icon: "✅",
    path: "/Verification",
    points: [
      "Community validation",
      "Trust scoring",
      "AI-assisted moderation",
      "Report credibility analysis"
    ],
    color: "bg-teal-500/10 text-teal-400"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "Responder");
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "+91 •••• ••••••");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempPhone, setTempPhone] = useState(phone);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setUserName(tempName);
    setPhone(tempPhone);
    localStorage.setItem("userName", tempName);
    localStorage.setItem("phone", tempPhone);
    setIsEditing(false);
  };

  return (
    <div className="flex bg-gray-950 min-h-screen">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex flex-col bg-gray-900 h-screen w-72 p-6 text-white fixed overflow-y-auto border-r border-gray-800"
      >
        <div className="flex items-center mb-10">
          <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Rescue<span className="text-red-400">Command</span></h2>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search features..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <nav className="flex-1">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4 px-2">Emergency Features</h3>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                onClick={() => feature.path && navigate(feature.path)}
                className={`px-3 py-2.5 rounded-lg transition-all ${feature.path ? 'hover:bg-gray-800 cursor-pointer' : 'opacity-60'}`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{feature.icon}</span>
                  <span className={`${feature.path ? 'text-white' : 'text-gray-400'}`}>
                    {feature.title}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white mr-2 text-sm font-medium">
                {userName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-gray-400">Responder</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="md:ml-72 w-full">
        {/* Command Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Emergency <span className="text-red-400">Command Center</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Real-time monitoring and response coordination
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 pl-10 py-2 rounded-lg text-sm transition-colors">
                  Quick Help
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-gray-900"></div>
                <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-1 pl-3 cursor-pointer transition-colors"
              >
                <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {userName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white hidden md:inline">{userName}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-6"
        >

          {/* Welcome Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden mb-8"
          >
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, <span className="text-red-400">{userName}</span>
                  </h2>
                  <p className="text-gray-400 max-w-lg">
                    Your contributions have helped coordinate responses to <span className="text-white font-medium">47 emergencies</span> this month. 
                    Keep up the critical work!
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                  <Link to="/user-reports">
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
    New Emergency Report
  </motion.button>
</Link>
                    
                    <a
  href="https://youtu.be/ErxKDbH-iiI?si=DyPJ2NuGPFSjmH7N"
  target="_blank"
  rel="noopener noreferrer"
>
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
        clipRule="evenodd"
      />
    </svg>
    Quick Tutorial
  </motion.button>
</a>
                  </div>
                </div>
                
                {/* Profile Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 w-full md:w-64 border border-gray-700 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Your Profile</h3>
                        <p className="text-xs text-gray-400">Trust Level: 92%</p>
                      </div>
                    </div>
                    {!isEditing ? (
                      <button 
                        onClick={handleEdit}
                        className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white"
                      >
                        Edit
                      </button>
                    ) : (
                      <button 
                        onClick={handleSave}
                        className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white"
                      >
                        Save
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full bg-gray-700 text-white px-3 py-1.5 rounded border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="Name"
                        />
                      ) : (
                        <p className="text-sm text-white">{userName}</p>
                      )}
                    </div>
                    
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          className="w-full bg-gray-700 text-white px-3 py-1.5 rounded border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="Phone"
                        />
                      ) : (
                        <p className="text-sm text-white">{phone}</p>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                        <span>Response Rating</span>
                        <span>4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Emergency Features</h2>
              <button className="text-sm text-gray-400 hover:text-white flex items-center">
                View all
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => feature.path && navigate(feature.path)}
                  className={`bg-gray-900/50 text-white p-5 rounded-xl border border-gray-800 transition-all duration-300 
                    ${feature.path ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : 'opacity-70'}`}
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {feature.title}
                    {!feature.path && <span className="text-xs text-yellow-300 ml-2">(Coming Soon)</span>}
                  </h3>
                  <ul className="space-y-2">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  {feature.path && (
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="text-sm text-red-400 hover:text-red-300 flex items-center transition-colors"
                      >
                        Access feature
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;