import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col bg-(--dark-background) min-h-full p-6 text-(--text-color-main)">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-3xl font-bold ">
          Build Your Dev Portfolio
        </h1>
        <p className="mt-2 max-w-2xl">
          Welcome to DevPortfolio, the ultimate platform for developers to
          showcase their skills and projects. Whether you're a beginner or an
          experienced developer, we provide the tools you need to create a
          stunning portfolio that stands out.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">
            Create Interactive Portfolios
          </h2>
          <p className="text-(--secondary-text-lighter) mt-2">
            Use our tools to design and customize your portfolio with ease.
            Highlight your skills, experience, and achievements.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold ">
            Share Your Projects
          </h2>
          <p className="text-(--secondary-text-lighter) mt-2">
            Upload and showcase your projects to the developer community. Get
            feedback and improve your work.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold ">
            Connect with Developers
          </h2>
          <p className="text-(--secondary-text-lighter) mt-2">
            Network with other developers, collaborate on projects, and grow
            your professional connections.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
