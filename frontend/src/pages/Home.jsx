import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const slideIn = (direction) => ({
    hidden: { x: direction === "left" ? -100 : 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  });

  return (
    
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-transparent to-transparent opacity-90"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-red-800 rounded-full filter blur-3xl opacity-10"></div>
        
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-red-900/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
  className="flex items-center"
>
  <div className="w-10 h-10 mr-3 flex items-center justify-center">
    <img
      src="/public/logo.png"  // Update the path to your logo image
      alt="ResQnect Logo"
      className="h-8 w-8 object-contain"
    />
  </div>
  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent tracking-tight">
    ResQnect
  </h1>
</motion.div>

          
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex gap-8 items-center"
          >
            {["Home", "About", "Services", "Testimonials"].map((item, index) => (
              <motion.li key={index} variants={itemVariants}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-md bg-transparent border border-red-600 text-red-400 hover:bg-red-900/30 transition-all duration-300"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-400 text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-24 pb-16"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Crowdsourced Emergency
              </span>{" "}
              <br />
              Management System
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10">
              Empowering communities to respond quickly and effectively to emergencies with real-time coordination.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-900/50 hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
        {/* Animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: "24/7", label: "Support" },
            { value: "500+", label: "Responders" },
            { value: "100+", label: "Cities" },
            { value: "10K+", label: "Lives Saved" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 text-center"
            >
              <h3 className="text-3xl font-bold text-red-400 mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideIn("left")} className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-900 rounded-full filter blur-3xl opacity-20 z-0"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-black to-gray-900 border border-gray-800 rounded-2xl p-1 overflow-hidden">
                  <div className="bg-gray-900 rounded-xl p-6 h-full">
                    <h2 className="text-3xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        About ResQnect
                      </span>
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                    ResQnect is a revolutionary community-driven emergency response platform that leverages technology to provide immediate medical help, rescue coordination, and real-time support during critical situations.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Our network connects certified first responders, trained volunteers, and generous donors with people in need, creating a safety net that operates 24/7 across multiple regions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={slideIn("right")} className="grid gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Rapid Response",
                  description: "Our average response time is under 8 minutes in urban areas thanks to our distributed network."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Verified Network",
                  description: "All responders are thoroughly vetted and certified to ensure quality assistance."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Reliable Support",
                  description: "24/7 monitoring and support to ensure help is always available when needed."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 flex gap-4 items-start"
                >
                  <div className="bg-red-900/20 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive emergency solutions tailored for community safety and rapid response.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Medical Assistance",
                description: "Immediate medical support and first aid services during emergencies with certified professionals.",
                icon: "🩺"
              },
              {
                title: "Rescue Operations",
                description: "Professional rescue teams equipped for natural disasters, accidents, and crisis situations.",
                icon: "🚑"
              },
              {
                title: "24/7 Helpline",
                description: "Round-the-clock support and guidance through our dedicated emergency helpline network.",
                icon: "📞"
              },
              {
                title: "Safety Guidelines",
                description: "Expert protocols to ensure safety of victims and responders during emergency operations.",
                icon: "📋"
              },
              {
                title: "Response Coordination",
                description: "Seamless collaboration with authorities and NGOs for efficient disaster response.",
                icon: "🤝"
              },
              {
                title: "Donation Management",
                description: "Channeling community support through food, clothing, medical supplies, and financial aid.",
                icon: "❤️"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-gray-900/50 to-black border border-gray-800 rounded-xl p-8 hover:border-red-900/50 transition-all duration-300 group"
              >
                <div className="text-4xl mb-6 group-hover:text-red-400 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
                <div className="mt-6">
                  <span className="inline-block w-8 h-0.5 bg-red-500"></span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              "“Thanks to ResQnect, help arrived quickly after our accident. Forever grateful!”",
              "“A game-changer in emergency response. This platform saved lives in our area!”",
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-zinc-800 p-6 rounded-xl text-gray-200 shadow-md"
              >
                <p>{quote}</p>
                <h4 className="mt-4 text-red-500 font-semibold">
                  – {i === 0 ? "Aarthi, Chennai" : "Rahul, Hyderabad"}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-10 text-red-500">
            Contact / Request Help
          </h2>
          <form className="grid gap-6 bg-zinc-900 p-8 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-600 text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-600 text-white"
            />
            <textarea
              rows="5"
              placeholder="Your Message / Emergency Details"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-600 text-white"
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md font-semibold transition duration-300"
            >
              Send Request
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-red-700 text-black font-semibold tracking-wide">
        © 2025 ResQnect | Built with ❤️ by Community
      </footer>
    </div>
  );
};

export default Home;
