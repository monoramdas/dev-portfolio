import React from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const userLogin = localStorage.getItem("userInfo");
  const navigate=useNavigate();

  return (
    <div className="flex flex-col bg-(--dark-background) min-h-screen p-6 sm:p-10 text-(--text-color-main)">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
          Build Your Dev Portfolio
        </h1>
        <p className="mt-2 max-w-2xl text-(--secondary-text-lighter) leading-relaxed text-base sm:text-lg">
          Welcome to <span className="font-semibold text-blue-400">DevPortfolio</span> — the platform for developers to
          showcase their skills and projects beautifully. Whether you’re a
          beginner or an experienced engineer, build a portfolio that truly
          stands out.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div
          className="group p-6 rounded-2xl bg-(--card-background) border border-(--border-subtle)
          shadow-lg hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
        >
          <div className="mb-4 text-blue-400 text-5xl group-hover:scale-110 transition-transform duration-300">
            💡
          </div>
          <h2 className="text-2xl font-semibold mb-2">Create Interactive Portfolios</h2>
          <p className="text-(--secondary-text-lighter)">
            Use our intuitive tools to design your portfolio. Highlight your
            <span className="text-blue-400 font-medium"> skills</span>, experience, and achievements with elegant layouts.
          </p>
        </div>

        {/* Feature 2 */}
        <div
          className="group p-6 rounded-2xl bg-(--card-background) border border-(--border-subtle)
          shadow-lg hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
        >
          <div className="mb-4 text-purple-400 text-5xl group-hover:scale-110 transition-transform duration-300">
            🚀
          </div>
          <h2 className="text-2xl font-semibold mb-2">Share Your Projects</h2>
          <p className="text-(--secondary-text-lighter)">
            Upload and showcase your projects to the community. Receive
            feedback, improve your work, and grow your developer presence.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          className="group p-6 rounded-2xl bg-(--card-background) border border-(--border-subtle)
          shadow-lg hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
        >
          <div className="mb-4 text-pink-400 text-5xl group-hover:scale-110 transition-transform duration-300">
            🌐
          </div>
          <h2 className="text-2xl font-semibold mb-2">Connect with Developers</h2>
          <p className="text-(--secondary-text-lighter)">
            Network with other developers, collaborate on exciting projects, and
            build meaningful connections to elevate your career.
          </p>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      {!userLogin && <div className="mt-16 flex flex-col items-center text-center space-y-4">
        <p className="text-lg text-(--secondary-text-lighter)">
          Ready to showcase your developer journey?
        </p>
        <button
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
          px-6 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          onClick={()=>navigate("/login")}
        >
          Get Started Now 🚀
        </button>
      </div>}
    </div>
  );
}

export default Dashboard;
