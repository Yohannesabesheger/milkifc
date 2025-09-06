// pages/about.tsx
import React from "react";
import Sidebar from "../components/Sidebar";

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
     

      {/* Main content */}
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-2">
          Welcome to our website! This is the About page. Here you can provide
          information about your company, mission, team, or any other details
          you want visitors to know.
        </p>
        <p>
          You can include images, links, or additional sections here as needed.
          The sidebar will remain fixed and icons will always be visible on all
          screen sizes.
        </p>
      </main>
    </div>
  );
};

export default About;
