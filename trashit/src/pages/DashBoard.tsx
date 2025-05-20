import React from 'react';
import Button from '../components/Button';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5FAF7] text-[#0F3D3E] font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-[#69E99F]">
      <div className="bg-[#F5FAF7] w-full h-[60px] pl-0">
        <h1 className="text-2xl font-bold mb-10">
          Trash<span className="text-green-600">it</span>
        </h1>
        </div>
        <ul className="space-y-6 px-6">
          <li className="bg-green-300 rounded px-3 py-2 font-medium">Dashboard</li>
          <li>My subscriptions</li>
          <li>Payment History</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-2/3 md:w-1/2 p-2 rounded-full border border-gray-300 shadow-inner focus:outline-none"
          />
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Welcome Section */}
        <div className="bg-[#D9F2E6] p-6 rounded-xl flex flex-col md:flex-row items-center justify-between h-[180px]">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold">
              Hello, <span className="text-trashGreen">Jina!</span>
            </h2>
            <p className="text-sm text-gray-600">Ready to keep your space clean? Let's schedule a pickup.</p>
            <Button className="rounded shadow mt-8">
              Schedule a pickup
            </Button>
          </div>
          <img
            src="/waste-illustration.png"
            alt="Collectors"
            className="w-40 md:w-56"
          />
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Active Subscriptions</h3>
            <p className="text-sm text-gray-500 mt-2">You haven't chosen a plan yet</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Your Last Pickup</h3>
            <p className="text-sm text-gray-500 mt-2">No pickups yet. Your pickup history will appear here once you schedule a collection</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Trash Collector Assigned</h3>
            <p className="text-sm text-gray-500 mt-2">No collector yet. Choose one when you schedule your first pickup</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Next Scheduled Pickup</h3>
            <p className="text-sm text-gray-500 mt-2">No upcoming pickup</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full md:w-1/5 bg-[#F5FAF7] p-6 flex flex-col justify-between">
        <div className="bg-white p-4 rounded text-sm mb-4 shadow">
          <h3 className="font-semibold text-green-600">ECO TIPS</h3>
          <p className="text-gray-600 mt-1">Rinse recyclables before disposal to reduce odor.</p>
        </div>  
        <div className="text-center">
          <p className="text-sm">Need help?</p>
          <button className="text-green-700 font-medium underline">Ask TrashBot</button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
