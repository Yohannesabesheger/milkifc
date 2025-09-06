

import React from "react";

const HomePage: React.FC = () => {
  return (
    
      <div className="space-y-6">

        {/* Hero Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome to the Dashboard</h1>
          <p className="text-gray-600">
            Resize the window to see the sidebar shrink and the header menu turn into a dropdown.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h2 className="font-bold text-lg mb-2">Users</h2>
            <p className="text-gray-600 text-2xl">123</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h2 className="font-bold text-lg mb-2">Orders</h2>
            <p className="text-gray-600 text-2xl">45</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h2 className="font-bold text-lg mb-2">Revenue</h2>
            <p className="text-gray-600 text-2xl">$5,678</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">john@example.com</td>
                <td className="px-4 py-2">Admin</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">jane@example.com</td>
                <td className="px-4 py-2">User</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Bob Johnson</td>
                <td className="px-4 py-2">bob@example.com</td>
                <td className="px-4 py-2">Moderator</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Responsive Placeholder Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 1</div>
          <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 2</div>
          <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 3</div>
          <div className="bg-gray-200 rounded h-24 flex items-center justify-center">Box 4</div>
        </div>

      </div>
    
  );
};

export default HomePage;
